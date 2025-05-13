"use client";
import { useContext, useEffect, useState } from "react";
import EyeDefault from "@/assets/eye-default.svg";
import EyeSlash from "@/assets/eye-slash.svg";
import Image from "next/image";
import Button from "@/components/ui/button-quali";
import { AuthContext } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const { login, error, currentUser } = authContext;
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/admin/home");
    }
  }, [currentUser, router]);

  return (
    <div className="flex flex-col sm:!flex-row items-center bg-[#194955] p-10 text-white w-[90%] sm:w-[70%]">
      <div className="w-full flex text-center justify-center mr-1">
        <h2 className="!text-base md:!text-2xl lg:!text-5xl text-menta-claro2 font-semibold">
          faça seu login para acessar a área de administradores
        </h2>
      </div>

      <div className="w-[60%] sm:!w-[80%] bg-menta-claro2 p-10 rounded-[5px]">
        {/* Campo de Email */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full border border-ciano-escuro p-3 rounded-[10px] bg-white text-[#959595] focus:outline-[#88C8D4]"
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
            className="w-full border border-ciano-escuro p-3 rounded-[10px] bg-white text-[#959595] focus:outline-[#88C8D4] pr-14"
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
          <Button
            text="ENVIAR"
            onClick={() => {
              login(email, password);
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}
