import Button from '@/app/components/button'
import Input from '@/app/components/Input'
import Navbar from '@/app/components/navbar'
import { DrawerContext } from '@/app/contexts/Drawer-context'
import { AverageIlluminance } from '@/app/pages/calculations/AverageIlluminance'
import { NumberOfDucts } from '@/app/pages/calculations/NumberOfDucts'
import { IFormInputsSchema } from '@/app/pages/services/atributes-validation'
import { cn } from '@/app/styles/cn'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useContext, useEffect, useState, type ReactNode } from 'react'
import { HelpCircle } from 'react-feather'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'

// type IFormInputs = {
//   section: number
//   height: number
//   reflectance: number
// }

type IFormInputs = z.infer<typeof IFormInputsSchema>

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
  } = useForm<IFormInputs>({
    resolver: zodResolver(IFormInputsSchema)
  })
  const onSubmit: SubmitHandler<IFormInputs> = (data) => handleSubmitData(data)

  async function handleSubmitData(data: IFormInputs) {
    console.log('Submitting data:', data)
    setIsLoading(true)

    const params = new URLSearchParams({
      b_section: String(data.section),
      h_height: String(data.height),
      p_reflectance: String(data.reflectance)
    }).toString()

    try {
      const response = await axios.post(
        `https://9gmtpev0s7.execute-api.sa-east-1.amazonaws.com/prod/luz-mss/calculate-edl-value?${params}`
      )
      setEdlValue(response.data.calculated_edl_value)

      // Save edlValue to localStorage
      localStorage.setItem('edlValue', response.data.calculated_edl_value)
      // Save b_section to localStorage
      localStorage.setItem('b_section', String(data.section))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const drawerContext = useContext(DrawerContext)

  useEffect(() => {
    if (drawerContext?.isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [drawerContext?.isOpen, drawerContext?.setIsOpen])

  return (
    <>
      <Navbar />
      <main className="mx-auto flex h-full w-full max-w-5xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-y-8 py-8" id="content">
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
                  type="float"
                  placeholder="x (Metros)"
                  id="section"
                />
                <Input
                  label="c (Comprimento)"
                  tooltip="Comprimento do duto (m)"
                  register={register}
                  error={errors.height?.message}
                  register_options={{
                    required: 'Campo obrigatório',
                    valueAsNumber: true
                  }}
                  type="float"
                  placeholder="h (Metros)"
                  id="height"
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
                  type="float"
                  placeholder="z"
                  id="reflectance"
                />
                <div>
                  <p className="text-lg">Resultado:</p>
                  <div className="flex flex-col items-start justify-between gap-x-4 gap-y-8 sm:flex-row sm:items-center">
                    <div className="border-accent-500 w-full border-2 p-4 sm:w-64 sm:max-w-64">
                      <p className="text-text-950 text-lg font-semibold">
                        EDL = {edlValue !== null ? edlValue : '0.00'}
                      </p>
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      loading={isLoading}
                      className="bg-accent-400 hover:bg-accent-500 text-text-50 cursor-pointer"
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
                    <div className="flex w-full flex-row items-center justify-between gap-x-2 sm:max-w-[642px]">
                      <button
                        onClick={() => {
                          setSelectedCalculation('numberOfDucts')
                        }}
                        className={cn(
                          'text-text-50 hover:bg-background-700 bg-background-800 w-full cursor-pointer rounded-sm p-4 px-6 transition-colors duration-300 sm:min-w-48',
                          selectedCalculation === 'numberOfDucts' &&
                            'bg-accent-500 text-text-50'
                        )}
                      >
                        Nº de dutos
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCalculation('averageIlluminance')
                        }}
                        className={cn(
                          'text-text-50 hover:bg-background-700 bg-background-800 w-full cursor-pointer rounded-sm p-4 px-6 transition-colors duration-300 sm:min-w-48',
                          selectedCalculation === 'averageIlluminance' &&
                            'bg-accent-500 text-text-50'
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
    </>
  )
}
