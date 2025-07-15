import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { INumberOfDuctsSchema } from '@/app/pages/services/atributes-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'

type INumberOfDucts = z.infer<typeof INumberOfDuctsSchema>;

export function NumberOfDucts() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<INumberOfDucts>({
    resolver: zodResolver(INumberOfDuctsSchema)
  })
  const onSubmit: SubmitHandler<INumberOfDucts> = (data) => console.log(data)

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
        label="E lux"
        tooltip="Iluminância média do ambiente (Lux)"
        register={register}
        error={errors.e_lux?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: true
        }}
        type="number"
        placeholder="E (Lux)"
        id="inputE"
      />
      <Input
        label="E externo"
        tooltip="Iluminância externa ao duto (Lux)"
        register={register}
        error={errors.e_external?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: true
        }}
        type="number"
        placeholder="E externo (Lux)"
        id="inputEExternal"
      />
      <Input
        label="φ (Fator de reflexão do duto)"
        tooltip="Fator de reflexão do duto"
        register={register}
        error={errors.phi_duct?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: true
        }}
        type="number"
        // placeholder="φ"
        disabled={true}
        id="inputPhiDuct"
      />
      <Input
        label="A (Área do duto)"
        tooltip="Área do duto (m²)"
        register={register}
        error={errors.a?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: true
        }}
        type="number"
        placeholder="A (m²)"
        id="inputArea"
      />
      <Input
        label="Fd (Fator de distribuição)"
        tooltip="Fator de distribuição do duto"
        register={register}
        error={errors.fd?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: true
        }}
        type="number"
        placeholder="Fd"
        id="inputFd"
      />
      <Input
        label="Cd (Coeficiente de dutos)"
        tooltip="Coeficiente de dutos"
        register={register}
        error={errors.cd?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: true
        }}
        type="number"
        // placeholder="Cd"
        disabled= {true}
        id="inputCd"
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
