import { Drawer, DrawerContent, DrawerTopbar } from '@/app/components/drawer'
import { DrawerContext } from '@/app/contexts/Drawer-context'
import { AnimatePresence } from 'motion/react'
import { useContext } from 'react'

function Table() {
  return (
    <AnimatePresence>
      <main className="text-text-50 px-10 py-5 gap-y-16 flex flex-col">
        <div>
          <h4 className='font-semibold text-lg'>Contextualização</h4>
        <p>
            Este exemplo foi baseado no artigo científico <a className='text-primary-200' target="_blank" rel="noopener noreferrer" href="https://file.notion.so/f/f/75b6d888-9de1-404e-88ed-ba345eb1fe45/bf5dede8-c067-4d92-9008-0b5769a99fad/Artigo_ENTAC2010.pdf?table=block&id=28fdfc4b-578a-8058-a7fd-ff72ea702814&spaceId=75b6d888-9de1-404e-88ed-ba345eb1fe45&expirationTimestamp=1761076800000&signature=QlmvON1GDxmVyAlTPf20f1584TxJ66i_pIkikCcUd7A&downloadName=Artigo_ENTAC2010.pdf">“An application of light pipe dimensioning model”</a> (*LUZ et al.*, 2017), que apresentou uma aplicação real do modelo de **dimensionamento de dutos de luz** (*light pipes*) em um projeto de iluminação natural para a **Estação Fradique Coutinho**, da Linha 4-Amarela do Metrô de São Paulo.
          <br/>
          <br/>
            O objetivo do estudo foi **aproveitar a luz natural** para iluminar as plataformas subterrâneas, reduzindo o consumo de energia elétrica e demonstrando a viabilidade do uso de dutos de luz em grandes espaços públicos.
          <br/>
          <br/>
            O artigo descreve todas as etapas — desde a coleta de dados de iluminância externa até o cálculo da eficiência luminosa e o número de dutos necessários —, o que o torna um excelente **caso de estudo prático** para nossa **Calculadora de Iluminância**, disponível aqui no site.
          <br/>
          <br/>
            A seguir, você verá **como os dados reais do artigo são inseridos nos campos da calculadora** e como o resultado obtido é exatamente o mesmo do estudo.
        </p>
        </div>

        <div>
        <h4 className='font-semibold text-lg'>O que você vai aprender com este exemplo</h4>

        <ul className='list-disc list-inside flex flex-col gap-2'>
          <li>Como preencher os campos da calculadora com base em um caso real</li>
          <li>O significado físico de cada variável (Eext, Em, CU, LLF etc.)</li>
          <li>Como os cálculos de iluminância e eficiência são aplicados na prática</li>
          <li>E como os resultados da ferramenta correspondem aos obtidos no estudo original.</li>
        </ul>
        </div>

        <div className="flex h-150 flex-shrink-0 items-start justify-start">
          <table>
            <thead>
              <tr>
                <th className="px-4 py-2">Parâmetro</th>
                <th className="px-4 py-2">Símbolo</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2">Unidade</th>
                <th className="px-4 py-2">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Área da plataforma</td>
                <td className="border px-4 py-2">A</td>
                <td className="border px-4 py-2">108.24</td>
                <td className="border px-4 py-2">m²</td>
                <td className="border px-4 py-2">Superfície a ser iluminada</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Iluminância desejada</td>
                <td className="border px-4 py-2">Em</td>
                <td className="border px-4 py-2">200</td>
                <td className="border px-4 py-2">Lux</td>
                <td className="border px-4 py-2">Nível médio de luz necessário</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Iluminância externa</td>
                <td className="border px-4 py-2">Eext</td>
                <td className="border px-4 py-2">20000</td>
                <td className="border px-4 py-2">Lux</td>
                <td className="border px-4 py-2">Luz disponível no exterior em dia claro</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Lado do duto quadrado</td>
                <td className="border px-4 py-2">b</td>
                <td className="border px-4 py-2">0.7</td>
                <td className="border px-4 py-2">m</td>
                <td className="border px-4 py-2">Tamanho da abertura do duto</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Comprimento do duto</td>
                <td className="border px-4 py-2">h</td>
                <td className="border px-4 py-2">12</td>
                <td className="border px-4 py-2">m</td>
                <td className="border px-4 py-2">Distância entre a entrada e a saída de luz</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Reflectância interna</td>
                <td className="border px-4 py-2">φ</td>
                <td className="border px-4 py-2">0.95</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2">Material interno de alta refletância (alumínio polído)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Coeficiente de utilização</td>
                <td className="border px-4 py-2">CU</td>
                <td className="border px-4 py-2">3</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2">Eficiência do duto em direcionar luz</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Fator de perdas de luz</td>
                <td className="border px-4 py-2">LLF</td>
                <td className="border px-4 py-2">0.7</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2">Considera sujeira e perdas de transmissão</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Eficiência do duto (light pipe efficiency)</td>
                <td className="border px-4 py-2">LPE</td>
                <td className="border px-4 py-2">0.2104</td>
                <td className="border px-4 py-2">-</td>
                <td className="border px-4 py-2">Calculada pelo modelo LEPMLP desenvolvido no estudo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </AnimatePresence>
  )
}
export function TableDrawer() {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('InformationDrawer must be used within a DrawerContex')
  }
  return (
    <Drawer isOpen={context.isOpen} setIsOpen={context.setIsOpen}>
      <DrawerContent>
        <DrawerTopbar>Aplicação</DrawerTopbar>
        <Table />
      </DrawerContent>
    </Drawer>
  )
}
