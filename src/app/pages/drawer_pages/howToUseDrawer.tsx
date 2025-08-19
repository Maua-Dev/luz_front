import { Drawer, DrawerContent, DrawerTopbar } from '@/app/components/drawer'
import { DrawerContext } from '@/app/contexts/Drawer-context'
import { AnimatePresence } from 'framer-motion'
import { useContext } from 'react'

function Explanation() {
  return (
    <AnimatePresence>
      <main className="text-text-50 px-10 py-3 text-justify">
        <p className="py-1">
          Para iniciar, realize o calculo do EDL. Preencha as caixas à direita
          com os respectivos valores e clique em Calcular, o resultado da conta
          deverá aparecer na caixa “Resultado”.
        </p>
        <p className="py-1">
          Em seguida selecione o que deseja calcular utilizando os botões (Nº de
          Dutos ou Iluminância média) e repita o processo.
        </p>
        <p className="py-1">
          Caso tenha alguma dúvida a respeito de uma variável, clique no ícone
          de informações ⓘ para saber mais.
        </p>
        <p className="py-1">
          As caixas de resposta que estão em amarelo não podem ser editadas,
          pois já possuem um valor fixo.
        </p>
        <p className="py-1">
          Caso possua mais dúvidas, consulte o cálculo em “Princípios” ou clique
          em “Saiba mais”.
        </p>
      </main>
    </AnimatePresence>
  )
}

export function HowToUseDrawer() {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('HowToUseDrawe must be used within a DrawerContex')
  }
  return (
    <Drawer isOpen={context.isOpen} setIsOpen={context.setIsOpen}>
      <DrawerContent>
        <DrawerTopbar>Como Usar</DrawerTopbar>
        <Explanation />
      </DrawerContent>
    </Drawer>
  )
}
