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
import { RichTextEditorButton } from "@/components/ui/rich-text-editor-button";
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
import Button from "./ui/button-quali";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { useEffect } from "react";

interface RichTextEditorProps {
  postId?: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
}

export default function RichTextEditor({
  postId,
  title,
  content,
  author,
  imageUrl,
}: RichTextEditorProps) {
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

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <p>Carregando editor...</p>;
  }

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const saveContent = async () => {
    try {
      if (postId) {
        // Atualizar post existente
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
          title,
          content: editor.getHTML(),
          author,
          imageUrl,
          publishedAt: serverTimestamp(),
        });
        alert("Post atualizado com sucesso!");
      } else {
        // Criar novo post
        await addDoc(collection(db, "posts"), {
          title,
          content: editor.getHTML(),
          author,
          imageUrl,
          publishedAt: serverTimestamp(),
        });
        alert("Post criado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar o post:", error);
      alert("Erro ao salvar o post. Tente novamente.");
    }
  };

  return (
    <div>
      <div className="p-4 mb-6 border rounded-[5px] bg-white border-(--ciano-escuro) max-w-3xl">
        <div className="text-(--menta-claro1) flex flex-wrap justify-evenly md:justify-center space-x-2 border-b border-(--verde-petroleo) pb-2">
          <RichTextEditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon size={16} />
          </RichTextEditorButton>
          <RichTextEditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon size={16} />
          </RichTextEditorButton>
          <RichTextEditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikethroughIcon size={16} />
          </RichTextEditorButton>
          <RichTextEditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().setUnderline().run()}
          >
            <UnderlineIcon size={16} />
          </RichTextEditorButton>
          {([1, 2, 3, 4, 5, 6] as const).map((level) => (
            <RichTextEditorButton
              key={level}
              className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level }).run()
              }
            >
              H{level}
            </RichTextEditorButton>
          ))}
          <RichTextEditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={addImage}
          >
            <ImageIcon size={16} />
          </RichTextEditorButton>
          <RichTextEditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Ruler size={16} />
          </RichTextEditorButton>
          <RichTextEditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <CornerUpLeft size={16} />
          </RichTextEditorButton>
          <RichTextEditorButton
            className="bg-(--ciano-escuro) rounded-[5px] w-10 h-10 cursor-pointer"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <CornerUpRight size={16} />
          </RichTextEditorButton>
        </div>
        <EditorContent
          editor={editor}
          className="pt-4 overflow-y-auto bg-[#FCFCFC] text-(--verde-petroleo) focus:outline-none"
          style={{ maxWidth: "100%" }}
          autoFocus={true}
        />
      </div>
      <Button onClick={() => saveContent()} text="postar" />
    </div>
  );
}
