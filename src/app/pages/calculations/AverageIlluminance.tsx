import Button from '@/app/components/button'
import Input from '@/app/components/Input'
import { IAverageIlluminanceSchema } from '@/app/pages/services/atributes-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'

type IAverageIlluminance = z.infer<typeof IAverageIlluminanceSchema>

export function AverageIlluminance() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<IAverageIlluminance>({
    resolver: zodResolver(IAverageIlluminanceSchema)
  })
  const onSubmit: SubmitHandler<IAverageIlluminance> = (data) =>
    handleSubmitData(data)

  async function handleSubmitData(data: IAverageIlluminance) {
    setIsLoading(true)

    const edlValue = localStorage.getItem('edlValue')
    const bSection = localStorage.getItem('b_section')

    if (!edlValue || !bSection) {
      console.error('EDL value or B section not found in local storage')
      setIsLoading(false)
      return
    }

    const param = new URLSearchParams({
      n_value: String(Number(data.number_of_ducts.replace(',', '.'))),
      edl_prcnt: edlValue!.toString(),
      b_section: String(Number(bSection.replace(',', '.'))),
      e_external: String(Number(data.e_external.replace(',', '.'))),
      a_area: String(Number(data.a.replace(',', '.'))),
      fd_value: String(Number(data.fd.replace(',', '.')))
    }).toString()

    try {
      const response = await axios.post(
        `https://9gmtpev0s7.execute-api.sa-east-1.amazonaws.com/prod/luz-mss/calculate-e-value?${param}`
      )
      setResult(response.data.calculated_e_value)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const edlValue = Number(localStorage.getItem('edlValue'))
    const bSection = Number(
      localStorage.getItem('b_section')?.replace(',', '.')
    )
    const eExternal = Number(getValues('e_external').replace(',', '.'))

    const edlLux = (edlValue * eExternal) / 100

    setValue('phi_duct', edlLux * Number(Math.pow(bSection, 2).toFixed(2)))
    if (eExternal) {
      trigger('phi_duct')
    }
  }, [
    watch('e_external'),
    localStorage.getItem('edlValue'),
    localStorage.getItem('bSection')
  ])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="n (Número de dutos)"
        tooltip="Número de dutos no sistema"
        register={register}
        error={errors.number_of_ducts?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: false,
          min: {
            value: 1,
            message: 'Valor mínimo é 1'
          }
        }}
        type="text"
        placeholder="Número de dutos"
        id="number_of_ducts"
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
        label="A (Área do duto)"
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
        label="Fd (Fator de distribuição)"
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
        label="Cd (Coeficiente de dutos)"
        tooltip="Coeficiente de dutos"
        register={register}
        error={errors.cd?.message}
        register_options={{
          required: 'Campo obrigatório',
          valueAsNumber: false
        }}
        type="text"
        defaultValue={3}
        // placeholder="Cd"
        disabled={true}
        id="cd"
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
          >
            Calcular
          </Button>
        </div>
      </div>
    </form>
  )
}
