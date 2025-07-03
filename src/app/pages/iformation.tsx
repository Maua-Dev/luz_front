import { X } from "lucide-react";
import { Drawer, DrawerContent, DrawerTopbar } from "@/app/components/drawer";
import { useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DrawerContext, DrawerProvider, useDrawer } from "@/app/contexts/Drawer-context";
import { EDLFormula, EDLFormula2, NFormula, PhiFormula, RCRFormula } from "@/app/components/formula";

function Information() {
    return (
        <AnimatePresence>
            <div className="px-10 ">
                <p className="py-4 text-justify text-sm">
                    E - iluminância requerida (lux);<br />
                    n - número de dutos; <br />
                    A - área do ambiente a ser iluminado (m2); <br />
                    Fd - fator de depreciação: (0.7 se a manutenção for boa, 0.6 para áreas industriais e 0.5 se a manutenção for crítica); <br />
                    CD é o coeficiente de distribuição *; <br />
                    i - número de reflexões do plano iluminado no interior do duto; <br />
                    b - largura da seção do duto (m); <br />
                    h - comprimento do duto (m); <br />
                    ρ - refletância interna ao duto; <br />
                    n - número de reflexões do plano emissor, consideradas no somatório; <br />
                    RCR - coeficiente do recinto; <br />
                    a, b - dimensões do ambiente (m); <br />
                    h - pé direito útil (da saída no forro até o plano de trabalho) (m). <br />
                </p>
                <div className="py-3">
                    <h1 className="text-xl w-full border-b border-black pb-1">Desenho</h1>
                    <p>
                        <img src="drawing_model.png" alt="desenho" className="py-5" />
                    </p>
                </div>
                <div className="py-3">
                    <h1 className="text-xl w-full border-b border-black pb-1">Cálculo</h1>
                    <div className="text-justify">
                        <div className="py-2">
                            <EDLFormula />
                        </div>
                        <div className="py-2 mr-43">
                            <EDLFormula2 />
                        </div>
                        <div className="py-2 mr-60">
                            <PhiFormula />
                        </div>
                        <div className="py-2 mr-50">
                            <NFormula />

                        </div>
                        <div className="py-2 mr-50">
                            <RCRFormula />
                        </div>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    )
}
export function DrawerInformation() {
    return (
        <Drawer>
            <DrawerContent>
                <DrawerTopbar>Informações</DrawerTopbar>
                <Information />
            </DrawerContent>
        </Drawer>
    )
}

export function TesteTela() {
    const context = useContext(DrawerContext)
    if (!context) {
        throw new Error("DrawerTopbar must be used within a Drawer")
    }
    return (
        <>
            <main className="h-screen w-full, bg-white">
                <button onClick={() => {
                    context.setIsOpen(true);
                }} className="bg-black rounded-2xl h-1/5 w-1/3"></button>
                <div>

                </div>
            </main>
            <Drawer>
                <DrawerContent>
                    <DrawerTopbar>Informações</DrawerTopbar>
                    <Information />
                </DrawerContent>
            </Drawer>
        </>
    )
}