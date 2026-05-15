"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselImage {
  id: string;
  imageUrl: string;
  alt: string;
  caption?: string;
  linkUrl?: string;
}

const isExternalLink = (link: string) => /^https?:\/\//i.test(link);

export default function HomeCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "carousel-images"), orderBy("order", "asc"))
        );
        setImages(
          snap.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<CarouselImage, "id">),
          }))
        );
      } catch (err) {
        console.error("Erro ao carregar imagens do carrossel:", err);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (images.length === 0) return null;

  return (
    <section className="w-full bg-menta-claro2 py-[3.75rem] px-4">
      <div className="max-w-[90dvw] mx-auto">
        <Carousel
          opts={{ loop: true, align: "center" }}
          plugins={[autoplay.current]}
          setApi={setApi}
        >
          <CarouselContent className="items-center">
            {images.map((image, idx) => {
              const isCenter = idx === selectedIndex;
              const slide = (
                <div
                  className={`relative w-full overflow-hidden bg-ciano-escuro/30 shadow-md transition-all duration-300 ${
                    isCenter
                      ? "aspect-[16/10] scale-100 rounded-2xl shadow-xl z-10"
                      : "aspect-[16/10] scale-80 rounded-lg opacity-70"
                  }`}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-verde-petroleo/70 text-white px-4 py-2 text-sm md:text-base font-poppins">
                      {image.caption}
                    </div>
                  )}
                </div>
              );

              return (
                <CarouselItem
                  key={image.id}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  {image.linkUrl ? (
                    isExternalLink(image.linkUrl) ? (
                      <a
                        href={image.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {slide}
                      </a>
                    ) : (
                      <Link href={image.linkUrl} className="block">
                        {slide}
                      </Link>
                    )
                  ) : (
                    slide
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="text-magenta hover:text-verde-petroleo border-magenta" />
          <CarouselNext className="text-magenta hover:text-verde-petroleo border-magenta" />
        </Carousel>
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors cursor-pointer ${
                selectedIndex === i ? "bg-magenta" : "bg-ciano-escuro"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
