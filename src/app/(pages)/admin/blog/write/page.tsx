"use client";
import ArrowLeft from "@/assets/arrow-left.svg";
import Image from "next/image";
import NavbarAdmin from "@/components/ui/navbar-admin";
import Footer from "@/components/ui/footer";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { UploadIcon } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import PostsEditor from "@/components/editors/posts-editor";
import { AuthContext } from "@/contexts/auth.context";

export default function EditorPage() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push("/");
  }, [currentUser, router]);
  
  return (
    <Suspense
      fallback={
        <div className="flex flex-col justify-center">
          <p className="text-2xl text-[var(--magenta)]">Carregando...</p>
        </div>
      }
    >
      <Editor />
    </Suspense>
  );
}

const Editor = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const [image, setImage] = useState<File | null>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const docRef = doc(db, "posts", postId);
        const postSnap = await getDoc(docRef);

        if (postSnap.exists()) {
          const data = postSnap.data();
          setTitle(data.title);
          setContent(data.content);
          setImageUrl(data.imageUrl);
        }
      } catch (error) {
        console.error("Erro ao carregar o post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div className="flex flex-col w-screen min-h-screen bg-white font-[family-name:var(--font-poppins)]">
      <NavbarAdmin />
      <main className="w-full flex flex-col items-center justify-center text-black">
        <div className="mb-6">
          <Image
            className="cursor-pointer mb-2"
            onClick={() => router.back()}
            alt="voltar"
            src={ArrowLeft}
          />
          <div
            className={`relative flex flex-col w-full h-[380px] max-h-[380px] max-w-full bg-(--ciano-escuro) rounded-t-[5px] overflow-hidden items-center justify-center text-5xl text-(--menta-claro1)`}
          >
            {imageUrl != "" ? (
              <Image
                alt="imagem de banner"
                src={imageUrl}
                objectFit="cover"
                layout="fill"
                className="select-none"
              />
            ) : (
              <p>imagem de banner</p>
            )}
            <button
              onClick={handleButtonClick}
              className="w-14 h-14 flex items-center justify-center text-xs cursor-pointer absolute bottom-4 right-4 bg-white hover:bg-(--menta) transition-colors rounded-full"
            >
              <UploadIcon className="text-(--ciano-escuro) w-8 h-8" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </button>
          </div>
          <div className="bg-(--ciano) p-6 rounded-b-[5px]">
            <input
              type="text"
              placeholder="Título do post"
              className="w-full p-2 mb-5 border border-(--ciano-escuro) text-(--verde-petroleo) text-[18px] focus:outline-none bg-white rounded-[10px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <PostsEditor
              content={content}
              title={title}
              image={image}
              postId={postId ? postId : undefined}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
