"use client";

import { useState } from "react";
import EyeDefault from "@/assets/eye-default.svg";
import EyeSlash from "@/assets/eye-slash.svg";
import Image from "next/image";
import Button from "@/components/ui/button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center bg-[#194955] p-10 text-white w-[70%]">
      <h2 className="w-[60%] text-5xl text-[#F6FDFF] font-semibold mr-1">
        faça seu login para acessar a área de administradores
      </h2>

      <div className="w-[40%] bg-[#F6FDFF] p-10 rounded-[5px]">
        {/* Campo de Email */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full border border-[#88C8D4] p-3 rounded-[10px] bg-white text-[#959595] focus:outline-[#88C8D4]"
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
            className="w-full border border-[#88C8D4] p-3 rounded-[10px] bg-white text-[#959595] focus:outline-[#88C8D4] pr-14"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-[50%] translate-y-[-50%] flex items-center cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              alt="mostrar/esconder senha"
              src={showPassword ? EyeDefault : EyeSlash}
            ></Image>
          </button>
        </div>

        {/* Botão de Enviar */}
        <div className="flex justify-center">
          <Button text="ENVIAR"></Button>
        </div>
      </div>
    </div>
  );
}
