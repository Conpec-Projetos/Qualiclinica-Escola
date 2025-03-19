import Image from "next/image";
import Logo from "@/assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#941b63] text-white h-[206px] flex gap-x-28 justify-center items-center w-full mt-auto">
      <p className="text-sm">© 2025 Qualiclínica Escola</p>
      <Image alt="logo" src={Logo}></Image>
    </footer>
  );
}
