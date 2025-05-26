import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import Navbar from '@/app/components/Navbar'
import { AverageIlluminance } from '@/app/pages/calculations/AverageIlluminance'
import { NumberOfDucts } from '@/app/pages/calculations/NumberOfDucts'
import { cn } from '@/app/styles/cn'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { HelpCircle } from 'react-feather'
import { useForm, type SubmitHandler } from 'react-hook-form'

type IFormInputs = {
  section: number
  height: number
  reflectance: number
}

export function Home() {
  const [edlValue, setEdlValue] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  type CalculationKey = 'numberOfDucts' | 'averageIlluminance'
  const [selectedCalculation, setSelectedCalculation] =
    useState<CalculationKey>('numberOfDucts')

  const calculations: Record<
    CalculationKey,
    { title: string; component: ReactNode }
  > = {
    numberOfDucts: {
      title: 'Número de Dutos',
      component: <NumberOfDucts />
    },
    averageIlluminance: {
      title: 'Iluminância Média',
      component: <AverageIlluminance />
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>()
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

  function handleSubmitData() {
    setIsLoading(true)
    // Mock a network request
    setTimeout(() => {
      setIsLoading(false)
      setEdlValue(10)
    }, 2000)
  }

  return (
    <main className="mx-auto grid h-svh w-full max-w-5xl grid-rows-[fit_fit] px-4 py-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="flex flex-col gap-y-8 py-8">
        <LayoutGroup>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="bg-background-50 border-background-100 z-20 flex h-fit w-full flex-col gap-y-4 rounded-sm border p-4 transition-all duration-300"
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-text-950 text-lg">
                1. Digite os valores para calcular o EDL
              </p>
              <HelpCircle
                className="text-text-950 hover:text-accent-400 cursor-pointer transition-colors duration-300"
                size={20}
              />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Input
                label="b (Seção)"
                tooltip="Largura da seção do duto (m)"
                register={register}
                error={errors.section?.message}
                register_options={{
                  required: 'Campo obrigatório',
                  valueAsNumber: true
                }}
                type="number"
                placeholder="x (Metros)"
                id="inputValue"
              />
              <Input
                label="h (Altura)"
                tooltip="Comprimento do duto (m)"
                register={register}
                error={errors.height?.message}
                register_options={{
                  required: 'Campo obrigatório',
                  valueAsNumber: true
                }}
                type="number"
                placeholder="h (Metros)"
                id="inputHeight"
              />
              <Input
                label="ρ (Refletância)"
                tooltip="Refletância interna ao duto"
                register={register}
                error={errors.reflectance?.message}
                register_options={{
                  required: 'Campo obrigatório',
                  valueAsNumber: true
                }}
                type="number"
                placeholder="z"
                id="inputReflectance"
              />
              <div>
                <p className="text-lg">Resultado:</p>
                <div className="flex flex-row items-center justify-between gap-x-4">
                  <div className="border-accent-400 w-64 max-w-64 border-2 p-4">
                    <p className="text-text-950 text-lg font-semibold">
                      EDL = {edlValue !== null ? edlValue : '0.00'}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    loading={isLoading}
                    className="bg-accent-400 hover:bg-accent-500 text-text-50 cursor-pointer"
                    onClick={() => handleSubmitData()}
                  >
                    Calcular
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
          <AnimatePresence>
            {edlValue && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-background-50 border-background-100 z-10 flex h-fit w-full flex-col gap-y-4 rounded-sm border p-4"
              >
                <div className="flex flex-col items-start gap-y-4">
                  <p className="text-text-950 text-lg">
                    2. Selecione o que deseja calcular
                  </p>
                  <div className="flex w-full flex-row items-center justify-evenly">
                    <button
                      onClick={() => {
                        setSelectedCalculation('numberOfDucts')
                      }}
                      className={cn(
                        'text-text-50 hover:bg-background-700 bg-background-800 cursor-pointer rounded-sm p-4 px-6 transition-colors duration-300',
                        selectedCalculation === 'numberOfDucts' &&
                          'bg-accent-400 text-text-50'
                      )}
                    >
                      Nº de dutos
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCalculation('averageIlluminance')
                      }}
                      className={cn(
                        'text-text-50 hover:bg-background-700 bg-background-800 cursor-pointer rounded-sm p-4 px-6 transition-colors duration-300',
                        selectedCalculation === 'averageIlluminance' &&
                          'bg-accent-400 text-text-50'
                      )}
                    >
                      Iluminância média
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {calculations[selectedCalculation] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      {calculations[selectedCalculation].component}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </main>
  )
}
