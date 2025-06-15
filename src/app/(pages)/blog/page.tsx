"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import type { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import ButtonQuali from "@/components/ui/button-quali";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: Timestamp;
  base64ImageUrl?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Função para formatar Timestamp em dd/MM/yyyy
  const formatDate = (ts: Timestamp) => {
    const date = ts.toDate();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "posts"),
          orderBy("publishedAt", "desc")
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => {
          const d = doc.data() as Omit<BlogPost, "id">;
          return {
            id: doc.id,
            title: d.title,
            content: d.content,
            imageUrl: d.imageUrl,
            publishedAt: d.publishedAt,
            base64ImageUrl: d.base64ImageUrl,
          };
        });
        setPosts(data);
      } catch (err) {
        console.error("Erro ao carregar posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <Navbar />
        <main className="h-full flex items-center justify-center">
          <p>Carregando posts…</p>
        </main>
        <Footer />
      </div>
    );
  }

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.body.querySelectorAll("br, p, div, h1, h2, h3, h4, h5, h6").forEach((el) => {
      const newline = doc.createTextNode("\n");
      el.parentNode?.insertBefore(newline, el);
    });
    return doc.body.textContent || "";
  }

  return (
    <div className="h-screen">
      <Navbar />
      <main className="bg-white px-4 py-12 h-full">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-verde-petroleo mb-8">
            Blog
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => {
              const textOnly = stripHtml(post.content);

              // criar um trecho de texto com ~100 chars
              const lines = textOnly
                .split("\n")
                .filter((line) => line.trim() !== "");
              let excerpt = "";
              for (const line of lines) {
                if (excerpt.length + line.length <= 100) {
                  excerpt += (excerpt ? "\n" : "") + line;
                } else {
                  const remaining = 100 - excerpt.length;
                  excerpt +=
                    (excerpt ? "\n" : "") + line.slice(0, remaining) + "…";
                  break;
                }
              }

              return (
                <div key={post.id} className="flex flex-col">
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={600}
                      height={300}
                      className="object-cover w-full h-48"
                      placeholder="blur"
                      blurDataURL={post.base64ImageUrl}
                    />
                  </div>

                  <div className="mt-4 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-verde-petroleo mb-2">
                      {post.title}
                    </h3>
                    <p className="text-text flex-1 whitespace-pre-line">{excerpt}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <ButtonQuali
                        text="ler artigo"
                        onClick={() => {
                          router.push(`/blog/${post.id}`);
                        }}
                      />
                      <span className="text-black italic text-sm font-roboto-condensed">
                        Postado em {formatDate(post.publishedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
