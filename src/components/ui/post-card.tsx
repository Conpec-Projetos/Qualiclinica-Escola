import Checkbox from "@/components/ui/checkbox";
import EditButton from "@/components/ui/edit-button";
import Image from "next/image";
import ImagePlaceholder from "@/assets/blog-image-placeholder.png";
import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  author: string;
  content: string;
  imageUrl: string;
  base64ImageUrl?: string;
  publishedAt: Timestamp;
}

interface PostCardProps {
  post: Post;
  selected: boolean;
  imageUrl: string;
  onCheckboxChange: (postId: string, checked: boolean) => void;
}

export default function PostCard({
  post,
  selected,
  onCheckboxChange,
  imageUrl,
}: PostCardProps) {
  return (
    <div className="flex">
      <div className="flex flex-col gap-4">
        <Checkbox
          checked={selected}
          onChange={(checked) => onCheckboxChange(post.id, checked)}
        />
        <EditButton type="post" path="blog" id={post.id} />
      </div>
      <div className="flex grow bg-white p-6 ml-4 justify-between rounded-[5px] text-lg">
        <div className="w-[50%]">
          <p className="mb-1">
            Título: <span className="font-light">{post.title}</span>
          </p>
          <p className="mb-1">
            Autor: <span className="font-light">{post.author}</span>
          </p>
          <p className="mb-1">
            Data de Publicação:{" "}
            <span className="font-light">
              {post.publishedAt.toDate().toLocaleDateString("pt-BR")}
            </span>
          </p>
        </div>
        <div className="max-w-[360px] w-[300px] h-[150px] max-h-[150px] relative overflow-hidden rounded-[5px]">
          <Image
            className="w-[50%] select-none"
            alt="imagem de blog"
            src={imageUrl ? imageUrl : ImagePlaceholder}
            fill
            sizes="100%"
          />
        </div>
      </div>
    </div>
  );
}
