"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import ButtonQuali from "../ui/button-quali";

export default function CourseModel({
  name,
  instructors,
  description,
}: {
  name: string;
  instructors: string;
  description: string;
  }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div
      className="flex flex-col lg:flex-row bg-rosa-claro rounded-[5px] p-4 md:p-[1.375rem] gap-4 w-full min-h-[200px] lg:h-[300px]"
    >
      <div className="lg:w-[50%]">
        <div className="flex flex-col h-full items-start justify-between gap-4">
          <div className="flex flex-col gap-y-[0.5rem]">
            <h4 className="font-semibold text-magenta text-base md:text-lg">{name}</h4>
            <p className="text-text text-sm md:text-[0.9375rem] font-normal">
              <b>Instrutores: </b> {instructors}
            </p>
          </div>
          
          {/* Mobile */}
          <div className="block lg:hidden w-full">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger className="flex items-center justify-center text-magenta w-full">
                <span className="font-semibold text-sm md:text-[0.9375rem]">Descrição</span>
                <ChevronDown
                  className={`transition-transform duration-200 w-6 h-6 ${
                    isOpen ? "rotate-180" : ""
                    }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="w-full max-h-48 overflow-y-auto hover:bg-white mt-2 p-2">
                  <p className="text-text text-sm font-medium">
                    {description}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <ButtonQuali text="TENHO INTERESSE" fontSize="large" onClick={() => router.push("/contate-nos")} />
        </div>
      </div>
      
      {/* Desktop */}
      <div className="hidden lg:flex lg:w-[50%] flex-col gap-y-[0.5rem]">
        <div className="w-full h-full overflow-y-auto text-text hover:bg-white">
          <p className="text-text text-sm md:text-[0.9375rem] font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
