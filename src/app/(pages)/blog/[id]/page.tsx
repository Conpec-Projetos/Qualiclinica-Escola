"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import ArrowLeft from "@/assets/arrow-left.svg";
import type { Timestamp } from "firebase/firestore";

interface BlogPost {
  id: string;
  title: string;
  content: string; // seu HTML
  imageUrl: string;
  publishedAt: Timestamp;
}

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // formata publishedAt em dd/MM/yyyy
  const formatDate = (ts: Timestamp) => {
    const d = ts.toDate();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const postId = (await params).id;
        const ref = doc(db, "posts", postId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as Omit<BlogPost, "id">;
          setPost({ id: snap.id, ...data });
        } else {
          console.warn("Post não encontrado");
        }
      } catch (err) {
        console.error("Erro ao buscar post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <p>Carregando artigo…</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center">
          <p>Artigo não encontrado.</p>
          <button onClick={() => router.back()} className="mt-4 underline">
            Voltar
          </button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-white w-full px-4 py-12 flex justify-center items-start">
        <div className="relative inline-block">
          {/* Botão de voltar */}
          <Image
            className="absolute right-full mr-3 mt-2 cursor-pointer"
            src={ArrowLeft}
            alt="voltar"
            onClick={() => router.back()}
          />
          <div className="w-3xl flex flex-col space-y-6">
            {/* Imagem de capa */}
            <div className="w-full h-64 relative rounded overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Título e data */}
            <h1 className="text-3xl font-bold text-(--verde-petroleo)">
              {post.title}
            </h1>
            <p className="text-black italic text-sm font-[family-name:var(--font-roboto-condensed)]">
              Postado em {formatDate(post.publishedAt)}
            </p>

            {/* Conteúdo HTML */}
            <article
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
