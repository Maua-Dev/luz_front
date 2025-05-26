import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

type IAverageIlluminance = {
  b: number
  height: number
  reflectance: number
  number_of_ducts: number
}

export function AverageIlluminance() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAverageIlluminance>()
  const onSubmit: SubmitHandler<IAverageIlluminance> = (data) =>
    console.log(data)

  function handleSubmitData() {
    setIsLoading(true)
    // Mock a network request
    setTimeout(() => {
      setIsLoading(false)
      setResult(10)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="b (Seção)"
        tooltip="Valor da seção transversal do duto (m²)"
        register={register}
        error={errors.b?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: true
        }}
        type="number"
        placeholder="Largura (m)"
        id="inputWidth"
      />
      <Input
        label="h (Altura)"
        tooltip="Valor da altura do duto (m)"
        register={register}
        error={errors.height?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: true
        }}
        type="number"
        placeholder="Altura (m)"
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
      <Input
        label="Número de dutos"
        tooltip="Número de dutos no sistema"
        register={register}
        error={errors.number_of_ducts?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: true,
          min: {
            value: 1,
            message: 'Valor mínimo é 1'
          }
        }}
        type="number"
        placeholder="Número de dutos"
        id="inputNumberOfDucts"
      />
      <div>
        <p className="text-lg">Resultado:</p>
        <div className="flex flex-row items-center justify-between gap-x-4">
          <div className="border-accent-400 w-64 max-w-64 border-2 p-4">
            <p className="text-text-950 text-lg font-semibold">
              {result !== null ? result : '0.00'}
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
  )
}
