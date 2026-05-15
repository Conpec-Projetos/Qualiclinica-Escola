"use client";
import ArrowLeft from "@/assets/arrow-left.svg";
import CropModal from "@/components/carrossel/crop-modal";
import ButtonQuali from "@/components/ui/button-quali";
import Footer from "@/components/ui/footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import NavbarAdmin from "@/components/ui/navbar-admin";
import { db, storage } from "@/firebase/firebase-config";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const carouselImageSchema = z.object({
  alt: z.string().min(1, "O texto alternativo é obrigatório"),
  caption: z.string().optional(),
  linkUrl: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val.trim() === "" ||
        val.startsWith("/") ||
        /^https?:\/\//i.test(val),
      { message: "Informe um link válido (http://..., https://... ou /rota)" }
    ),
});

type CarouselImageFormData = z.infer<typeof carouselImageSchema>;

export default function CarouselImageEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col w-screen h-screen justify-center items-center">
          <p className="text-2xl text-magenta">Carregando...</p>
        </div>
      }
    >
      <Editor />
    </Suspense>
  );
}

function Editor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageId = searchParams.get("imageId");

  const [isSending, setIsSending] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingStoragePath, setExistingStoragePath] = useState<string | null>(
    null
  );
  const [rawSrc, setRawSrc] = useState<string | null>(null);
  const [rawFileName, setRawFileName] = useState("");
  const [rawMimeType, setRawMimeType] = useState("image/jpeg");
  const [cropOpen, setCropOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CarouselImageFormData>({
    resolver: zodResolver(carouselImageSchema),
    defaultValues: { alt: "", caption: "", linkUrl: "" },
    mode: "onChange",
  });

  const { reset, handleSubmit } = form;

  useEffect(() => {
    const fetchImage = async () => {
      if (!imageId) return;
      try {
        const docRef = doc(db, "carousel-images", imageId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          reset({
            alt: data.alt || "",
            caption: data.caption || "",
            linkUrl: data.linkUrl || "",
          });
          setImageUrl(data.imageUrl || "");
          setExistingStoragePath(data.storagePath || null);
        }
      } catch (err) {
        console.error("Erro ao carregar a imagem:", err);
      }
    };
    fetchImage();
  }, [imageId, reset]);

  const startCropFromFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.warning("Selecione um arquivo de imagem.");
      return;
    }
    if (rawSrc) URL.revokeObjectURL(rawSrc);
    setRawSrc(URL.createObjectURL(file));
    setRawFileName(file.name);
    setRawMimeType(file.type);
    setCropOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) startCropFromFile(file);
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) startCropFromFile(file);
  };

  const handleCropConfirm = (file: File) => {
    if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    if (rawSrc) {
      URL.revokeObjectURL(rawSrc);
      setRawSrc(null);
    }
    setCropOpen(false);
  };

  const handleCropCancel = () => {
    if (rawSrc) {
      URL.revokeObjectURL(rawSrc);
      setRawSrc(null);
    }
    setCropOpen(false);
  };

  const onSubmit = async (data: CarouselImageFormData) => {
    setIsSending(true);
    try {
      if (!imageId && !imageFile) {
        toast.warning("Selecione uma imagem para o carrossel.");
        setIsSending(false);
        return;
      }

      const payload: Record<string, string | null> = {
        alt: data.alt,
        caption: data.caption?.trim() ? data.caption.trim() : null,
        linkUrl: data.linkUrl?.trim() ? data.linkUrl.trim() : null,
      };

      if (imageFile) {
        const storagePath = `images/carrossel/${crypto.randomUUID()}-${imageFile.name}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, imageFile);
        payload.imageUrl = await getDownloadURL(storageRef);
        payload.storagePath = storagePath;

        if (imageId && existingStoragePath) {
          try {
            await deleteObject(ref(storage, existingStoragePath));
          } catch (err) {
            console.error("Erro ao remover imagem antiga do Storage:", err);
          }
        }
      }

      if (imageId) {
        await updateDoc(doc(db, "carousel-images", imageId), payload);
        toast.success("Imagem atualizada com sucesso!");
      } else {
        const orderSnap = await getDocs(
          query(collection(db, "carousel-images"), orderBy("order", "desc"))
        );
        const nextOrder = orderSnap.empty
          ? 0
          : (orderSnap.docs[0].data().order ?? 0) + 1;
        await addDoc(collection(db, "carousel-images"), {
          ...payload,
          order: nextOrder,
          createdAt: serverTimestamp(),
        });
        toast.success("Imagem adicionada com sucesso!");
      }

      router.push("/admin/carrossel/view");
    } catch (err) {
      console.error("Erro ao salvar a imagem:", err);
      toast.error("Erro ao salvar a imagem.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white font-poppins">
      <NavbarAdmin />
      <Image
        className="cursor-pointer mt-2 ml-3"
        onClick={() => router.push("/admin/carrossel/view")}
        alt="voltar"
        src={ArrowLeft}
        unoptimized
      />
      <main className="w-full flex flex-col items-center justify-center text-black">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-6 bg-ciano p-6 rounded-[5px] max-w-[648px] mx-auto w-full"
          >
            <h1 className="text-verde-petroleo font-bold text-center mb-5">
              Editor de imagens do carrossel
            </h1>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative w-full h-[280px] rounded-[10px] overflow-hidden mb-5 flex items-center justify-center text-menta-claro1 transition-all ${
                isDragging
                  ? "bg-ciano-escuro/50 ring-2 ring-magenta"
                  : "bg-ciano-escuro/30"
              }`}
            >
              {imageUrl ? (
                <Image
                  alt="Pré-visualização"
                  src={imageUrl}
                  fill
                  sizes="100%"
                  className="object-cover select-none pointer-events-none"
                  unoptimized
                />
              ) : (
                <p className="text-verde-petroleo text-center px-4 pointer-events-none">
                  Arraste uma imagem aqui ou clique no botão
                </p>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-12 h-12 flex items-center justify-center cursor-pointer absolute bottom-3 right-3 bg-white hover:bg-menta transition-colors rounded-full"
                aria-label="Enviar imagem"
              >
                <UploadIcon className="text-ciano-escuro w-6 h-6" />
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="alt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto alternativo*</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Descrição da imagem para acessibilidade"
                        className="w-full p-2 border border-ciano-escuro text-verde-petroleo text-[18px] focus:outline-none bg-white rounded-[10px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legenda (opcional)</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Texto exibido sobre a imagem"
                        className="w-full p-2 border border-ciano-escuro text-verde-petroleo text-[18px] focus:outline-none bg-white rounded-[10px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link ao clicar (opcional)</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="http://..., https://... ou /rota"
                        className="w-full p-2 border border-ciano-escuro text-verde-petroleo text-[18px] focus:outline-none bg-white rounded-[10px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex justify-center mt-6">
              <ButtonQuali
                buttonSize="large"
                fontSize="large"
                text={
                  isSending
                    ? imageId
                      ? "ATUALIZANDO..."
                      : "ADICIONANDO..."
                    : imageId
                      ? "ATUALIZAR IMAGEM"
                      : "ADICIONAR IMAGEM"
                }
                disabled={isSending}
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </Form>
      </main>
      <Footer />
      <CropModal
        open={cropOpen}
        imageSrc={rawSrc}
        fileName={rawFileName}
        mimeType={rawMimeType}
        onCancel={handleCropCancel}
        onConfirm={handleCropConfirm}
      />
    </div>
  );
}
