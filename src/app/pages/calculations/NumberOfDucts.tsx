import Button from '@/app/components/button'
import Input from '@/app/components/Input'
import { INumberOfDuctsSchema } from '@/app/pages/services/atributes-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'

type INumberOfDucts = z.infer<typeof INumberOfDuctsSchema>

export function NumberOfDucts() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<INumberOfDucts>({
    resolver: zodResolver(INumberOfDuctsSchema)
  })
  const onSubmit: SubmitHandler<INumberOfDucts> = (data) =>
    handleSubmitData(data)

  async function handleSubmitData(data: INumberOfDucts) {
    setIsLoading(true)

    const edlValue = localStorage.getItem('edlValue')
    const bSection = localStorage.getItem('b_section')

    if (!edlValue || !bSection) {
      console.error('EDL value or B section not found in localStorage')
      setIsLoading(false)
      return
    }

    const params = new URLSearchParams({
      edl_prcnt: edlValue!.toString(),
      b_section: String(Number(bSection.replace(',', '.'))),
      e_lux: String(Number(data.e_lux.replace(',', '.'))),
      e_external: String(Number(data.e_external.replace(',', '.'))),
      a_area: String(Number(data.a.replace(',', '.'))),
      fd_value: String(Number(data.fd.replace(',', '.')))
    }).toString()

    try {
      const response = await axios.post(
        `https://9gmtpev0s7.execute-api.sa-east-1.amazonaws.com/prod/luz-mss/calculate-n-value?${params}`
      )
      setResult(response.data.calculated_n_value)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const edlValue = Number(localStorage.getItem('edlValue'))
    const bValue = Number(localStorage.getItem('b_section')?.replace(',', '.'))
    const e_external = Number(getValues('e_external').replace(',', '.'))

    const edllux = (edlValue * e_external) / 100

    setValue('phi_duct', edllux * Number(Math.pow(bValue, 2).toFixed(2)))
  }, [
    watch('e_external'),
    localStorage.getItem('edlValue'),
    localStorage.getItem('b_section')
  ])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 gap-y-12 sm:gap-y-4"
    >
      <Input
        label="E lux"
        tooltip="Iluminância média do ambiente (Lux)"
        register={register}
        error={errors.e_lux?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: false
        }}
        type="text"
        placeholder="E (Lux)"
        id="e_lux"
      />
      <Input
        label="E externo"
        tooltip="Iluminância externa ao duto (Lux)"
        register={register}
        error={errors.e_external?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: false
        }}
        type="text"
        placeholder="E externo (Lux)"
        id="e_external"
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
        id="phi_duct"
      />
      <Input
        label="A (Área do ambiente)"
        tooltip="Área do duto (m²)"
        register={register}
        error={errors.a?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: false
        }}
        type="text"
        placeholder="A (m²)"
        id="a"
      />
      <Input
        label="Fd (Fator de depreciação)"
        tooltip="Fator de distribuição do duto"
        register={register}
        error={errors.fd?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: false
        }}
        type="text"
        placeholder="Fd"
        id="fd"
      />
      <Input
        label="Cd (Coeficiente de distribuição)"
        tooltip="Coeficiente de dutos"
        register={register}
        error={errors.cd?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: false
        }}
        type="text"
        // defaultValue={3}
        placeholder="Cd/ recomendasse 3"
        disabled={false}
        id="cd"
      />
      <div>
        <p className="text-lg">Resultado:</p>
        <div className="flex flex-col items-start justify-between gap-x-4 gap-y-8 sm:flex-row sm:items-center">
          <div className="border-accent-500 w-full border-2 p-4 sm:w-64 sm:max-w-64">
            <p className="text-text-950 text-lg font-semibold">
              {result !== null ? result : '0.00'}
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
  )
}
