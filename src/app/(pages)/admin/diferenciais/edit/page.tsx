"use client";
import Footer from "@/components/ui/footer";
import NavbarAdmin from "@/components/ui/navbar-admin";
import Button from "@/components/ui/button-counter";

import { db } from "@/firebase/firebase-config";
import {
  collection,
  increment,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface Differential {
  id: string;
  counter: number;
  description: string;
}

export default function Diferenciais() {
  const [differentials, setDifferentials] = useState<Differential[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "differentials"),
      (snapshot) => {
        setLoading(true);
        try {
          const data = snapshot.docs.map((differential) => ({
            id: differential.id,
            ...differential.data(),
          })) as Differential[];
          setDifferentials(data);
        } catch (error) {
          console.error("Erro ao carregar os diferenciais: ", error);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  async function handleOnClick(differentialId: string, value: number) {
    try {
      const differentialCounter = doc(db, "differentials", differentialId);
      await updateDoc(differentialCounter, {
        counter: increment(value),
      });
    } catch (error) {
      console.error("Erro ao atualizar contador:", error);
    }
  }

  return (
    <div>
      <NavbarAdmin />
      <main className="flex flex-col items-center gap-[2.625rem] pt-[1.5rem] pb-[2.625rem]">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-poppins custom-h1 font-bold text-center mb-4 text-verde-petroleo">
            diferenciais
          </h1>
          {loading ? (
            <p className="text-text">Carregando diferenciais...</p>
          ) : (
            <div className="font-roboto w-[56.9375rem] bg-rosa flex flex-col items-center justify-center p-[2.375rem] gap-y-[2rem] rounded-[0.3125rem]">
              <div className="flex flex-row items-center justify-center gap-x-[2rem]">
                <div className="flex flex-col items-center justify-center gap-y-[2rem]">
                  <div className="flex flex-row items-center w-[25rem] h-[5rem] gap-x-[1rem] px-[1rem] bg-white rounded-[0.3125rem]">
                    <Button
                      counter={differentials[4].counter}
                      onClickPlus={() => handleOnClick(differentials[4].id, 1)}
                      onClickMinus={() =>
                        handleOnClick(differentials[4].id, -1)
                      }
                    />
                    <p className="w-[16rem] text-[0.9375rem] text-text font-normal">
                      {differentials[4].description}
                    </p>
                  </div>

                  <div className="flex flex-row items-center w-[25rem] h-[5rem] gap-x-[1rem] px-[1rem] bg-white rounded-[0.3125rem]">
                    <Button
                      counter={differentials[2].counter}
                      onClickPlus={() => handleOnClick(differentials[2].id, 1)}
                      onClickMinus={() =>
                        handleOnClick(differentials[2].id, -1)
                      }
                    />
                    <p className="w-[16rem] text-[0.9375rem] text-text font-normal">
                      {differentials[2].description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-y-[2rem]">
                  <div className="flex flex-row items-center w-[25rem] h-[5rem] gap-x-[1rem] px-[1rem] bg-white rounded-[0.3125rem]">
                    <Button
                      counter={differentials[0].counter}
                      onClickPlus={() => handleOnClick(differentials[0].id, 1)}
                      onClickMinus={() =>
                        handleOnClick(differentials[0].id, -1)
                      }
                    />
                    <p className="w-[16rem] text-[0.9375rem] text-text font-normal">
                      {differentials[0].description}
                    </p>
                  </div>

                  <div className="flex flex-row items-center w-[25rem] h-[5rem] gap-x-[1rem] px-[1rem] bg-white rounded-[0.3125rem]">
                    <Button
                      counter={differentials[3].counter}
                      onClickPlus={() => handleOnClick(differentials[3].id, 1)}
                      onClickMinus={() =>
                        handleOnClick(differentials[3].id, -1)
                      }
                    />
                    <p className="w-[16rem] text-[0.9375rem] text-text font-normal">
                      {differentials[3].description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center w-[32.1875rem] h-[5rem] gap-x-[1rem] px-[1rem] bg-white rounded-[0.3125rem]">
                <Button
                  counter={differentials[1].counter}
                  onClickPlus={() => handleOnClick(differentials[1].id, 1)}
                  onClickMinus={() => handleOnClick(differentials[1].id, -1)}
                />
                <p className="w-[21.125rem] text-[0.9375rem] text-text font-normal">
                  {differentials[1].description}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
