import Checkbox from "@/components/ui/checkbox";
import EditButton from "@/components/ui/edit-button";
import Image from "next/image";
import ImagePlaceholder from "@/assets/blog-image-placeholder.png";

interface InfoBlogProps {
  title: string;
  author: string;
  date: string;
}

export default function InfoBlog({ title, author, date }: InfoBlogProps) {
  return (
    <div className="flex">
      <div className="flex flex-col gap-4">
        <Checkbox />
        <EditButton />
      </div>
      <div className="flex bg-white p-6 ml-4 rounded-[5px] text-lg">
        <div className="w-[50%]">
          <p className="mb-1">
            Título: <span className="font-light">{title}</span>
          </p>
          <p className="mb-1">
            Autor: <span className="font-light">{author}</span>
          </p>
          <p className="mb-1">
            Data de Publicação: <span className="font-light">{date}</span>
          </p>
        </div>
        <Image
          className="w-[50%]"
          alt="imagem de blog"
          src={ImagePlaceholder}
        />
      </div>
    </div>
  );
}
