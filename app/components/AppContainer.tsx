'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PRESETS, Preset, FileType } from '@/lib/presets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, FileImage, FileText, Download, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { GoogleGenAI } from '@google/genai';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function AppContainer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<FileType>('photo');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ssc-photo');
  
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');
  const [customMinSize, setCustomMinSize] = useState<string>('');
  const [customMaxSize, setCustomMaxSize] = useState<string>('50');
  const [customFormat, setCustomFormat] = useState<string>('jpg');

  const [useAiEnhance, setUseAiEnhance] = useState(false);
  const [aiImageSize, setAiImageSize] = useState('1K');

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; filename: string; size: number; format: string } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit');
      return;
    }

    setFile(selectedFile);
    setResult(null);

    // Auto-detect file type
    if (selectedFile.type === 'application/pdf') {
      setFileType('document');
      setSelectedPresetId('document-pdf');
    } else {
      setFileType('photo');
      setSelectedPresetId('ssc-photo');
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
  });

  const handleProcess = async () => {
    if (!file) {
      toast.error('Please upload a file first');
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      let fileToProcess = file;

      if (fileType === 'signature' && useAiEnhance) {
        toast.info('Enhancing signature with AI...');
        // @ts-ignore
        if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
          // @ts-ignore
          await window.aistudio.openSelectKey();
        }

        const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY || '' });
        const base64Data = await fileToBase64(file);
        const mimeType = file.type;
        const data = base64Data.split(',')[1];

        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  data: data,
                  mimeType: mimeType,
                },
              },
              {
                text: 'Remove the background to make it pure white, make the signature black and white, and enhance the image quality.',
              },
            ],
          },
          config: {
            imageConfig: {
              imageSize: aiImageSize as "1K" | "2K" | "4K",
            }
          }
        });

        let enhancedBase64 = null;
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            enhancedBase64 = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            break;
          }
        }

        if (enhancedBase64) {
          const res = await fetch(enhancedBase64);
          const blob = await res.blob();
          fileToProcess = new File([blob], 'enhanced_signature.png', { type: 'image/png' });
          toast.success('AI enhancement complete!');
        } else {
          throw new Error('AI enhancement failed to return an image.');
        }
      }

      const formData = new FormData();
      formData.append('file', fileToProcess);
      
      const isCustom = selectedPresetId.startsWith('custom-');
      const preset = PRESETS.find(p => p.id === selectedPresetId);

      if (isCustom) {
        formData.append('type', fileType);
        formData.append('format', customFormat);
        if (customWidth) formData.append('width', customWidth);
        if (customHeight) formData.append('height', customHeight);
        if (customMinSize) formData.append('minSizeKb', customMinSize);
        if (customMaxSize) formData.append('maxSizeKb', customMaxSize);
      } else if (preset) {
        formData.append('type', preset.type);
        formData.append('format', preset.format);
        if (preset.width) formData.append('width', preset.width.toString());
        if (preset.height) formData.append('height', preset.height.toString());
        if (preset.minSizeKb) formData.append('minSizeKb', preset.minSizeKb.toString());
        if (preset.maxSizeKb) formData.append('maxSizeKb', preset.maxSizeKb.toString());
      }

      const response = await fetch('/api/optimize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process file');
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `optimized_${fileType}.jpg`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }

      setResult({
        url: downloadUrl,
        filename,
        size: blob.size,
        format: blob.type.split('/')[1] || 'unknown'
      });
      
      toast.success('File optimized successfully!');

    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredPresets = PRESETS.filter(p => p.type === fileType);
  const isCustom = selectedPresetId.startsWith('custom-');

  return (
    <div className="space-y-8">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Drag & drop your file here</h3>
          <p className="text-slate-500 mb-4">or click to browse from your device</p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1"><FileImage className="w-4 h-4" /> JPG, PNG</span>
            <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> PDF</span>
            <span>Max 10MB</span>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Preview & File Info */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  Original File
                  <Button variant="ghost" size="sm" onClick={reset} className="h-8 text-slate-500">
                    <RefreshCw className="w-4 h-4 mr-2" /> Change
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {previewUrl ? (
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                ) : (
                  <div className="aspect-square rounded-lg bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400">
                    <FileText className="w-16 h-16 mb-4 text-slate-300" />
                    <span className="font-medium text-slate-500">{file.name}</span>
                  </div>
                )}
                <div className="mt-4 flex justify-between text-sm text-slate-600 bg-slate-50 p-3 rounded-md">
                  <span className="truncate max-w-[200px]" title={file.name}>{file.name}</span>
                  <span className="font-medium">{formatBytes(file.size)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Settings & Actions */}
          <div className="space-y-6">
            {!result ? (
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Settings</CardTitle>
                  <CardDescription>Select a preset or enter custom requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs value={fileType} onValueChange={(v) => {
                    setFileType(v as FileType);
                    const defaultPreset = PRESETS.find(p => p.type === v && !p.id.startsWith('custom-'));
                    if (defaultPreset) setSelectedPresetId(defaultPreset.id);
                  }}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="photo">Photo</TabsTrigger>
                      <TabsTrigger value="signature">Signature</TabsTrigger>
                      <TabsTrigger value="document">Document</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="space-y-3">
                    <Label htmlFor="preset">Requirement Preset</Label>
                    <Select value={selectedPresetId} onValueChange={(v) => v && setSelectedPresetId(v)}>
                      <SelectTrigger id="preset">
                        <SelectValue placeholder="Select a preset" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredPresets.map(preset => (
                          <SelectItem key={preset.id} value={preset.id}>
                            {preset.name} {preset.maxSizeKb ? `(Max ${preset.maxSizeKb}KB)` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {!isCustom && (
                      <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-md border border-slate-100">
                        {PRESETS.find(p => p.id === selectedPresetId)?.description}
                      </p>
                    )}
                  </div>

                  {fileType === 'signature' && (
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="aiEnhance" 
                          checked={useAiEnhance} 
                          onChange={(e) => setUseAiEnhance(e.target.checked)} 
                          className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                        />
                        <Label htmlFor="aiEnhance" className="font-medium cursor-pointer">
                          ✨ AI Enhance (Nano Banana Pro)
                        </Label>
                      </div>
                      {useAiEnhance && (
                        <div className="pl-6 space-y-3">
                          <p className="text-sm text-slate-500">
                            Removes background, converts to black & white, and improves quality.
                          </p>
                          <div className="space-y-2">
                            <Label htmlFor="aiSize">AI Image Size</Label>
                            <Select value={aiImageSize} onValueChange={(v) => v && setAiImageSize(v)}>
                              <SelectTrigger id="aiSize">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1K">1K (Standard)</SelectItem>
                                <SelectItem value="2K">2K (High Quality)</SelectItem>
                                <SelectItem value="4K">4K (Ultra Quality)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {isCustom && (
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="width">Width (px)</Label>
                          <Input id="width" type="number" placeholder="e.g. 200" value={customWidth} onChange={e => setCustomWidth(e.target.value)} disabled={fileType === 'document'} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height">Height (px)</Label>
                          <Input id="height" type="number" placeholder="e.g. 230" value={customHeight} onChange={e => setCustomHeight(e.target.value)} disabled={fileType === 'document'} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="minSize">Min Size (KB)</Label>
                          <Input id="minSize" type="number" placeholder="e.g. 20" value={customMinSize} onChange={e => setCustomMinSize(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxSize">Max Size (KB)</Label>
                          <Input id="maxSize" type="number" placeholder="e.g. 50" value={customMaxSize} onChange={e => setCustomMaxSize(e.target.value)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="format">Format</Label>
                          <Select value={customFormat} onValueChange={(v) => v && setCustomFormat(v)} disabled={fileType === 'document'}>
                            <SelectTrigger id="format">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jpg">JPG</SelectItem>
                              <SelectItem value="jpeg">JPEG</SelectItem>
                              <SelectItem value="png">PNG</SelectItem>
                              {fileType === 'document' && <SelectItem value="pdf">PDF</SelectItem>}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg" 
                    onClick={handleProcess}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...
                      </>
                    ) : (
                      'Optimize File'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    Ready for Upload!
                  </CardTitle>
                  <CardDescription className="text-green-700">
                    Your file has been optimized to meet the requirements.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="text-slate-500">Final Size:</div>
                      <div className="font-semibold text-slate-900">{formatBytes(result.size)}</div>
                      
                      <div className="text-slate-500">Format:</div>
                      <div className="font-semibold text-slate-900 uppercase">{result.format}</div>
                      
                      <div className="text-slate-500">Filename:</div>
                      <div className="font-semibold text-slate-900 truncate" title={result.filename}>{result.filename}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <a 
                    href={result.url} 
                    download={result.filename}
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors"
                  >
                    <Download className="w-5 h-5 mr-2" /> Download File
                  </a>
                  <Button variant="outline" className="w-full" onClick={() => setResult(null)}>
                    Adjust Settings
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
