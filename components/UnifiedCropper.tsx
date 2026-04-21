import React, { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent, SyntheticEvent } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PerspT from 'perspective-transform';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crop as CropIcon, Scan } from 'lucide-react';

interface UnifiedCropperProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onCropComplete: (file: File) => void;
  originalFileName: string;
}

interface Point {
  x: number;
  y: number;
}

export default function UnifiedCropper({ isOpen, onClose, imageUrl, onCropComplete, originalFileName }: UnifiedCropperProps) {
  const [activeTab, setActiveTab] = useState<'standard' | 'perspective'>('standard');
  const [isProcessing, setIsProcessing] = useState(false);

  // --- STANDARD CROP STATE ---
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRefStandard = useRef<HTMLImageElement>(null);

  // --- PERSPECTIVE CROP STATE ---
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefPerspective = useRef<HTMLImageElement>(null);
  const [points, setPoints] = useState<[Point, Point, Point, Point]>([
    { x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }
  ]);
  const [isPerspectiveReady, setIsPerspectiveReady] = useState(false);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  // --- TAB SWITCH & RESET ---
  useEffect(() => {
    if (isOpen) {
      setActiveTab('standard');
      setCrop(undefined);
      setCompletedCrop(undefined);
      setIsPerspectiveReady(false);
      setPoints([{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }]);
    }
  }, [isOpen, imageUrl]);

  const handleTabChange = (val: string) => {
    setActiveTab(val as 'standard' | 'perspective');
    // We naturally reset state by letting the components unmount/remount
    // But we also reset local variables just in case
    if (val === 'standard') {
      setCrop(undefined);
      setCompletedCrop(undefined);
    } else {
      setIsPerspectiveReady(false);
      setPoints([{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }]);
    }
  };

  // --- STANDARD CROP LOGIC ---
  function onStandardImageLoad(img: HTMLImageElement) {
    const { width, height } = img;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 80 }, width / height, width, height),
      width,
      height
    );
    setCrop(initialCrop);
  }

  const processStandardCrop = async () => {
    if (!completedCrop || !imgRefStandard.current) return;
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 50)); 
    try {
      const image = imgRefStandard.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No 2d context');

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
      canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);
      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = 'high';

      const cropX = completedCrop.x * scaleX;
      const cropY = completedCrop.y * scaleY;
      const cropWidth = completedCrop.width * scaleX;
      const cropHeight = completedCrop.height * scaleY;

      ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95));
      if (blob) {
        const cleanName = originalFileName.replace(/\.[^/.]+$/, "");
        const croppedFile = new File([blob], `cropped_${cleanName}.jpg`, { type: 'image/jpeg' });
        onCropComplete(croppedFile);
        onClose();
      }
    } catch (e) {
      console.error('Failed to standard crop image', e);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- PERSPECTIVE CROP LOGIC ---
  const onPerspectiveImageLoad = (img: HTMLImageElement) => {
    const { width, height } = img;
    const padX = width * 0.1;
    const padY = height * 0.1;
    setPoints([
      { x: padX, y: padY },
      { x: width - padX, y: padY },
      { x: width - padX, y: height - padY },
      { x: padX, y: height - padY }
    ]);
    setIsPerspectiveReady(true);
  };

  const startDrag = (idx: number) => setDraggingIdx(idx);

  const onDrag = (clientX: number, clientY: number) => {
    if (draggingIdx === null || !imgRefPerspective.current) return;
    const rect = imgRefPerspective.current.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    setPoints(prev => {
      const newPts = [...prev] as [Point, Point, Point, Point];
      newPts[draggingIdx] = { x, y };
      return newPts;
    });
  };

  const endDrag = () => setDraggingIdx(null);

  const handleMouseMove = (e: ReactMouseEvent) => onDrag(e.clientX, e.clientY);
  const handleMouseUp = () => endDrag();

  const handleTouchMove = (e: ReactTouchEvent) => {
    if (draggingIdx !== null) { } // handled by CSS touchAction
    const touch = e.touches[0];
    onDrag(touch.clientX, touch.clientY);
  };
  const handleTouchEnd = () => endDrag();

  const toPolygonString = (pts: [Point, Point, Point, Point]) => pts.map(p => `${p.x},${p.y}`).join(' ');

  const processPerspectiveCrop = async () => {
    if (!imgRefPerspective.current) return;
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 50)); 
    try {
      const img = imgRefPerspective.current;
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      const srcPts = points.map(p => ({ x: p.x * scaleX, y: p.y * scaleY }));
      
      const dist = (p1: Point, p2: Point) => Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const widthTop = dist(srcPts[0], srcPts[1]);
      const widthBottom = dist(srcPts[3], srcPts[2]);
      const heightLeft = dist(srcPts[0], srcPts[3]);
      const heightRight = dist(srcPts[1], srcPts[2]);
      
      const outWidth = Math.round(Math.max(widthTop, widthBottom));
      const outHeight = Math.round(Math.max(heightLeft, heightRight));
      
      const dstPtsList = [0, 0, outWidth, 0, outWidth, outHeight, 0, outHeight];
      const srcPtsList = [
        srcPts[0].x, srcPts[0].y, srcPts[1].x, srcPts[1].y,
        srcPts[2].x, srcPts[2].y, srcPts[3].x, srcPts[3].y
      ];

      const transform = PerspT(dstPtsList, srcPtsList);

      const srcCanvas = document.createElement('canvas');
      srcCanvas.width = img.naturalWidth;
      srcCanvas.height = img.naturalHeight;
      const srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true })!;
      srcCtx.drawImage(img, 0, 0);
      const srcData = srcCtx.getImageData(0, 0, srcCanvas.width, srcCanvas.height);
      const srcPixels = srcData.data;

      const dstCanvas = document.createElement('canvas');
      dstCanvas.width = outWidth;
      dstCanvas.height = outHeight;
      const dstCtx = dstCanvas.getContext('2d')!;
      const dstData = dstCtx.createImageData(outWidth, outHeight);
      const dstPixels = dstData.data;

      const srcW = srcCanvas.width;
      const srcH = srcCanvas.height;

      for (let y = 0; y < outHeight; y++) {
        for (let x = 0; x < outWidth; x++) {
          const [sx, sy] = transform.transform(x, y);
          const sx1 = Math.floor(sx);
          const sy1 = Math.floor(sy);
          const sx2 = Math.min(sx1 + 1, srcW - 1);
          const sy2 = Math.min(sy1 + 1, srcH - 1);
          const dx = sx - sx1;
          const dy = sy - sy1;
          const row1 = sy1 * srcW;
          const row2 = sy2 * srcW;
          const p11 = (row1 + sx1) * 4;
          const p21 = (row1 + sx2) * 4;
          const p12 = (row2 + sx1) * 4;
          const p22 = (row2 + sx2) * 4;
          const dstIdx = (y * outWidth + x) * 4;

          if (sx1 < 0 || sx2 >= srcW || sy1 < 0 || sy2 >= srcH) {
            dstPixels[dstIdx] = dstPixels[dstIdx+1] = dstPixels[dstIdx+2] = dstPixels[dstIdx+3] = 0;
            continue;
          }
          
          for (let c = 0; c < 4; c++) {
            const val1 = srcPixels[p11 + c] * (1 - dx) + srcPixels[p21 + c] * dx;
            const val2 = srcPixels[p12 + c] * (1 - dx) + srcPixels[p22 + c] * dx;
            dstPixels[dstIdx + c] = val1 * (1 - dy) + val2 * dy;
          }
        }
      }
      
      dstCtx.putImageData(dstData, 0, 0);
      const blob = await new Promise<Blob | null>((resolve) => dstCanvas.toBlob(resolve, 'image/jpeg', 0.95));

      if (blob) {
        const cleanName = originalFileName.replace(/\.[^/.]+$/, "");
        const croppedFile = new File([blob], `scanned_${cleanName}.jpg`, { type: 'image/jpeg' });
        onCropComplete(croppedFile);
        onClose();
      }
    } catch (err) {
      console.error("Perspective crop failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- RENDER HELPERS ---
  const isApplyDisabled = isProcessing || (activeTab === 'standard' ? !completedCrop : !isPerspectiveReady);
  const onApply = activeTab === 'standard' ? processStandardCrop : processPerspectiveCrop;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-4 sm:p-6 bg-slate-50 border-slate-200">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2 text-slate-900">
            <CropIcon className="w-5 h-5 text-[#0056b3]" />
            Crop Image
          </DialogTitle>
          <DialogDescription className="text-slate-500 min-h-[40px]">
            {activeTab === 'standard' 
              ? "Drag the edges to crop your photo or signature tightly. This helps the optimizer focus on the right content."
              : "Drag the 4 corners to fit your document's outline. We will automatically stretch, flatten, and crop it."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="standard" value={activeTab} onValueChange={handleTabChange} className="w-full mt-2">
          <TabsList className="grid w-full grid-cols-2 mb-4 h-12 bg-slate-100 p-1 rounded-lg">
            <TabsTrigger value="standard" className="text-sm rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[active]:bg-white data-[active]:shadow-sm">
              <CropIcon className="w-4 h-4 mr-2" /> Standard Crop
            </TabsTrigger>
            <TabsTrigger value="perspective" className="text-sm rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[active]:bg-white data-[active]:shadow-sm">
              <Scan className="w-4 h-4 mr-2" /> Perspective Scan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="mt-0 outline-none animate-in fade-in-0 slide-in-from-bottom-1 duration-300 ease-in-out">
            <div className="flex justify-center items-center overflow-auto bg-[#e2e8f0] rounded-lg border border-slate-300 min-h-[40vh] max-h-[50vh] sm:max-h-[55vh] p-4">
              {imageUrl && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  className="max-h-full transition-opacity duration-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRefStandard}
                    src={imageUrl}
                    alt="Standard Crop preview"
                    onLoad={(e) => onStandardImageLoad(e.currentTarget)}
                    className="max-h-[40vh] sm:max-h-[50vh] w-auto object-contain flex-shrink-0 mx-auto"
                    style={{ touchAction: 'none' }}
                  />
                </ReactCrop>
              )}
            </div>
          </TabsContent>

          <TabsContent value="perspective" className="mt-0 outline-none animate-in fade-in-0 slide-in-from-bottom-1 duration-300 ease-in-out">
            <div 
              className="relative flex justify-center items-center bg-[#e2e8f0] rounded-lg border border-slate-300 p-0 overflow-hidden select-none outline-none min-h-[40vh] max-h-[50vh] sm:max-h-[55vh]"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              style={{ touchAction: draggingIdx !== null ? 'none' : 'auto' }}
            >
              {imageUrl && (
                <div className="relative inline-block text-center flex-shrink-0" style={{ maxWidth: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRefPerspective}
                    src={imageUrl}
                    alt="Document to scan"
                    draggable={false}
                    onLoad={(e) => onPerspectiveImageLoad(e.currentTarget)}
                    className="max-h-[40vh] sm:max-h-[50vh] w-auto mx-auto object-contain block pointer-events-none"
                  />
                  
                  {isPerspectiveReady && imgRefPerspective.current && (
                    <svg 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 mx-auto"
                      style={{ width: imgRefPerspective.current.width, height: imgRefPerspective.current.height, left: '50%', transform: 'translateX(-50%)' }}
                    >
                      <mask id="hole-mask">
                        <rect width="100%" height="100%" fill="white" />
                        <polygon points={toPolygonString(points)} fill="black" />
                      </mask>
                      <rect width="100%" height="100%" fill="rgba(0,0,0,0.6)" mask="url(#hole-mask)" />
                      <polygon points={toPolygonString(points)} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" />
                      
                      {points.map((pt, idx) => (
                        <g 
                          key={idx} 
                          className="pointer-events-auto cursor-move origin-center"
                          onMouseDown={(e) => { e.stopPropagation(); startDrag(idx); }}
                          onTouchStart={(e) => { e.stopPropagation(); startDrag(idx); }}
                        >
                          <circle cx={pt.x} cy={pt.y} r={28} fill="transparent" />
                          <circle cx={pt.x} cy={pt.y} r={9} fill="white" stroke="#2563eb" strokeWidth="2.5" className="shadow-lg" />
                          <circle cx={pt.x} cy={pt.y} r={3} fill="#2563eb" />
                        </g>
                      ))}
                      <defs>
                        <radialGradient id="corner-glow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="rgba(59,130,246,0.3)"/>
                          <stop offset="100%" stopColor="rgba(59,130,246,0)"/>
                        </radialGradient>
                      </defs>
                      {draggingIdx !== null && (
                        <circle cx={points[draggingIdx].x} cy={points[draggingIdx].y} r={24} fill="url(#corner-glow)" className="pointer-events-none" />
                      )}
                    </svg>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4 flex flex-row gap-3 sm:justify-end">
          <Button variant="outline" className="flex-1 sm:flex-none border-slate-300 bg-white" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={onApply} disabled={isApplyDisabled} className="bg-[#0056b3] hover:bg-[#004494] text-white flex-1 sm:flex-none">
            {isProcessing ? 'Processing...' : 'Apply Crop'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
