"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function DropdownMenuNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col" ref={dropdownRef}>
      <div className="flex items-center hover:text-gray-700">
        <button onClick={toggleMenu} className="mr-2">
          Sobre Nós
        </button>
        <DropDownIcon isOpen={isOpen} />
      </div>

      {isOpen && (
        <ul className="absolute translate-y-5 -translate-x-7 flex flex-col bg-white p-2">
          <Link href="/profissionais" className="hover:text-gray-700">
            Profissionais
          </Link>
          <Link href="/a-qualiclinica" className="hover:text-gray-700">
            A Qualiclínica
          </Link>
        </ul>
      )}
    </div>
  );
}

function DropDownIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all ${isOpen ? "-rotate-180" : ""}`}
    >
      <path
        d="M6 7.99981L0 1.9998L1.075 0.924805L6 5.84981L10.925 0.924805L12 1.9998L6 7.99981Z"
        fill="#959595"
      />
    </svg>
  );
}
