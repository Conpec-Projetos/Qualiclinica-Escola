"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import ChevronDown from "@/assets/chevron-down.svg";
import Image from "next/image";
import Button from "@/components/ui/button-quali";

const courses = [
  "Terapia de Bomba de Infusão de Insulina",
  "Seguimento seguro do paciente com Diabetes Tipo 2",
  "Terapia de Contagem de Carboidratos",
  "Terapia de bomba de infusão contínua de insulina",
  "Manejo e cuidado com o paciente portador de Diabetes do Tipo 1 ",
  "Cuidados de Enfermagem em Pé Diabético",
  "Curso para Cuidadores de pessoas com diabetes",
  "Curso de terapia de contagem de carboidratos para nutricionistas",
  "Oficina de contagem de carboidratos para pacientes e famílias",
  "Roda de conversa para pais de pessoas com Diabetes Tipo 1",
  "Saúde mental e diabetes: desafios da cronicidade para pacientes/familiares",
  "Instalação e manejo do sensor subcutâneo de glicose",
];

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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+55");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [course, setCourse] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validatePhone(phone: string): boolean {
    const re = /^\+\d{2}\s\(\d{2}\)\s9\d{4}-\d{4}$/;
    return re.test(phone);
  }

  function validateEmail(email: string): boolean {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  }

  const validate = () => {
    if (!name.trim()) {
      alert("Nome é obrigatório");
      return false;
    }
    if (!phone.trim()) {
      alert("Telefone é obrigatório");
      return false;
    } else if (!validatePhone(phone)) {
      alert("Telefone inválido. Use +55 (XX) 9XXXX-XXXX");
      return false;
    }
    if (!email.trim()) {
      alert("Email é obrigatório");
      return false;
    } else if (!validateEmail(email)) {
      alert("Formato de email inválido");
      return false;
    }
    if (!message.trim()) {
      alert("Mensagem é obrigatória");
      return false;
    }
    if (!course.trim()) {
      alert("É preciso escolher um curso");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      console.log({ name, phone, email, message, course });
      // reset
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setCourse("");
    } catch (err) {
      console.error("Erro ao enviar contato:", err);
      alert("Falha no envio. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-(--menta-claro2) p-8 rounded-[0.3125rem] mx-auto h-full"
    >
      {/* Nome */}
      <div>
        <label className="block text-(--verde-petroleo) font-light mb-1">
          Nome *
        </label>
        <input
          type="text"
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 mb-2 border border-(--ciano-escuro) rounded-lg bg-white text-(--verde-petroleo) focus:outline-none focus:ring-2 focus:ring-(--ciano-escuro)"
        />
      </div>

      {/* Telefone */}
      <div>
        <label className="block text-(--verde-petroleo) font-light mb-1">
          Telefone *
        </label>
        <input
          type="tel"
          placeholder="Número de telefone"
          value={phone}
          onChange={handlePhoneChange}
          required
          className="w-full p-3 mb-2 border border-(--ciano-escuro) rounded-lg bg-white placeholder-[#C3C3C3] text-(--verde-petroleo) focus:outline-none focus:ring-2 focus:ring-(--ciano-escuro)"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-(--verde-petroleo) font-light mb-1">
          Email *
        </label>
        <input
          type="email"
          placeholder="usuario@provedor.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-2 border border-(--ciano-escuro) rounded-lg bg-white placeholder-[#C3C3C3] text-(--verde-petroleo) focus:outline-none focus:ring-2 focus:ring-(--ciano-escuro)"
        />
      </div>

      {/* Mensagem */}
      <div>
        <label className="block text-(--verde-petroleo) font-light mb-1">
          No que podemos te ajudar? *
        </label>
        <textarea
          placeholder="“Gostaria de ser aluno do curso para cuidadores de pessoas com diabetes do tipo 1…”"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-3 mb-2 h-32 border border-(--ciano-escuro) rounded-lg bg-white placeholder-[#C3C3C3] text-(--verde-petroleo) focus:outline-none focus:ring-2 focus:ring-(--ciano-escuro) resize-none"
        />
      </div>

      {/* Select de Curso */}
      <div className="relative">
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
          className="w-full mb-4 appearance-none p-4 pr-15 border border-(--ciano-escuro) rounded-lg bg-white placeholder-[#C3C3C3] text-(--verde-petroleo) focus:outline-none focus:ring-2 focus:ring-(--ciano-escuro)"
        >
          <option value="" disabled>
            Qual o curso de interesse?
          </option>
          {courses.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
        <Image
          src={ChevronDown}
          alt="seta para baixo"
          className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-2/3 text-gray-400"
        />
      </div>

      {/* Botão Enviar */}
      <div className="w-full flex justify-center">
        <Button
          text={submitting ? "enviando..." : "enviar"}
          disabled={submitting}
        />
      </div>
    </form>
  );
}
