"use client"

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function ProfissionalModel({
    nome,
    profissao,
    identificacao,
    carreira,
  }: {
    nome: string;
    profissao: string;
    identificacao: string;
    carreira: string;
  }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <section className="flex flex-col bg-menta-claro1 rounded-[5px] p-4 md:p-[1.375rem] gap-y-[0.5rem] w-full max-w-[25.5rem] mx-auto">
        <h4 className="font-semibold text-verde-petroleo text-base md:text-lg">{nome}</h4>
        <div className="flex justify-between flex-wrap gap-2">
          <h5 className="inline-block font-semibold text-verde-petroleo text-sm md:text-base">
            {profissao}
          </h5>
          <p className="inline-block font-light text-text text-sm md:text-[1rem]">
            {identificacao}
          </p>
        </div>
        
        {/* Mobile */}
        <div className="block sm:hidden">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center justify-center w-full text-verde-petroleo ">
              <span className="font-semibold text-sm md:text-[0.9375rem]">Carreira</span>
              <ChevronDown
                className={`transition-transform duration-200 w-6 h-6 ${
                  isOpen ? "rotate-180" : ""
                  }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="w-full max-h-48 overflow-y-auto hover:bg-white mt-2 p-2">
                <p className="text-text text-sm font-light whitespace-pre-wrap">
                  {carreira}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Desktop */}
        <div className="hidden sm:block">
          <div className="w-full max-h-48 lg:h-[11.375rem] overflow-y-auto hover:bg-white">
            <p className="text-text text-sm md:text-[0.9375rem] font-light whitespace-pre-wrap">
              <b className="font-normal">Carreira: </b>
              {carreira}
            </p>
          </div>
        </div>
      </section>
    );
  }