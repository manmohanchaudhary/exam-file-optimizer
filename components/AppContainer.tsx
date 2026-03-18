'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { EXAMS, Exam, FileType } from '@/lib/presets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, FileImage, FileText, Download, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function AppContainer({ initialExamId = 'ssc', initialFileType = 'photo' }: { initialExamId?: string, initialFileType?: FileType }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<FileType>(initialFileType);
  const [selectedExamId, setSelectedExamId] = useState<string>(initialExamId);
  
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');
  const [customMinSize, setCustomMinSize] = useState<string>('');
  const [customMaxSize, setCustomMaxSize] = useState<string>('50');
  const [customFormat, setCustomFormat] = useState<string>(initialFileType === 'document' ? 'pdf' : 'jpg');

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
      setCustomFormat('pdf');
    } else {
      setFileType('photo');
      setSelectedExamId(prev => prev === 'custom' ? initialExamId : prev);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  }, [initialExamId]);

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

      const formData = new FormData();
      formData.append('file', fileToProcess);
      
      const isCustom = selectedExamId === 'custom';
      const exam = EXAMS.find(e => e.id === selectedExamId);

      if (isCustom || fileType === 'document') {
        formData.append('type', fileType);
        formData.append('format', customFormat);
        if (customWidth) formData.append('width', customWidth);
        if (customHeight) formData.append('height', customHeight);
        if (customMinSize) formData.append('minSizeKb', customMinSize);
        if (customMaxSize) formData.append('maxSizeKb', customMaxSize);
      } else if (exam) {
        const req = fileType === 'photo' ? exam.photo : 
                    fileType === 'signature' ? exam.signature :
                    fileType === 'left_thumb' ? exam.left_thumb :
                    fileType === 'right_thumb' ? exam.right_thumb : null;
        
        if (req) {
          formData.append('type', fileType);
          formData.append('format', req.format);
          if (req.width) formData.append('width', req.width.toString());
          if (req.height) formData.append('height', req.height.toString());
          if (req.minSizeKb) formData.append('minSizeKb', req.minSizeKb.toString());
          if (req.maxSizeKb) formData.append('maxSizeKb', req.maxSizeKb.toString());
          if (req.dpi) formData.append('dpi', req.dpi.toString());
        }
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
      let filename = `examresize_optimized_${fileType}.jpg`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch.length === 2) {
          const ext = filenameMatch[1].split('.').pop() || 'jpg';
          filename = `examresize_optimized_${fileType}.${ext}`;
        }
      } else {
        const ext = blob.type.split('/')[1] || 'jpg';
        filename = `examresize_optimized_${fileType}.${ext}`;
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

  const isCustom = selectedExamId === 'custom';
  const currentExam = EXAMS.find(e => e.id === selectedExamId);
  const currentReq = currentExam ? (
    fileType === 'photo' ? currentExam.photo : 
    fileType === 'signature' ? currentExam.signature :
    fileType === 'left_thumb' ? currentExam.left_thumb :
    fileType === 'right_thumb' ? currentExam.right_thumb : null
  ) : null;

  return (
    <div className="space-y-8">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}`}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 bg-blue-100 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-4">
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
                    if (v === 'document') {
                      setCustomFormat('pdf');
                    } else if (customFormat === 'pdf') {
                      setCustomFormat('jpg');
                    }
                  }}>
                    <TabsList className={`grid w-full ${selectedExamId === 'dsssb' ? 'grid-cols-4' : 'grid-cols-3'}`}>
                      <TabsTrigger value="photo">Photo</TabsTrigger>
                      <TabsTrigger value="signature">Signature</TabsTrigger>
                      {selectedExamId === 'dsssb' ? (
                        <>
                          <TabsTrigger value="left_thumb">L. Thumb</TabsTrigger>
                          <TabsTrigger value="right_thumb">R. Thumb</TabsTrigger>
                        </>
                      ) : (
                        <TabsTrigger value="document">Document</TabsTrigger>
                      )}
                    </TabsList>
                  </Tabs>

                  {fileType !== 'document' && (
                    <div className="space-y-3">
                      <Label htmlFor="exam">Select Exam</Label>
                      <Select value={selectedExamId} onValueChange={(v) => v && setSelectedExamId(v)}>
                        <SelectTrigger id="exam">
                          <SelectValue placeholder="Select an exam">
                            {selectedExamId === 'custom' ? 'Custom' : EXAMS.find(e => e.id === selectedExamId)?.name}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="custom">Custom</SelectItem>
                          {EXAMS.map(exam => (
                            <SelectItem key={exam.id} value={exam.id}>
                              {exam.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedExamId !== 'custom' && currentExam && (
                        <div className="text-sm text-slate-700 bg-blue-50 p-4 rounded-md border border-blue-100 space-y-2">
                          <p className="font-semibold text-blue-900">{currentExam.name} Requirements</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>{currentExam.photo.description}</li>
                            <li>{currentExam.signature.description}</li>
                            {currentExam.left_thumb && <li>{currentExam.left_thumb.description}</li>}
                            {currentExam.right_thumb && <li>{currentExam.right_thumb.description}</li>}
                          </ul>
                          <p className="text-xs text-slate-500 mt-2 italic">
                            Image specifications are based on commonly used exam requirements. Always verify the latest instructions from the official exam notification.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input id="width" type="number" placeholder="e.g. 200" value={isCustom || fileType === 'document' ? customWidth : currentReq?.width || ''} onChange={e => setCustomWidth(e.target.value)} disabled={!isCustom && fileType !== 'document'} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input id="height" type="number" placeholder="e.g. 230" value={isCustom || fileType === 'document' ? customHeight : currentReq?.height || ''} onChange={e => setCustomHeight(e.target.value)} disabled={!isCustom && fileType !== 'document'} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minSize">Min Size (KB)</Label>
                        <Input id="minSize" type="number" placeholder="e.g. 20" value={isCustom || fileType === 'document' ? customMinSize : currentReq?.minSizeKb || ''} onChange={e => setCustomMinSize(e.target.value)} disabled={!isCustom && fileType !== 'document'} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxSize">Max Size (KB)</Label>
                        <Input id="maxSize" type="number" placeholder="e.g. 50" value={isCustom || fileType === 'document' ? customMaxSize : currentReq?.maxSizeKb || ''} onChange={e => setCustomMaxSize(e.target.value)} disabled={!isCustom && fileType !== 'document'} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="format">Format</Label>
                        <Select value={isCustom || fileType === 'document' ? customFormat : currentReq?.format || 'jpg'} onValueChange={(v) => v && setCustomFormat(v)} disabled={!isCustom && fileType !== 'document'}>
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
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#0056b3] hover:bg-blue-800 text-white h-12 text-lg" 
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
                    <CheckCircle2 className="w-6 h-6 text-[#28a745]" />
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
                      
                      {currentReq?.dpi && (
                        <>
                          <div className="text-slate-500">DPI:</div>
                          <div className="font-semibold text-slate-900">{currentReq.dpi} ✅</div>
                        </>
                      )}

                      <div className="text-slate-500">Filename:</div>
                      <div className="font-semibold text-slate-900 truncate" title={result.filename}>{result.filename}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <a 
                    href={result.url} 
                    download={result.filename}
                    className="w-full bg-[#28a745] hover:bg-green-700 text-white h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors"
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
