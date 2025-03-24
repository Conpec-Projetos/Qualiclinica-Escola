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
  publishedAt: Timestamp;
}

interface PostCardProps {
  post: Post;
  selected: boolean;
  onCheckboxChange: (postId: string, checked: boolean) => void;
}

export default function PostCard({
  post,
  selected,
  onCheckboxChange,
}: PostCardProps) {
  return (
    <div className="flex">
      <div className="flex flex-col gap-4">
        <Checkbox
          checked={selected}
          onChange={(checked) => onCheckboxChange(post.id, checked)}
        />
        <EditButton postId={post.id} />
      </div>
      <div className="flex bg-white p-6 ml-4 rounded-[5px] text-lg">
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
              {post.publishedAt.toDate().toLocaleDateString()}
            </span>
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
