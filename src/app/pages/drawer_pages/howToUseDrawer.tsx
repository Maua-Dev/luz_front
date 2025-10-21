import { Drawer, DrawerContent, DrawerTopbar } from '@/app/components/drawer'
import { DrawerContext } from '@/app/contexts/Drawer-context'
import { AnimatePresence } from 'framer-motion'
import { useContext } from 'react'

function Explanation() {
  return (
    <AnimatePresence>
      <main className="text-text-50 px-10 py-5 gap-y-16 flex flex-col">
        1- Preencha os valores de b, c e **ρ e clique em calcular**
        <br/>
        <br/>
        2 - Selecione o que deseja calcular em seguida, Numero de dutos ou Iluminância média e clique em calcular
        <br/>
        <br/>
        3 - Aproveite os resultados 
        <br/>
        <br/>
        4- Em seguida, experimente alterar apenas um parâmetro (por exemplo, a refletância ou o comprimento) e veja como isso muda o número final de dutos — exatamente como os autores do artigo testaram diferentes configurações.
      
        <div className="flex h-150 flex-shrink-0 items-start justify-start">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Campo na calculadora</th>
                <th className="px-4 py-2 text-left">Valor do artigo</th>
                <th className="px-4 py-2 text-left">Significado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Área (m²)</td>
                <td className="border px-4 py-2">108.24</td>
                <td className="border px-4 py-2">Área do ambiente iluminado</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Iluminância desejada (lux)</td>
                <td className="border px-4 py-2">200</td>
                <td className="border px-4 py-2">Meta de iluminância média no plano de trabalho</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Iluminância externa (lux)</td>
                <td className="border px-4 py-2">20000</td>
                <td className="border px-4 py-2">Luz natural disponível no exterior</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Lado da entrada (m)</td>
                <td className="border px-4 py-2">0.7</td>
                <td className="border px-4 py-2">Largura da abertura do duto</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Comprimento do duto (m)</td>
                <td className="border px-4 py-2">12</td>
                <td className="border px-4 py-2">Comprimento total do duto</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Reflectância (ρ)</td>
                <td className="border px-4 py-2">0.95</td>
                <td className="border px-4 py-2">Material refletor (alumínio polido)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">CU (Coeficiente de Utilização)</td>
                <td className="border px-4 py-2">3</td>
                <td className="border px-4 py-2">Eficiência do uso da luz interna</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">LLF (Fator de Perdas de Luz)</td>
                <td className="border px-4 py-2">0.7</td>
                <td className="border px-4 py-2">Fator de perdas por sujeira e manutenção</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">LPE (Eficiência do Duto)</td>
                <td className="border px-4 py-2">0.2104</td>
                <td className="border px-4 py-2">(opcional) Se a calculadora permitir entrada direta; senão, é calculado automaticamente</td>
              </tr>
            </tbody>
          </table>
        </div>
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
