"use client";
import { useContext, useEffect, useState } from "react";
import EyeDefault from "@/assets/eye-default.svg";
import EyeSlash from "@/assets/eye-slash.svg";
import Image from "next/image";
import ButtonQuali from "@/components/ui/button-quali";
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      login(email, password);
    }
  }

  return (
    <div className="flex flex-col sm:!flex-row items-center bg-[#194955] p-10 text-white w-[90%] sm:w-[70%]">
      <div className="w-80 sm:w-96 mr-5 flex text-center justify-center">
        <p className="text-2xl sm:text-3xl md:text-2xl xl:text-4xl text-menta-claro2 font-semibold">
          Faça seu login para acessar a área de administradores
        </p>
      </div>

      <div className="w-[200px] sm:w-[200px] md:w-[331px] lg:w-[500px] bg-menta-claro2 p-10 rounded-[5px]" onKeyDown={handleKeyPress}>
        {/* Campo de Email */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full border text-xs border-ciano-escuro p-3 rounded-[10px] bg-white text-[#959595] focus:outline-[#88C8D4]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Campo de Senha */}
        <div className="mb-4 border-2 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Senha"
            className="w-full text-xs border border-ciano-escuro p-3 rounded-[10px] bg-white text-[#959595] focus:outline-[#88C8D4] pr-9 "
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
              className="w-6 h-6"
            />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Botão de Enviar */}
        <div className="flex justify-center">
          <ButtonQuali
            text="ENTRAR"
            onClick={() => {
              login(email, password);
            }}
          ></ButtonQuali>
        </div>
      </div>
    </div>
  );
}
