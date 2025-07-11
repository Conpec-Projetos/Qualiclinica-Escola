"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import ChevronDown from "@/assets/chevron-down.svg";
import Image from "next/image";
import ButtonQuali from "@/components/ui/button-quali";
import { z } from "zod";
import { db } from "@/firebase/firebase-config";
import { getDocs, collection } from "firebase/firestore";

import { sendEmail } from "@/server/send-email";
import { toast } from "sonner";

const interestSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z
    .string()
    .regex(
      /^\+\d{2}\s\(\d{2}\)\s9\d{4}-\d{4}$/,
      "Telefone inválido. Use +55 (XX) 9XXXX-XXXX"
    ),
  email: z.string().email("Email inválido"),
  message: z.string().min(1, "Mensagem é obrigatória"),
  course: z.string().min(1, "É preciso escolher um curso"),
});

type InterestFormData = z.infer<typeof interestSchema>;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 13);
  let result = "";
  if (digits.length > 0) result = "+" + digits.slice(0, 2);
  if (digits.length >= 3) result += " (" + digits.slice(2, 4);
  if (digits.length >= 5) result += ") " + digits.slice(4, 9);
  if (digits.length >= 10) result += "-" + digits.slice(9, 13);
  return result;
}

export default function InterestForm() {
  const [form, setForm] = useState<InterestFormData>({
    name: "",
    phone: "+55",
    email: "",
    message: "",
    course: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof InterestFormData, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [courses, setCourses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "courses"));
        const data = snapshot.docs.map((doc) => doc.data());
        setCourses(data.map((course) => course.name));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleChange =
    (field: keyof InterestFormData) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      let value = e.target.value;
      if (field === "phone") {
        value = formatPhone(value);
      }
      setForm((f) => ({ ...f, [field]: value }));
      setErrors((errors) => ({ ...errors, [field]: undefined }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = interestSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      const flattened = result.error.flatten().fieldErrors;
      for (const key of Object.keys(flattened) as (keyof InterestFormData)[]) {
        const issues = flattened[key];
        if (issues && issues.length > 0) {
          fieldErrors[key] = issues[0];
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      await sendEmail(form);
      toast.success("Email enviado com sucesso!");
      setForm({ name: "", phone: "+55", email: "", message: "", course: "" });
    } catch (err) {
      console.error("Erro no submit:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="bg-menta-claro2 px-4 md:px-8 pb-6 md:pb-8 pt-2 rounded-[5px] mx-auto h-full w-full max-w-md md:max-w-none space-y-3 md:space-y-4 shadow-[4px_4px_5px_0px_#f1f1f1]"
      >
        {/* Nome */}
        <div>
          <label className="block text-verde-petroleo font-light text-sm md:text-base">Nome<span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Seu nome completo"
            value={form.name}
            onChange={handleChange("name")}
            className={
              `w-full p-2 md:p-3 border rounded-lg bg-white text-verde-petroleo focus:outline-none focus:ring-2 text-sm md:text-base ` +
              (errors.name
                ? `border-red-500 focus:ring-red-300`
                : `border-ciano-escuro focus:ring-ciano-escuro`)
            }
          />
          {errors.name && <p className="text-red-500 text-xs md:text-sm">{errors.name}</p>}
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-verde-petroleo font-light text-sm md:text-base">
            Telefone<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="+55 (XX) 9XXXX-XXXX"
            value={form.phone}
            onChange={handleChange("phone")}
            className={
              `w-full p-2 md:p-3 border rounded-lg bg-white placeholder-[#C3C3C3] text-verde-petroleo focus:outline-none focus:ring-2 text-sm md:text-base ` +
              (errors.phone
                ? `border-red-500 focus:ring-red-300`
                : `border-ciano-escuro focus:ring-ciano-escuro`)
            }
          />
          {errors.phone && (
            <p className="text-red-500 text-xs md:text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-verde-petroleo font-light text-sm md:text-base">Email<span className="text-red-500">*</span></label>
          <input
            type="email"
            placeholder="usuario@provedor.com"
            value={form.email}
            onChange={handleChange("email")}
            className={
              `w-full p-2 md:p-3 border rounded-lg bg-white placeholder-[#C3C3C3] text-verde-petroleo focus:outline-none focus:ring-2 text-sm md:text-base ` +
              (errors.email
                ? `border-red-500 focus:ring-red-300`
                : `border-ciano-escuro focus:ring-ciano-escuro`)
            }
          />
          {errors.email && (
            <p className="text-red-500 text-xs md:text-sm">{errors.email}</p>
          )}
        </div>

        {/* Mensagem */}
        <div>
          <label className="block text-verde-petroleo font-light text-sm">
            No que podemos te ajudar?<span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Gostaria de ser aluno do curso para cuidadores de pessoas com diabetes do tipo 1..."
            value={form.message}
            onChange={handleChange("message")}
            className={
              `w-full p-2 md:p-3 h-24 md:h-32 border rounded-lg bg-white placeholder-[#C3C3C3] text-verde-petroleo focus:outline-none focus:ring-2 resize-none text-sm md:text-base ` +
              (errors.message
                ? `border-red-500 focus:ring-red-300`
                : `border-ciano-escuro focus:ring-ciano-escuro`)
            }
          />
          {errors.message && (
            <p className="text-red-500 text-xs md:text-sm">{errors.message}</p>
          )}
        </div>

        {/* Select de Curso */}
        <div className="relative">
          <label className="block text-verde-petroleo font-light text-sm md:text-base">
            Qual o curso de interesse?<span className="text-red-500">*</span>
          </label>
          <select
            disabled={isLoading}
            value={form.course}
            onChange={handleChange("course")}
            className={
              `w-full appearance-none p-2 md:p-3 pr-10 border rounded-lg bg-white text-verde-petroleo focus:outline-none focus:ring-2 text-sm md:text-base ` +
              (errors.course
                ? `border-red-500 focus:ring-red-300`
                : `border-ciano-escuro focus:ring-ciano-escuro`)
            }
          >
            <option value="" disabled>
              {isLoading ? "Carregando..." : "Selecione…"}
            </option>
            {courses.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Image
            src={ChevronDown}
            alt="Seta para baixo"
            className={`pointer-events-none absolute right-4 top-1/2 transform w-4 h-4 md:w-5 md:h-5 ${
              errors.course ? "-translate-y-2/5" : "-translate-y-1/6"
            }`}
            unoptimized
          />
          {errors.course && (
            <p className="text-red-500 text-xs md:text-sm">{errors.course}</p>
          )}
        </div>

        {/* Botão Enviar */}
        <div className="w-full flex justify-center pt-2 md:pt-4">
          <ButtonQuali
            text={submitting ? "enviando..." : "enviar"}
            disabled={submitting}
          />
        </div>
      </form>
  );
}
