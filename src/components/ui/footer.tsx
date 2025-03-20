import Image from "next/image";
import Logo from "@/assets/logo.svg";
import "../../app/globals.css"

export default function Footer() {
  return (
    <footer className="bg-[var(--magenta)] text-white h-[206px] flex gap-x-30 justify-center items-center w-full mt-auto">
      <p className="text-[18px] font-medium">© 2025 Qualiclínica Escola</p>
      <Image alt="logo" src={Logo}></Image>
    </footer>
  );
}
