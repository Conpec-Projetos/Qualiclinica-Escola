import Image from "next/image";
import Logo from "@/assets/logo.svg";
import "../../app/globals.css"

export default function Footer() {
  return (
    <footer className="w-full bg-magenta text-white sm:h-[206px] flex gap-x-5 sm:gap-x-30 justify-center items-center mt-auto">
      <p className="text-[9px] sm:text-[18px] font-medium">© 2025 Qualiclínica Escola</p>
      <div className="w-[120px] sm:w-auto">
        <Image
          alt="logo"
          src={Logo}
          className="w-full h-auto object-contain"
        />
      </div>
    </footer>
  );
}
