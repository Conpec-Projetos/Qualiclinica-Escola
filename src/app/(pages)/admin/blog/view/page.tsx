"use client";

import ButtonQuali from "@/components/ui/button-quali";
import Footer from "@/components/ui/footer";
import PostCard, { Post } from "@/components/ui/post-card";
import NavbarAdmin from "@/components/ui/navbar-admin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db, storage } from "@/firebase/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "sonner";

export default function PostsAdmin() {
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

  const handleDeletePosts = async (selectedPosts: string[]) => {
    try {
      for (const postId of selectedPosts) {
        const postRef = doc(db, "posts", postId);
        const postSnapshot = await getDoc(postRef);
        const postImageUrl = postSnapshot.data()?.imageUrl;

        // Verifica se a imagem existe e, se sim, remove do Storage
        if (postImageUrl) {
          const imageRef = ref(storage, postImageUrl);
          await deleteObject(imageRef);
        }
        await deleteDoc(postRef);
      }

      // Atualiza a lista de posts removendo os que foram deletados
      setPosts((prevPosts) =>
        prevPosts.filter((post) => !selectedPosts.includes(post.id))
      );
      setSelectedPosts([]);
    } catch (error) {
      console.error("Erro ao remover posts: ", error);
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedPosts.length === 0) return;

    toast.warning("Tem certeza que deseja remover os posts selecionados?", {
      action: {
        label: "Remover",
        onClick: async () => {
          await handleDeletePosts(selectedPosts);
          toast.success("Posts removidos com sucesso!");
        },
      },
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white font-poppins">
      <NavbarAdmin />
      <main className="w-full flex items-center justify-center text-black">
        <div className="max-w-5xl mx-auto">
          {/* Título */}
          <h1 className="text-3xl font-bold text-center mb-4 text-verde-petroleo">
            Blog
          </h1>

          {/* Botões de ação */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link href="/admin/blog/write">
              <ButtonQuali
                text="adicionar post"
                onClick={() => router.push("/admin/blog/write")}
              />
            </Link>
            <ButtonQuali text="remover posts" onClick={handleDeleteSelected} />
          </div>

          {/* Posts */}
          <section className="mb-8">
            <div className="flex flex-col gap-8 bg-rosa font-roboto p-6 rounded-[5px]">
              {loading ? (
                <p>Carregando posts...</p>
              ) : posts.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Nenhum post encontrado.
                </p>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    imageUrl={post.imageUrl}
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
