"use client";
import NavbarAdmin from "@/components/ui/navbar-admin";
import Footer from "@/components/ui/footer";
import ArrowLeft from "@/assets/arrow-left.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import ButtonQuali from "@/components/ui/button-quali";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const courseSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  instructors: z.string().min(1, "Os instrutores são obrigatórios"),
  description: z.string().optional(),
  area: z
    .string()
    .min(1, "A área é obrigatória")
    .refine(
      (val) =>
        ["doctors", "patients-caregivers", "others", "mentorships"].includes(
          val
        ),
      {
        message: "A área selecionada é inválida",
      }
    ),
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function CourseEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col w-screen h-screen justify-center items-center">
          <p className="text-2xl text-magenta">Carregando...</p>
        </div>
      }
    >
      <Editor />
    </Suspense>
  );
}

const Editor = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [isSending, setIsSending] = useState(false);

  const router = useRouter();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      instructors: "",
      description: "",
      area: "",
    },
    mode: "onChange",
  });

  const { reset, handleSubmit } = form;

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      try {
        const docRef = doc(db, "courses", courseId);
        const courseSnap = await getDoc(docRef);

        if (courseSnap.exists()) {
          const data = courseSnap.data();
          reset({
            name: data.name,
            instructors: data.instructors,
            area: data.area,
            description: data.description,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar o curso:", error);
      }
    };

    fetchCourse();
  }, [courseId, reset]);

  const onSubmit = async (data: CourseFormData) => {
    setIsSending(true);
    try {
      if (!courseId) {
        addDoc(collection(db, "courses"), data);
        toast.success("Curso adicionado com sucesso!");
      } else {
        const docRef = doc(db, "courses", courseId);
        await updateDoc(docRef, data);
        toast.success("Curso atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar o curso:", error);
      toast.error("Erro ao atualizar o curso.");
    } finally {
      setIsSending(false);
      router.push("/admin/cursos/view");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white font-poppins">
      <NavbarAdmin />
      <Image
        className="cursor-pointer mt-2 ml-3"
        onClick={() => router.push("/admin/cursos/view")}
        alt="voltar"
        src={ArrowLeft}
      />
      <main className="w-full flex flex-col items-center justify-center text-black">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-6 bg-ciano p-6 rounded-b-[5px] max-w-[648px] mx-auto w-full"
          >
            <h1 className="text-verde-petroleo font-bold text-center mb-5">
              Editor de cursos
            </h1>

            <div className="w-full h-full flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome*</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Nome do curso"
                        className="w-full p-2 border border-ciano-escuro text-verde-petroleo text-[18px] focus:outline-none bg-white rounded-[10px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instructors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instrutores*</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Instrutores do curso"
                        className="w-full p-2 border border-ciano-escuro text-verde-petroleo text-[18px] focus:outline-none bg-white rounded-[10px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Descrição do curso"
                        className="w-full h-[200px] p-2 border border-ciano-escuro text-verde-petroleo text-[18px] focus:outline-none bg-white rounded-[10px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full border border-ciano-escuro text-verde-petroleo text-[18px] focus:outline-none bg-white rounded-[10px]">
                          <SelectValue placeholder="Área do curso" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-verde-petroleo font-semibold">
                        <SelectItem value="doctors" className="hover:bg-ciano">
                          Médicos
                        </SelectItem>
                        <SelectItem
                          value="patients-caregivers"
                          className="hover:bg-ciano"
                        >
                          Pacientes e Cuidadores
                        </SelectItem>
                        <SelectItem value="others" className="hover:bg-ciano">
                          Demais Profissionais
                        </SelectItem>
                        <SelectItem
                          value="mentorships"
                          className="hover:bg-ciano"
                        >
                          Mentorias
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex justify-center mt-4">
              <ButtonQuali
                buttonSize="large"
                fontSize="large"
                text={isSending ? "ADICIONANDO..." : "ADICIONAR CURSO"}
                disabled={isSending}
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};
