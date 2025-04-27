import Image from "next/image";
import Logo from "@/assets/logo.svg";
import "../../app/globals.css"

export default function Footer() {
  return (
    <footer className="w-full bg-magenta text-white h-[206px] flex gap-x-30 justify-center items-center mt-auto">
      <p className="text-[18px] font-medium">© 2025 Qualiclínica Escola</p>
      <Image alt="logo" src={Logo}></Image>
    </footer>
  );
}
