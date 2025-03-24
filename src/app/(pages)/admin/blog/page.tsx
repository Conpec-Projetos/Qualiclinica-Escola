"use client";

import Button from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import PostCard, { Post } from "@/components/ui/post-card";
import NavbarAdmin from "@/components/ui/navbar-admin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

// const mockPosts: Post[] = [
//   {
//     id: "1",
//     title: "Post 1",
//     content: "Conteúdo do post 1",
//     author: "Walkyria",
//     imageUrl: "",
//     publishedAt: "19/03/2025",
//   },
//   {
//     id: "2",
//     title: "Post 2",
//     content: "Conteúdo do post 2",
//     author: "Walkyria",
//     imageUrl: "",
//     publishedAt: "20/03/2025",
//   },
//   {
//     id: "3",
//     title: "Post 3",
//     content: "Conteúdo do post 3",
//     author: "Walkyria",
//     imageUrl: "",
//     publishedAt: "21/03/2025",
//   },
//   {
//     id: "4",
//     title: "Post 4",
//     content: "Conteúdo do post 4",
//     author: "Walkyria",
//     imageUrl: "",
//     publishedAt: "22/03/2025",
//   },
//   {
//     id: "5",
//     title: "Post 5",
//     content: "Conteúdo do post 5",
//     author: "Walkyria",
//     imageUrl: "",
//     publishedAt: "23/03/2025",
//   },
// ];

export default function CursosAdmin() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Cria uma query ordenando os posts pela data de publicação de forma decrescente
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("publishedAt", "desc")
        );
        const querySnapshot = await getDocs(postsQuery);
        const postsData: Post[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
        }));
        setPosts(postsData);

        // setPosts(mockPosts);
      } catch (error) {
        console.error("Erro ao carregar os posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Atualiza o array de posts selecionados conforme o checkbox
  const handleCheckboxChange = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts((prev) => [...prev, postId]);
    } else {
      setSelectedPosts((prev) => prev.filter((id) => id !== postId));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedPosts.length === 0) return;

    if (!confirm("Tem certeza que deseja remover os posts selecionados?")) {
      return;
    }

    try {
      for (const postId of selectedPosts) {
        await deleteDoc(doc(db, "posts", postId));
      }

      // Atualiza a lista de posts removendo os que foram deletados
      setPosts((prevPosts) =>
        prevPosts.filter((post) => !selectedPosts.includes(post.id))
      );
      setSelectedPosts([]);
    } catch (error) {
      console.error("Erro ao remover posts: ", error);
    }
  };

  return (
    <div className="flex flex-col w-screen min-h-screen bg-white font-[family-name:var(--font-poppins)]">
      <NavbarAdmin username="Walkyria" />
      <main className="p-10 w-full flex items-center justify-center text-black">
        <div className="max-w-5xl mx-auto">
          {/* Título */}
          <h1 className="text-3xl font-bold text-center mb-4 text-(--verde-petroleo)">
            blog
          </h1>

          {/* Botões de ação */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link href="/admin/blog/write">
              <Button
                text="adicionar post"
                onClick={() => router.push("/admin/blog/write")}
              />
            </Link>
            <Button text="remover posts" onClick={handleDeleteSelected} />
          </div>

          {/* Posts */}
          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-(--rosa) font-[family-name:var(--font-roboto)] p-6 rounded-[5px]">
              {loading ? (
                <p>Carregando posts...</p>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    selected={selectedPosts.includes(post.id)}
                    onCheckboxChange={handleCheckboxChange}
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
