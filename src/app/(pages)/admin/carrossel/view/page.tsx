"use client";

import ButtonQuali from "@/components/ui/button-quali";
import CarouselImageCard, {
  CarouselImage,
} from "@/components/ui/carousel-image-card";
import Footer from "@/components/ui/footer";
import NavbarAdmin from "@/components/ui/navbar-admin";
import { db, storage } from "@/firebase/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CarrosselAdmin() {
  const router = useRouter();

  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(
          query(collection(db, "carousel-images"), orderBy("order", "asc"))
        );
        setImages(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<CarouselImage, "id">),
          }))
        );
      } catch (err) {
        console.error("Erro ao carregar imagens do carrossel:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleCheckboxChange = (imageId: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, imageId] : prev.filter((id) => id !== imageId)
    );
  };

  const handleDelete = async (ids: string[]) => {
    try {
      for (const id of ids) {
        const image = images.find((img) => img.id === id);
        if (image?.storagePath) {
          try {
            await deleteObject(ref(storage, image.storagePath));
          } catch (err) {
            console.error("Erro ao remover do Storage:", err);
          }
        }
        await deleteDoc(doc(db, "carousel-images", id));
      }
      setImages((prev) => prev.filter((img) => !ids.includes(img.id)));
      setSelected([]);
    } catch (err) {
      console.error("Erro ao remover imagens:", err);
    }
  };

  const handleDeleteSelected = () => {
    if (selected.length === 0) return;
    toast.warning("Tem certeza que deseja remover as imagens selecionadas?", {
      action: {
        label: "Remover",
        onClick: async () => {
          await handleDelete(selected);
          toast.success("Imagens removidas com sucesso!");
        },
      },
    });
  };

  const swapOrder = async (indexA: number, indexB: number) => {
    const a = images[indexA];
    const b = images[indexB];
    if (!a || !b) return;
    try {
      await Promise.all([
        updateDoc(doc(db, "carousel-images", a.id), { order: b.order }),
        updateDoc(doc(db, "carousel-images", b.id), { order: a.order }),
      ]);
      const next = [...images];
      next[indexA] = { ...b, order: a.order };
      next[indexB] = { ...a, order: b.order };
      next.sort((x, y) => x.order - y.order);
      setImages(next);
    } catch (err) {
      console.error("Erro ao reordenar imagens:", err);
      toast.error("Erro ao reordenar imagens.");
    }
  };

  const handleMoveUp = (imageId: string) => {
    const idx = images.findIndex((img) => img.id === imageId);
    if (idx > 0) swapOrder(idx, idx - 1);
  };

  const handleMoveDown = (imageId: string) => {
    const idx = images.findIndex((img) => img.id === imageId);
    if (idx !== -1 && idx < images.length - 1) swapOrder(idx, idx + 1);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white font-poppins">
      <NavbarAdmin />
      <main className="w-full flex items-center justify-center text-black">
        <div className="max-w-5xl mx-auto w-full px-4 pb-10">
          <h1 className="text-3xl font-bold text-center mb-4 text-verde-petroleo mt-6">
            Carrossel
          </h1>

          <div className="flex justify-center space-x-4 mb-8">
            <Link href="/admin/carrossel/write">
              <ButtonQuali
                text="adicionar imagem"
                onClick={() => router.push("/admin/carrossel/write")}
              />
            </Link>
            <ButtonQuali text="remover imagens" onClick={handleDeleteSelected} />
          </div>

          <section className="mb-8">
            <div className="flex flex-col gap-4 bg-rosa font-roboto p-6 rounded-[5px] max-w-[911px] mx-auto">
              {loading ? (
                <p className="text-center">Carregando imagens...</p>
              ) : images.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhuma imagem cadastrada.
                </p>
              ) : (
                images.map((image, idx) => (
                  <CarouselImageCard
                    key={image.id}
                    image={image}
                    selected={selected.includes(image.id)}
                    onCheckboxChange={handleCheckboxChange}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                    canMoveUp={idx > 0}
                    canMoveDown={idx < images.length - 1}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
