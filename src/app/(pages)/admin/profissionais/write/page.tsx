"use client";
import NavbarAdmin from "@/components/ui/navbar-admin";
import Footer from "@/components/ui/footer";
import ArrowLeft from "@/assets/arrow-left.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import Button from "@/components/ui/button-quali";
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

const professionalSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  occupation: z.string().min(1, "A ocupação é obrigatória"),
  career: z.string().min(1, "A carreira é obrigatória"),
  identification: z.string().min(1, "A identificação é obrigatória"),
  area: z
    .string()
    .min(1, "A área é obrigatória")
    .refine(
      (val) =>
        [
          "diabetology",
          "nursing",
          "nutrition",
          "endocrinology",
          "psychology/psychiatry",
          "others",
        ].includes(val),
      {
        message: "A área selecionada é inválida",
      }
    ),
});

type ProfessionalFormData = z.infer<typeof professionalSchema>;

export default function CourseEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col w-screen h-screen justify-center items-center">
          <p className="text-2xl text-[var(--magenta)]">Carregando...</p>
        </div>
      }
    >
      <ProfessionalsEditor />
    </Suspense>
  );
}

const ProfessionalsEditor = () => {
  const searchParams = useSearchParams();
  const professionalId = searchParams.get("professionalId");
  const [isSending, setIsSending] = useState(false);

  const router = useRouter();

  const form = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
    defaultValues: {
      name: "",
      occupation: "",
      career: "",
      identification: "",
      area: "",
    },
    mode: "onChange",
  });

  const { reset, handleSubmit } = form;

  useEffect(() => {
    const fetchProfessional = async () => {
      if (!professionalId) return;
      try {
        const docRef = doc(db, "professionals", professionalId);
        const courseSnap = await getDoc(docRef);

        if (courseSnap.exists()) {
          const data = courseSnap.data();
          reset({
            name: data.name,
            occupation: data.occupation,
            career: data.career,
            identification: data.identification,
            area: data.area,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar o curso:", error);
      }
    };

    fetchProfessional();
  }, [professionalId, reset]);

  const onSubmit = async (data: ProfessionalFormData) => {
    setIsSending(true);
    try {
      if (!professionalId) {
        addDoc(collection(db, "professionals"), data);
        toast.success("Profissional adicionado com sucesso!");
      } else {
        const docRef = doc(db, "professionals", professionalId);
        await updateDoc(docRef, data);
        toast.success("Profissional atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar o profissional:", error);
      toast.error("Erro ao atualizar o profissional.");
    } finally {
      setIsSending(false);
      router.push("/admin/profissionais/view");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white font-[family-name:var(--font-poppins)]">
      <NavbarAdmin />
      <Image
        className="cursor-pointer mt-2 ml-3"
        onClick={() => router.push("/admin/profissionais/view")}
        alt="voltar"
        src={ArrowLeft}
      />
      <main className="w-full flex flex-col items-center justify-center text-black">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-6 bg-[var(--ciano)] p-6 rounded-b-[5px] max-w-[648px] mx-auto w-full"
          >
            <h1 className="text-[var(--verde-petroleo)] font-bold text-center mb-5">
              editor de profissionais
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
                        placeholder="Nome do profissional"
                        className="w-full p-2 border border-[var(--ciano-escuro)] text-[var(--verde-petroleo)] text-[18px] focus:outline-none bg-white rounded-[10px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identificação*</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Identificação do profissional"
                        className="w-full p-2 border border-[var(--ciano-escuro)] text-[var(--verde-petroleo)] text-[18px] focus:outline-none bg-white rounded-[10px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ocupação*</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Ocupação do profissional"
                        className="w-full p-2 border border-[var(--ciano-escuro)] text-[var(--verde-petroleo)] text-[18px] focus:outline-none bg-white rounded-[10px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="career"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carreira*</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Carreira do profissional"
                        className="w-full h-[200px] p-2 border border-[var(--ciano-escuro)] text-[var(--verde-petroleo)] text-[18px] focus:outline-none bg-white rounded-[10px]"
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
                        <SelectTrigger className="w-full border border-[var(--ciano-escuro)] text-[var(--verde-petroleo)] text-[18px] focus:outline-none bg-white rounded-[10px]">
                          <SelectValue placeholder="Área de Atuação" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-[var(--verde-petroleo)] font-semibold">
                        <SelectItem
                          value="diabetology"
                          className="hover:bg-(--ciano)"
                        >
                          Diabetologia
                        </SelectItem>
                        <SelectItem
                          value="nursing"
                          className="hover:bg-(--ciano)"
                        >
                          Enfermagem
                        </SelectItem>
                        <SelectItem
                          value="nutrition"
                          className="hover:bg-(--ciano)"
                        >
                          Nutrição
                        </SelectItem>
                        <SelectItem
                          value="endocrinology"
                          className="hover:bg-(--ciano)"
                        >
                          Endocrinologia
                        </SelectItem>
                        <SelectItem
                          value="psychology/psychiatry"
                          className="hover:bg-(--ciano)"
                        >
                          Psicologia/Psiquiatria
                        </SelectItem>
                        <SelectItem
                          value="others"
                          className="hover:bg-(--ciano)"
                        >
                          Outras áreas
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-center mt-4">
              <Button
                buttonSize="large"
                fontSize="large"
                text={isSending ? "ADICIONANDO..." : "ADICIONAR PROFISSIONAL"}
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
