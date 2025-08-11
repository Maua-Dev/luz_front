import { Drawer, DrawerContent, DrawerTopbar } from '@/app/components/drawer'
import {
  EDLFormula,
  EDLFormula2,
  NFormula,
  PhiFormula,
  RCRFormula
} from '@/app/components/formula'
import { DrawerContext } from '@/app/contexts/Drawer-context'
import { AnimatePresence } from 'framer-motion'
import { useContext } from 'react'

function Information() {
  return (
    <AnimatePresence>
      <div className="px-10">
        <p className="py-4 text-justify text-sm">
          E - iluminância requerida (lux);
          <br />
          n - número de dutos; <br />
          A - área do ambiente a ser iluminado (m2); <br />
          Fd - fator de depreciação: (0.7 se a manutenção for boa, 0.6 para
          áreas industriais e 0.5 se a manutenção for crítica); <br />
          CD é o coeficiente de distribuição *; <br />
          i - número de reflexões do plano iluminado no interior do duto; <br />
          b - largura da seção do duto (m); <br />
          c - comprimento do duto (m); <br />
          ρ - refletância interna ao duto; <br />n - número de reflexões do
          plano emissor, consideradas no somatório; <br />
          RCR - coeficiente do recinto; <br />
          a, b - dimensões do ambiente (m); <br />h - pé direito útil (da saída
          no forro até o plano de trabalho) (m). <br />
        </p>
        <div className="py-3">
          <h1 className="w-full border-b border-black pb-1 text-xl">Desenho</h1>
          <p>
            <img src="drawing_model.png" alt="desenho" className="py-5" />
          </p>
        </div>
        <div className="py-3">
          <h1 className="w-full border-b border-black pb-1 text-xl">Cálculo</h1>
          <div className="text-justify">
            <div className="py-2">
              <EDLFormula />
            </div>
            <div className="mr-43 py-2">
              <EDLFormula2 />
            </div>
            <div className="mr-60 py-2">
              <PhiFormula />
            </div>
            <div className="mr-50 py-2">
              <NFormula />
            </div>
            <div className="mr-50 py-2">
              <RCRFormula />
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}
export function InformationDrawer() {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('InformationDrawer must be used within a DrawerContex')
  }
  return (
    <Drawer isOpen={context.isOpen} setIsOpen={context.setIsOpen}>
      <DrawerContent>
        <DrawerTopbar>Informações</DrawerTopbar>
        <Information />
      </DrawerContent>
    </Drawer>
  )
}
