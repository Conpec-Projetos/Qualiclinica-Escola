"use client";

import { useState } from "react";
import EyeDefault from "@/assets/eye-default.svg";
import EyeSlash from "@/assets/eye-slash.svg";
import Image from "next/image";
import Button from "@/components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null);
    try {
      // Tenta fazer login com email e senha
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      router.push("/admin");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/user-not-found") {
          setError("Usuário não encontrado");
        } else if (
          err.code === "auth/invalid-password" ||
          err.code === "auth/invalid-email"
        ) {
          setError("Email ou senha inválidos");
        } else {
          console.error(err.message);
        }
      } else {
        setError("Ocorreu um erro inesperado");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#194955] p-10 text-white w-[70%]">
      <h2 className="w-[60%] text-5xl text-(--menta-claro2) font-semibold mr-1">
        faça seu login para acessar a área de administradores
      </h2>

      <div className="w-[40%] bg-(--menta-claro2) p-10 rounded-[5px]">
        {/* Campo de Email */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full border border-(--ciano-escuro) p-3 rounded-[10px] bg-white text-[#959595] focus:outline-[#88C8D4]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Campo de Senha */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Senha"
            className="w-full border border-(--ciano-escuro) p-3 rounded-[10px] bg-white text-[#959595] focus:outline-[#88C8D4] pr-14"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-[50%] translate-y-[-50%] flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              alt="mostrar/esconder senha"
              title={showPassword ? "Esconder senha" : "Mostrar senha"}
              src={showPassword ? EyeDefault : EyeSlash}
            ></Image>
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Botão de Enviar */}
        <div className="flex justify-center">
          <Button text="ENVIAR" onClick={handleLogin}></Button>
        </div>
      </div>
    </div>
  );
}
