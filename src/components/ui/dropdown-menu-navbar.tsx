"use client";

import Link from "next/link";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function DropdownMenuNavbar() {
  return (
    <Collapsible className="relative group">
      <CollapsibleTrigger className="flex items-center gap-1">
        <span className="ml-2 sm:ml-0">Sobre Nós</span>
        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>

      <CollapsibleContent
        className={`
          flex flex-col gap-2 text-[#959595] 
          mt-2 px-2 py-1 rounded bg-white shadow 
          sm:absolute sm:top-full sm:left-0 sm:mt-1 sm:w-48 sm:z-10
        `}
      >
        <Link href="/profissionais" className="hover:text-gray-700">
          Profissionais
        </Link>
        <Link href="/a-qualiclinica" className="hover:text-gray-700">
          A Quali Clínica
        </Link>
      </CollapsibleContent>
    </Collapsible>
  );
}
