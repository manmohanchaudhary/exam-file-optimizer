'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { sendGAEvent } from '@next/third-parties/google';
import { EXAMS, Exam, FileType } from '@/lib/presets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, FileImage, FileText, Download, Loader2, CheckCircle2, RefreshCw, ChevronDown, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function AppContainer({ initialExamId = 'custom', initialFileType = 'photo' }: { initialExamId?: string, initialFileType?: FileType }) {
  const [isMounted, setIsMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<FileType>(initialFileType);
  const [selectedExamId, setSelectedExamId] = useState<string>(initialExamId);
  
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');
  const [customMinSize, setCustomMinSize] = useState<string>('');
  const [customMaxSize, setCustomMaxSize] = useState<string>('50');
  const [customFormat, setCustomFormat] = useState<string>(initialFileType === 'document' ? 'pdf' : 'jpg');
  const [isGovExamMode, setIsGovExamMode] = useState<boolean>(false);
  const [isPresetMenuOpen, setIsPresetMenuOpen] = useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ url: string; filename: string; size: number; format: string } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isPresetMenuOpen && selectedExamId) {
      setTimeout(() => {
        const container = document.getElementById('preset-menu-container');
        if (!container) return;
        
        if (selectedExamId === 'custom') {
          container.scrollTop = 0;
        } else {
          const el = document.getElementById(`preset-${selectedExamId}`);
          if (el) {
            container.scrollTop = el.offsetTop - 30;
          }
        }
      }, 50);
    }
  }, [isPresetMenuOpen, selectedExamId]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File size exceeds 10MB limit');
      return;
    }

    let fileToUse = selectedFile;

    // Check if it's a HEIC file
    const isHeic = selectedFile.name.toLowerCase().endsWith('.heic') || 
                   selectedFile.name.toLowerCase().endsWith('.heif') || 
                   selectedFile.type === 'image/heic' || 
                   selectedFile.type === 'image/heif';

    if (isHeic) {
      const toastId = toast.loading('Converting HEIC image...');
      try {
        const heic2any = (await import('heic2any')).default;
        const convertedBlob = await heic2any({
          blob: selectedFile,
          toType: 'image/jpeg',
          quality: 0.8
        });
        
        const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        fileToUse = new File([blob], selectedFile.name.replace(/\.heic$|\.heif$/i, '.jpg'), {
          type: 'image/jpeg',
          lastModified: new Date().getTime()
        });
        toast.dismiss(toastId);
        toast.success('HEIC image converted successfully');
      } catch (error) {
        console.error('HEIC conversion error:', error);
        toast.dismiss(toastId);
        toast.error('Failed to convert HEIC image. Please try another format.');
        return;
      }
    }

    setFile(fileToUse);
    setResult(null);
    
    sendGAEvent({ event: 'file_uploaded', value: { fileType: fileToUse.type, size: fileToUse.size } });

    // Auto-detect file type
    if (fileToUse.type === 'application/pdf') {
      setFileType('document');
      setCustomFormat('pdf');
    } else {
      setFileType('photo');
      setSelectedExamId(prev => prev === 'custom' ? initialExamId : prev);
      const objectUrl = URL.createObjectURL(fileToUse);
      setPreviewUrl(objectUrl);
    }
  }, [initialExamId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/heic': ['.heic'],
      'image/heif': ['.heif'],
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
      formData.append('examId', selectedExamId);
      
      const isCustom = selectedExamId === 'custom';
      const exam = EXAMS.find(e => e.id === selectedExamId);

      if (fileToProcess.type === 'application/pdf') {
        let minSizeKb: number | undefined;
        let maxSizeKb: number | undefined;

        if (isCustom || (fileType === 'document' && exam && !exam.document)) {
           minSizeKb = customMinSize ? parseInt(customMinSize) : undefined;
           maxSizeKb = customMaxSize ? parseInt(customMaxSize) : undefined;
        } else if (exam) {
           const req = fileType === 'document' ? exam.document : null;
           if (req) {
             minSizeKb = req.minSizeKb;
             maxSizeKb = req.maxSizeKb;
           }
        }

        toast.loading('Compressing PDF locally...', { id: 'pdf-compress' });
        try {
          const compressedBlob = await compressPdfClientSide(fileToProcess, minSizeKb, maxSizeKb);
          toast.dismiss('pdf-compress');
          
          const downloadUrl = URL.createObjectURL(compressedBlob);
          setResult({
            url: downloadUrl,
            filename: `document.pdf`,
            size: compressedBlob.size,
            format: 'pdf'
          });
          toast.success('PDF optimized successfully!');
          setIsProcessing(false);
          return;
        } catch (err) {
          toast.dismiss('pdf-compress');
          console.error('Client-side PDF compression failed:', err);
          throw new Error('Failed to compress PDF locally. Please try a different file.');
        }
      }

      if (isCustom || (fileType === 'document' && exam && !exam.document)) {
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
                    fileType === 'right_thumb' ? exam.right_thumb :
                    fileType === 'document' ? exam.document :
                    fileType === 'declaration' ? exam.declaration : null;
        
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

      let blob = await response.blob();
      
      if (isGovExamMode && blob.type.startsWith('image/')) {
        const isCustom = selectedExamId === 'custom';
        const exam = EXAMS.find(e => e.id === selectedExamId);
        let minSizeKb: number | undefined;
        let maxSizeKb: number | undefined;

        if (isCustom || (fileType === 'document' && exam && !exam.document)) {
           minSizeKb = customMinSize ? parseInt(customMinSize) : undefined;
           maxSizeKb = customMaxSize ? parseInt(customMaxSize) : undefined;
        } else if (exam) {
           const req = fileType === 'photo' ? exam.photo : 
                       fileType === 'signature' ? exam.signature :
                       fileType === 'left_thumb' ? exam.left_thumb :
                       fileType === 'right_thumb' ? exam.right_thumb :
                       fileType === 'document' ? exam.document :
                       fileType === 'declaration' ? exam.declaration : null;
           if (req) {
             minSizeKb = req.minSizeKb;
             maxSizeKb = req.maxSizeKb;
           }
        }
        blob = await processImage(blob, minSizeKb, maxSizeKb);
      }

      const downloadUrl = URL.createObjectURL(blob);
      let filename = `${fileType}.${blob.type === 'application/pdf' ? 'pdf' : 'jpg'}`;
      if (selectedExamId === 'upsc') {
        if (fileType === 'photo') filename = 'photo.jpg';
        if (fileType === 'signature') filename = 'signature.jpg';
      }
      
      setResult({
        url: downloadUrl,
        filename,
        size: blob.size,
        format: blob.type === 'application/pdf' ? 'pdf' : 'jpg'
      });
      
      sendGAEvent({ event: 'file_processed', value: { examId: selectedExamId, fileType, format: blob.type } });
      
      toast.success('File optimized successfully!');
      
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

    } catch (error) {
      console.error(error);
      sendGAEvent({ event: 'processing_error', value: { error: error instanceof Error ? error.message : 'Unknown error' } });
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

  const compressPdfClientSide = async (file: File, minSizeKb?: number, maxSizeKb?: number): Promise<Blob> => {
    let pdfjsLib: any;
    try {
      // Dynamically load pdfjs-dist from CDN to avoid Next.js Turbopack bundling issues
      // which cause "Object.defineProperty called on non-object" errors.
      if (!(window as any).pdfjsLib) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load pdf.js script'));
          document.head.appendChild(script);
        });
      }
      
      pdfjsLib = (window as any).pdfjsLib;

      if (pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
    } catch (e) {
      console.error("Failed to setup pdfjsLib worker:", e);
      throw new Error("Failed to initialize PDF processing library.");
    }

    if (!pdfjsLib || !pdfjsLib.getDocument) {
      throw new Error("PDF library loaded incorrectly.");
    }

    const { PDFDocument } = await import('pdf-lib');

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    const numPages = pdf.numPages;

    const tryPass = async (scale: number, quality: number): Promise<Uint8Array> => {
      const newPdf = await PDFDocument.create();
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport, canvasFactory: undefined } as any).promise;
        }

        const imgDataUrl = canvas.toDataURL('image/jpeg', quality);
        const imgBytes = await fetch(imgDataUrl).then(res => res.arrayBuffer());
        const image = await newPdf.embedJpg(imgBytes);
        const newPage = newPdf.addPage([image.width, image.height]);
        newPage.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }
      return await newPdf.save({ useObjectStreams: true });
    };

    const passes = [
      { scale: 2.0, quality: 0.95 }, // High
      { scale: 1.5, quality: 0.85 }, // Medium-High
      { scale: 1.0, quality: 0.75 }, // Medium
      { scale: 0.8, quality: 0.60 }, // Low
      { scale: 0.5, quality: 0.50 }, // Very Low
    ];

    let bestBytes: Uint8Array | null = null;
    const maxBytes = maxSizeKb ? maxSizeKb * 1024 : Infinity;
    const minBytes = minSizeKb ? minSizeKb * 1024 : 0;

    if (maxSizeKb) {
      for (const pass of passes) {
        const bytes = await tryPass(pass.scale, pass.quality);
        if (bytes.length <= maxBytes) {
          bestBytes = bytes;
          break;
        }
      }
      if (!bestBytes) {
         bestBytes = await tryPass(0.3, 0.3);
      }
    } else {
      let found = false;
      for (let i = 2; i >= 0; i--) {
        const bytes = await tryPass(passes[i].scale, passes[i].quality);
        if (bytes.length >= minBytes) {
          bestBytes = bytes;
          found = true;
          break;
        }
      }
      if (!found) {
        bestBytes = await tryPass(passes[2].scale, passes[2].quality);
      }
    }

    if (bestBytes && bestBytes.length < minBytes) {
      let paddingSize = minBytes - bestBytes.length + 1024;
      if (maxBytes !== Infinity && bestBytes.length + paddingSize > maxBytes) {
        paddingSize = maxBytes - bestBytes.length;
      }
      if (paddingSize > 0) {
        const padding = new Uint8Array(paddingSize);
        const combined = new Uint8Array(bestBytes.length + padding.length);
        combined.set(bestBytes);
        combined.set(padding, bestBytes.length);
        bestBytes = combined;
      }
    }

    return new Blob([bestBytes || await file.arrayBuffer()] as any, { type: 'application/pdf' });
  };

  const processImage = async (blob: Blob, minSizeKb?: number, maxSizeKb?: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const tryEncode = (scale: number, quality: number): Promise<Blob> => {
          return new Promise((res) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = Math.max(10, Math.floor(img.width * scale));
            canvas.height = Math.max(10, Math.floor(img.height * scale));
            if (ctx) {
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
            canvas.toBlob((b) => res(b!), "image/jpeg", quality);
          });
        };

        const adjust = async () => {
          let quality = 0.9;
          let scale = 1.0;
          let b = await tryEncode(scale, quality);
          
          const minBytes = minSizeKb ? minSizeKb * 1024 : 0;
          const maxBytes = maxSizeKb ? maxSizeKb * 1024 : Infinity;

          // 1. Adjust quality first
          for (let i = 0; i < 15; i++) {
            if (b.size < minBytes && quality < 0.95) {
              quality = Math.min(quality + 0.05, 0.95);
              b = await tryEncode(scale, quality);
            } else if (b.size > maxBytes && quality > 0.1) {
              quality = Math.max(quality - 0.1, 0.1);
              b = await tryEncode(scale, quality);
            } else {
              break;
            }
          }

          // 2. If STILL too large, scale down dimensions
          while (b.size > maxBytes && scale > 0.1) {
            scale -= 0.1;
            b = await tryEncode(scale, quality);
          }

          // 3. If STILL too small, add invisible padding bytes
          if (b.size < minBytes) {
            let paddingSize = minBytes - b.size + 1024;
            if (maxBytes !== Infinity && b.size + paddingSize > maxBytes) {
                paddingSize = maxBytes - b.size;
            }
            if (paddingSize > 0) {
              const padding = new Uint8Array(paddingSize);
              const newBlob = new Blob([b, padding], { type: 'image/jpeg' });
              resolve(newBlob);
              return;
            }
          }
          
          resolve(b);
        };
        adjust();
      };
      img.src = URL.createObjectURL(blob);
    });
  };

  const isCustom = selectedExamId === 'custom';
  const currentExam = EXAMS.find(e => e.id === selectedExamId);
  const currentReq = currentExam ? (
    fileType === 'photo' ? currentExam.photo : 
    fileType === 'signature' ? currentExam.signature :
    fileType === 'left_thumb' ? currentExam.left_thumb :
    fileType === 'right_thumb' ? currentExam.right_thumb :
    fileType === 'document' ? currentExam.document :
    fileType === 'declaration' ? currentExam.declaration : null
  ) : null;

  const minSizeKb = isCustom ? (customMinSize ? parseInt(customMinSize) : undefined) : currentReq?.minSizeKb;
  const maxSizeKb = isCustom ? (customMaxSize ? parseInt(customMaxSize) : undefined) : currentReq?.maxSizeKb;

  const isSizeValid = result ? (
    (!minSizeKb || result.size >= minSizeKb * 1024) &&
    (!maxSizeKb || result.size <= maxSizeKb * 1024)
  ) : false;

  const groupedExams = EXAMS.reduce((acc, exam) => {
    const category = exam.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(exam);
    return acc;
  }, {} as Record<string, Exam[]>);

  const sortedCategories = Object.entries(groupedExams).sort(([catA], [catB]) => {
    if (catA === 'All India Exams') return -1;
    if (catB === 'All India Exams') return 1;
    if (catA === 'Other') return 1;
    if (catB === 'Other') return -1;
    return catA.localeCompare(catB);
  });

  if (!isMounted) {
    return (
      <Card className="w-full border-none shadow-none bg-slate-50/50">
        <CardContent className="p-12 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-medium">Loading resizer...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`relative group rounded-xl p-12 text-center cursor-pointer transition-colors overflow-hidden
            ${isDragActive ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'}`}
        >
          {/* Animated Dashed Border */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl">
            <motion.rect
              width="100%" height="100%"
              fill="none"
              rx="12" ry="12"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="10 10"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className={`transition-colors duration-300 ${isDragActive ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}
            />
          </svg>

          <input {...getInputProps()} />
          
          <div className="relative z-10">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300
              ${isDragActive ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-blue-100 text-[#0056b3]'}`}>
              <motion.div
                animate={isDragActive ? { y: [0, -6, 0] } : { y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: isDragActive ? 1 : 2, ease: "easeInOut" }}
              >
                <UploadCloud className="w-8 h-8" />
              </motion.div>
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {isDragActive ? 'Drop your file now!' : 'Drag & drop your file here'}
            </h3>
            <p className="text-slate-500 mb-4">or click to browse from your device</p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1"><FileImage className="w-4 h-4" /> JPG, PNG, HEIC</span>
              <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> PDF</span>
              <span>Max 10MB</span>
            </div>
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
                    <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" loading="lazy" />
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
                <CardContent className="space-y-6 sm:space-y-8">
                  {/* Tabs Section */}
                  <div className="flex flex-col gap-3 pb-4 border-b border-slate-100">
                    <Label className="text-sm font-medium text-slate-700">File Type</Label>
                    <Tabs value={fileType} onValueChange={(v) => {
                      setFileType(v as FileType);
                      if (v === 'document') {
                        setCustomFormat('pdf');
                      } else if (customFormat === 'pdf') {
                        setCustomFormat('jpg');
                      }
                    }}>
                      <TabsList className="flex flex-wrap !h-auto min-h-[48px] w-full justify-start gap-2 p-1.5 bg-slate-100/80 rounded-xl">
                        <TabsTrigger value="photo" className="flex-1 min-w-[80px] !h-auto py-2.5 text-sm rounded-lg data-[state=active]:shadow-sm">Photo</TabsTrigger>
                        <TabsTrigger value="signature" className="flex-1 min-w-[80px] !h-auto py-2.5 text-sm rounded-lg data-[state=active]:shadow-sm">Signature</TabsTrigger>
                        {(currentExam?.left_thumb || selectedExamId === 'custom') && (
                          <TabsTrigger value="left_thumb" className="flex-1 min-w-[80px] !h-auto py-2.5 text-sm rounded-lg data-[state=active]:shadow-sm">L. Thumb</TabsTrigger>
                        )}
                        {(currentExam?.right_thumb || selectedExamId === 'custom') && (
                          <TabsTrigger value="right_thumb" className="flex-1 min-w-[80px] !h-auto py-2.5 text-sm rounded-lg data-[state=active]:shadow-sm">R. Thumb</TabsTrigger>
                        )}
                        <TabsTrigger value="document" className="flex-1 min-w-[80px] !h-auto py-2.5 text-sm rounded-lg data-[state=active]:shadow-sm">Document</TabsTrigger>
                        {(currentExam?.declaration || selectedExamId === 'custom') && (
                          <TabsTrigger value="declaration" className="flex-1 min-w-[80px] !h-auto py-2.5 text-sm rounded-lg data-[state=active]:shadow-sm">Declaration</TabsTrigger>
                        )}
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Exam Selection Section */}
                  <div className="flex flex-col gap-3 pt-2">
                    <Label htmlFor="exam" className="text-sm font-medium text-slate-700">Select Exam</Label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsPresetMenuOpen(!isPresetMenuOpen)}
                          className="flex min-h-10 w-full items-center justify-between gap-2 rounded-lg border border-input bg-transparent py-2 pr-3 pl-3 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 text-left"
                        >
                          <span className="line-clamp-2 flex-1">
                            {selectedExamId === 'custom' ? 'Custom' : EXAMS.find(e => e.id === selectedExamId)?.name || 'Select an exam'}
                          </span>
                          <motion.div
                            animate={{ rotate: isPresetMenuOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0"
                          >
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isPresetMenuOpen && (
                            <>
                              <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setIsPresetMenuOpen(false)} 
                              />
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md"
                              >
                                <div id="preset-menu-container" className="flex max-h-60 flex-col overflow-y-auto p-1 relative z-50">
                                  {sortedCategories.map(([category, exams]) => (
                                    <div key={category} className="mb-2">
                                      <div className="px-2 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-white sticky top-0 z-10">
                                        {category.replace(/_/g, ' ')}
                                      </div>
                                      {exams.map(exam => (
                                        <div
                                          key={exam.id}
                                          id={`preset-${exam.id}`}
                                          role="button"
                                          tabIndex={0}
                                          onClick={() => {
                                            setSelectedExamId(exam.id);
                                            setIsPresetMenuOpen(false);
                                            sendGAEvent({ event: 'preset_selected', value: { examId: exam.id } });
                                            if (fileType === 'declaration' && !exam.declaration) setFileType('photo');
                                            if (fileType === 'left_thumb' && !exam.left_thumb) setFileType('photo');
                                            if (fileType === 'right_thumb' && !exam.right_thumb) setFileType('photo');
                                            
                                            // Initialize custom format from preset for selectable exams like OTET
                                            if (exam.id === 'otet-2026') {
                                              setCustomFormat(fileType === 'photo' ? exam.photo.format : exam.signature.format);
                                            }
                                          }}
                                          className={`relative flex w-full cursor-default items-start rounded-md py-2 px-2 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 ${selectedExamId === exam.id ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-700'}`}
                                        >
                                          <span className="text-left break-words">{exam.name}</span>
                                        </div>
                                      ))}
                                    </div>
                                  ))}
                                  <div className="my-1 h-px bg-slate-100" />
                                  <button
                                    type="button"
                                    id="preset-custom"
                                    onClick={() => {
                                      setSelectedExamId('custom');
                                      setIsPresetMenuOpen(false);
                                      sendGAEvent({ event: 'preset_selected', value: { examId: 'custom' } });
                                    }}
                                    className={`relative flex w-full cursor-default items-center rounded-md py-2 px-2 text-sm font-bold outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 ${selectedExamId === 'custom' ? 'bg-slate-100 text-slate-900' : 'text-slate-900'}`}
                                  >
                                    Custom
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      {selectedExamId !== 'custom' && currentExam && (
                        <div className="text-sm text-slate-700 bg-blue-50 p-4 sm:p-5 rounded-xl border border-blue-100 space-y-2">
                          <p className="font-semibold text-blue-900">{currentExam.name} Requirements</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>{currentExam.photo.description}</li>
                            <li>{currentExam.signature.description}</li>
                            {currentExam.left_thumb && <li>{currentExam.left_thumb.description}</li>}
                            {currentExam.right_thumb && <li>{currentExam.right_thumb.description}</li>}
                            {currentExam.document && <li>{currentExam.document.description}</li>}
                            {currentExam.declaration && <li>{currentExam.declaration.description}</li>}
                          </ul>
                          {currentExam.notes && (
                            <div className="flex items-start gap-2 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
                              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                              <p className="text-sm font-medium">{currentExam.notes}</p>
                            </div>
                          )}
                          <p className="text-xs text-slate-500 mt-2 italic">
                            Image specifications are based on commonly used exam requirements. Always verify the latest instructions from the official exam notification.
                          </p>
                        </div>
                      )}
                    </div>

                  <div className="space-y-6 pt-6 border-t border-slate-100">
                    <div className="bg-blue-50/50 border border-blue-100 p-4 sm:p-5 rounded-xl space-y-2">
                      <div className="flex items-start sm:items-center space-x-3">
                        <input 
                          type="checkbox" 
                          id="govExamMode" 
                          checked={isGovExamMode} 
                          onChange={(e) => setIsGovExamMode(e.target.checked)}
                          className="w-5 h-5 mt-0.5 sm:mt-0 text-blue-600 rounded border-slate-300 focus:ring-blue-500 shrink-0"
                        />
                        <Label htmlFor="govExamMode" className="font-semibold text-slate-900 cursor-pointer text-sm sm:text-base">Fix Upload Error (Gov Exam Mode)</Label>
                      </div>
                      <p className="text-sm text-slate-600 pl-8 leading-relaxed">Automatically converts your image into exam-compatible format (like MS Paint) by removing hidden metadata and fixing encoding issues.</p>
                    </div>

                    <div className="space-y-5 pt-2">
                      <h4 className="text-sm font-semibold text-slate-900">Dimensions & Size</h4>
                      <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2.5">
                          <Label htmlFor="width" className="text-slate-700 text-sm">Width (px)</Label>
                          <Input id="width" type={isCustom || (fileType === 'document' && !currentExam?.document) ? "number" : "text"} placeholder="Auto" className="h-11" value={isCustom || (fileType === 'document' && !currentExam?.document) ? customWidth : currentReq?.width || 'Auto'} onChange={e => setCustomWidth(e.target.value)} disabled={!isCustom && !(fileType === 'document' && !currentExam?.document)} />
                        </div>
                        <div className="space-y-2.5">
                          <Label htmlFor="height" className="text-slate-700 text-sm">Height (px)</Label>
                          <Input id="height" type={isCustom || (fileType === 'document' && !currentExam?.document) ? "number" : "text"} placeholder="Auto" className="h-11" value={isCustom || (fileType === 'document' && !currentExam?.document) ? customHeight : currentReq?.height || 'Auto'} onChange={e => setCustomHeight(e.target.value)} disabled={!isCustom && !(fileType === 'document' && !currentExam?.document)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2.5">
                          <Label htmlFor="minSize" className="text-slate-700 text-sm">Min Size (KB)</Label>
                          <Input id="minSize" type="number" placeholder="e.g. 20" className="h-11" value={isCustom || (fileType === 'document' && !currentExam?.document) ? customMinSize : currentReq?.minSizeKb || ''} onChange={e => setCustomMinSize(e.target.value)} disabled={!isCustom && !(fileType === 'document' && !currentExam?.document)} />
                        </div>
                        <div className="space-y-2.5">
                          <Label htmlFor="maxSize" className="text-slate-700 text-sm">Max Size (KB)</Label>
                          <Input id="maxSize" type="number" placeholder="e.g. 50" className="h-11" value={isCustom || (fileType === 'document' && !currentExam?.document) ? customMaxSize : currentReq?.maxSizeKb || ''} onChange={e => setCustomMaxSize(e.target.value)} disabled={!isCustom && !(fileType === 'document' && !currentExam?.document)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2.5">
                          <Label htmlFor="format" className="text-slate-700 text-sm">Format</Label>
                          <Select 
                            value={(isCustom || (fileType === 'document' && !currentExam?.document) || selectedExamId === 'otet-2026') ? customFormat : currentReq?.format || 'jpg'} 
                            onValueChange={(v) => v && setCustomFormat(v)} 
                            disabled={!isCustom && !(fileType === 'document' && !currentExam?.document) && selectedExamId !== 'otet-2026'}
                          >
                            <SelectTrigger id="format" className="h-11">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jpg">JPG</SelectItem>
                              <SelectItem value="jpeg">JPEG</SelectItem>
                              <SelectItem value="png">PNG</SelectItem>
                              {(fileType === 'document' || fileType === 'declaration') && <SelectItem value="pdf">PDF</SelectItem>}
                            </SelectContent>
                          </Select>
                        </div>
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
              <Card id="results-section" className={`border ${isSizeValid ? 'border-green-200 bg-green-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isSizeValid ? 'text-green-800' : 'text-amber-800'}`}>
                    {isSizeValid ? (
                      <CheckCircle2 className="w-6 h-6 text-[#28a745]" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-amber-500" />
                    )}
                    {isSizeValid ? `Valid as per ${currentExam ? currentExam.name : 'official'} guidelines` : 'File too large/small'}
                  </CardTitle>
                  <CardDescription className={isSizeValid ? 'text-green-700' : 'text-amber-700'}>
                    {isSizeValid 
                      ? 'Your file has been optimized to meet the official requirements.' 
                      : `The optimized file size (${formatBytes(result.size)}) is outside the required range (${minSizeKb || 0}KB - ${maxSizeKb || '∞'}KB).`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`bg-white p-4 rounded-lg border shadow-sm ${isSizeValid ? 'border-green-100' : 'border-amber-100'}`}>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="text-slate-500">Final Size:</div>
                      <div className={`font-semibold ${!isSizeValid ? 'text-amber-600' : 'text-slate-900'}`}>
                        {formatBytes(result.size)}
                        {!isSizeValid && ' ⚠️'}
                      </div>
                      
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
                  {isSizeValid ? (
                    <a 
                      href={result.url} 
                      download={result.filename}
                      onClick={() => sendGAEvent({ event: 'file_downloaded', value: { examId: selectedExamId, fileType, format: result.format, size: result.size } })}
                      className="w-full bg-[#28a745] hover:bg-green-700 text-white h-12 text-lg inline-flex items-center justify-center rounded-md font-medium transition-colors"
                    >
                      <Download className="w-5 h-5 mr-2" /> Download File
                    </a>
                  ) : (
                    <Button 
                      disabled
                      className="w-full bg-slate-300 text-slate-500 h-12 text-lg inline-flex items-center justify-center rounded-md font-medium cursor-not-allowed"
                    >
                      <Download className="w-5 h-5 mr-2" /> Download File
                    </Button>
                  )}
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
