"use client";

import LogoPrincipal from "@/assets/logo-principal.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import type { Timestamp } from "firebase/firestore";
import ButtonQuali from "@/components/ui/button-quali";
import { ArrowLeftCircle } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string; // seu HTML
  imageUrl: string;
  base64ImageUrl: string;
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
      <div className="h-screen w-screen bg-rosa-claro font-poppins flex flex-col justify-center items-center">
        <Image
          alt="logo principal"
          src={LogoPrincipal}
          className="inline-block w-[23rem]"
          priority
        />
        <h1 className="text-magenta text-4xl font-bold">Erro 404</h1>
        <h2 className="text-verde-petroleo text-2xl font-bold">
          Artigo não encontrado
        </h2>
        <ButtonQuali
          className="mt-10"
          buttonSize="large"
          fontSize="large"
          onClick={() => router.push("/blog")}
          text="Retornar para o blog"
        ></ButtonQuali>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            className="flex items-center gap-2 mb-6 text-verde-petroleo hover:text-magenta hover:cursor-pointer transition-colors group"
            onClick={() => router.back()}
          >
            <ArrowLeftCircle className="w-6 h-6 md:w-10 md:h-10" />
            <span className="text-sm md:text-xl font-medium overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
              Voltar
            </span>
          </button>

          <article className="space-y-6">
            {/* Imagem de capa */}
            <div className="w-full h-64 md:h-80 relative rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                placeholder="blur"
                blurDataURL={post.base64ImageUrl}
                fill
                priority
                className="object-cover"
              />
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-verde-petroleo leading-tight">
              {post.title}
            </h1>

            <p className="text-gray-800 italic text-sm font-roboto-condensed">
              Postado em {formatDate(post.publishedAt)}
            </p>

            <div
              className="prose prose-lg max-w-none [&_h1]:text-verde-petroleo [&_h2]:text-verde-petroleo [&_h3]:text-verde-petroleo [&_h4]:text-verde-petroleo [&_h5]:text-verde-petroleo [&_h6]:text-verde-petroleo [&_a]:text-magenta [&_a:hover]:text-ciano-mais-escuro"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
