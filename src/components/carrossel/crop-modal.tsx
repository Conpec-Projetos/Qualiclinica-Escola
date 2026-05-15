"use client";

import ButtonQuali from "@/components/ui/button-quali";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCroppedFile } from "@/lib/crop-image";
import { useCallback, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { toast } from "sonner";

interface CropModalProps {
  open: boolean;
  imageSrc: string | null;
  fileName: string;
  mimeType: string;
  onCancel: () => void;
  onConfirm: (file: File) => void;
}

const CAROUSEL_ASPECT = 16 / 10;

export default function CropModal({
  open,
  imageSrc,
  fileName,
  mimeType,
  onCancel,
  onConfirm,
}: CropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCropComplete = useCallback(
    (_: Area, areaPixels: Area) => setCroppedArea(areaPixels),
    []
  );

  const reset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedArea(null);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const handleConfirm = async () => {
    if (!imageSrc || !croppedArea) return;
    setIsProcessing(true);
    try {
      const file = await getCroppedFile(
        imageSrc,
        croppedArea,
        mimeType,
        fileName
      );
      onConfirm(file);
      reset();
    } catch (err) {
      console.error("Erro ao recortar a imagem:", err);
      toast.error("Erro ao recortar a imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) handleCancel();
      }}
    >
      <DialogContent
        className="sm:max-w-[640px] bg-white"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-verde-petroleo">
            Ajustar imagem
          </DialogTitle>
          <DialogDescription>
            Arraste e use o zoom para escolher a parte que aparecerá no
            carrossel. O recorte mantém a proporção 16:10.
          </DialogDescription>
        </DialogHeader>

        <div className="relative w-full h-[320px] bg-ciano-escuro/20 rounded-[10px] overflow-hidden">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={CAROUSEL_ASPECT}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              objectFit="contain"
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-verde-petroleo font-poppins">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            aria-label="Zoom"
            className="flex-1 accent-magenta cursor-pointer"
          />
        </div>

        <DialogFooter>
          <ButtonQuali
            text="CANCELAR"
            buttonSize="normal"
            fontSize="normal"
            onClick={handleCancel}
            disabled={isProcessing}
          />
          <ButtonQuali
            text={isProcessing ? "PROCESSANDO..." : "CONFIRMAR"}
            buttonSize="normal"
            fontSize="normal"
            onClick={handleConfirm}
            disabled={isProcessing || !croppedArea}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
