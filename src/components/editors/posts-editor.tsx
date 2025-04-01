"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Focus from "@tiptap/extension-focus";
import Typography from "@tiptap/extension-typography";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Underline from "@tiptap/extension-underline";
import { EditorButton } from "@/components/ui/editors-button";
import {
  BoldIcon,
  CornerUpLeft,
  CornerUpRight,
  ImageIcon,
  ItalicIcon,
  Ruler,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import Button from "../ui/button-quali";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebase-config";
import { useContext, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/auth.context";
import { Post } from "../ui/post-card";

interface PostsEditorProps {
  postId?: string;
  title: string;
  content: string;
  image: File | string | null;
}

export default function PostsEditor({
  postId,
  title,
  content,
  image,
}: PostsEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Focus.configure({ className: "has-focus", mode: "all" }),
      Bold,
      Italic,
      Strike,
      Underline,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Image.extend({
        addAttributes() {
          return {
            src: {},
            style: {
              default: "display: block; margin: 0 auto;",
            },
          };
        },
      }),
      Dropcursor.configure({
        color: "black",
        class: "custom-dropcursor",
      }),
      HorizontalRule.extend({
        addAttributes() {
          return {
            style: {
              default: "border: 1px solid purple;",
            },
          };
        },
      }),
      Document,
      Paragraph,
      Placeholder.configure({
        placeholder: "Digite algo...",
      }),
    ],
    content: content,
  });
  const [isSending, setIsSending] = useState(false);
  const [images, setImages] = useState<File[] | null>(null);
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const author = currentUser ? currentUser.name : "Sem autor";

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <p>Carregando editor...</p>;
  }

  const addImageFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImages((prevImages) => [...(prevImages || []), file]);
      const localUrl = URL.createObjectURL(file);
      
      editor.chain().focus().insertContent([
        { type: "image", attrs: { src: localUrl } },
        { type: "paragraph", content: "" },
      ]).run();
    }
  };

  const saveContent = async () => {
    try {
      setIsSending(true);
      let updatedContent = editor.getHTML();

      if (images) {
        for (const imageContent of images) {
          const storageRef = ref(storage, `images/${imageContent.name}`);
          await uploadBytes(storageRef, imageContent);
          const downloadUrl = await getDownloadURL(storageRef);
          updatedContent = updatedContent.replace(new RegExp(`src=".*?${imageContent.name}"`, 'g'), `src="${downloadUrl}"`);
        }
      }

      if (postId) {
        // Atualizar post existente
        const postRef = doc(db, "posts", postId);
        const postData = (await getDoc(postRef)).data() as Post;
        let updatedImageUrl = postData.imageUrl;

        if (image instanceof File) {
          const storageRef = ref(storage, `images/${image?.name}`);
          await uploadBytes(storageRef, image);
          const downloadUrl = await getDownloadURL(storageRef);
          updatedImageUrl = downloadUrl;
        } else if (typeof image === "string") {
          updatedImageUrl = image;
        } else {
          toast.warning("Selecione uma imagem para o post.");
          return;
        }

        await updateDoc(postRef, {
          title,
          content: updatedContent,
          author,
          publishedAt: serverTimestamp(),
          imageUrl: updatedImageUrl,
        });
        toast.success("Post atualizado com sucesso!");
      } else {
        // Criar novo post
        if (!image) {
          toast.warning("Selecione uma imagem para o post.");
          return;
        }

        if (!(image instanceof File)) {
          toast.warning("Imagem inválida.");
          return;
        }

        const storageRef = ref(storage, `images/${image?.name}`);
        await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(storageRef);

        await addDoc(collection(db, "posts"), {
          title,
          content: updatedContent,
          author,
          imageUrl: downloadUrl,
          publishedAt: serverTimestamp(),
        });
        toast.success("Post criado com sucesso!");
      }
      setTimeout(() => {
        setIsSending(false);
        router.back();
      }, 2000);
    } catch (error) {
      console.error("Erro ao salvar o post:", error);
      toast.error("Erro ao salvar o post. Tente novamente.");
      setIsSending(false);
    }
  };

  return (
    <div>
      <div className="p-4 mb-6 border rounded-[5px] bg-white border-(--ciano-escuro) max-w-3xl">
        <div className="text-(--menta-claro1) flex flex-wrap justify-evenly md:justify-center space-x-2 border-b border-(--verde-petroleo) pb-2">
          <EditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon size={16} />
          </EditorButton>
          <EditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon size={16} />
          </EditorButton>
          <EditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikethroughIcon size={16} />
          </EditorButton>
          <EditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().setUnderline().run()}
          >
            <UnderlineIcon size={16} />
          </EditorButton>
          {([1, 2, 3, 4, 5, 6] as const).map((level) => (
            <EditorButton
              key={level}
              className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level }).run()
              }
            >
              H{level}
            </EditorButton>
          ))}
          <label className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => addImageFromFile(event)}
            />
            <ImageIcon size={16} />
          </label>
          <EditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Ruler size={16} />
          </EditorButton>
          <EditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <CornerUpLeft size={16} />
          </EditorButton>
          <EditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <CornerUpRight size={16} />
          </EditorButton>
        </div>
        <EditorContent
          editor={editor}
          className="pt-4 overflow-y-auto bg-[#FCFCFC] text-(--verde-petroleo) focus:outline-none"
          style={{ maxWidth: "100%" }}
          autoFocus={true}
        />
      </div>
      <Button onClick={() => saveContent()} text={`${isSending ? 'postando...' : 'postar'}`} disabled={isSending} />
    </div>
  );
}
