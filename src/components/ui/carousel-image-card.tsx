import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import Checkbox from "@/components/ui/checkbox";

export interface CarouselImage {
  id: string;
  imageUrl: string;
  storagePath: string;
  alt: string;
  caption?: string | null;
  linkUrl?: string | null;
  order: number;
}

interface CarouselImageCardProps {
  image: CarouselImage;
  selected: boolean;
  onCheckboxChange: (imageId: string, checked: boolean) => void;
  onMoveUp: (imageId: string) => void;
  onMoveDown: (imageId: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export default function CarouselImageCard({
  image,
  selected,
  onCheckboxChange,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: CarouselImageCardProps) {
  return (
    <div className="flex w-full max-w-[911px]">
      <div className="flex flex-col gap-4 items-center">
        <Checkbox
          checked={selected}
          onChange={(checked) => onCheckboxChange(image.id, checked)}
        />
        <Link href={`/admin/carrossel/write?imageId=${image.id}`}>
          <svg
            width="26"
            height="28"
            viewBox="0 0 26 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M13.6668 27.3333V23.2333L21.0335 15.9C21.2335 15.7 21.4557 15.5555 21.7002 15.4666C21.9446 15.3777 22.1891 15.3333 22.4335 15.3333C22.7002 15.3333 22.9557 15.3833 23.2002 15.4833C23.4446 15.5833 23.6668 15.7333 23.8668 15.9333L25.1002 17.1666C25.3002 17.3666 25.4446 17.5888 25.5335 17.8333C25.6224 18.0777 25.6668 18.3222 25.6668 18.5666C25.6668 18.8111 25.6168 19.0611 25.5168 19.3166C25.4168 19.5722 25.2678 19.8 25.0698 20L17.7668 27.3333H13.6668ZM15.6668 25.3333H16.9335L20.9668 21.2666L20.3668 20.6333L19.7335 20.0333L15.6668 24.0666V25.3333ZM2.3335 27.3333C1.80016 27.3333 1.3335 27.1333 0.933496 26.7333C0.533496 26.3333 0.333496 25.8666 0.333496 25.3333V2.66663C0.333496 2.13329 0.533496 1.66663 0.933496 1.26663C1.3335 0.866626 1.80016 0.666626 2.3335 0.666626H13.6668L21.6668 8.66663V12.5333H19.6668V9.99996H12.3335V2.66663H2.3335V25.3333H11.6668V27.3333H2.3335ZM20.3668 20.6333L19.7335 20.0333L20.9668 21.2666L20.3668 20.6333Z"
              fill="#991871"
            />
          </svg>
        </Link>
        <button
          type="button"
          aria-label="Mover para cima"
          disabled={!canMoveUp}
          onClick={() => onMoveUp(image.id)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-magenta text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-verde-petroleo transition-colors"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Mover para baixo"
          disabled={!canMoveDown}
          onClick={() => onMoveDown(image.id)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-magenta text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-verde-petroleo transition-colors"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
      <div className="flex grow bg-white p-4 ml-4 rounded-[5px] text-lg gap-4">
        <div className="relative w-32 h-20 shrink-0 rounded-[5px] overflow-hidden bg-ciano-escuro/30">
          <Image
            src={image.imageUrl}
            alt={image.alt}
            fill
            sizes="128px"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="w-full">
          <p className="mb-1">
            Alt: <span className="font-light">{image.alt}</span>
          </p>
          <p className="mb-1">
            Legenda:{" "}
            <span className="font-light">
              {image.caption || "(sem legenda)"}
            </span>
          </p>
          <p className="mb-1">
            Link:{" "}
            {image.linkUrl ? (
              <a
                className="font-light underline break-all ml-1"
                href={image.linkUrl}
                target={image.linkUrl.startsWith("/") ? undefined : "_blank"}
                rel={
                  image.linkUrl.startsWith("/")
                    ? undefined
                    : "noopener noreferrer"
                }
              >
                {image.linkUrl}
              </a>
            ) : (
              <span className="font-light ml-1">(não definido)</span>
            )}
          </p>
          <p className="mb-1 text-sm text-gray-500">
            Ordem: <span className="font-light">{image.order}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
