import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { INumberOfDuctsSchema } from '@/app/pages/services/atributes-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'

type INumberOfDucts = z.infer<typeof INumberOfDuctsSchema>;

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
  const onSubmit: SubmitHandler<INumberOfDucts> = (data) => handleSubmitData(data)

  async function handleSubmitData(data: INumberOfDucts) {
    setIsLoading(true)

    const edlValue = localStorage.getItem('edlValue');
    const bSection = localStorage.getItem('b_section');
    
    if (!edlValue || !bSection) {
      console.error('EDL value or B section not found in localStorage');
      setIsLoading(false);
      return;
    }

    const params = new URLSearchParams({
      edl_prcnt: edlValue!.toString(),
      b_section: Number(bSection).toString(),
      e_lux: data.e_lux.toString(),
      e_external: data.e_external.toString(),
      a_area: data.a.toString(),
      fd_value: data.fd.toString(),
    }).toString();

    try {
      const response = await axios.post(`https://9gmtpev0s7.execute-api.sa-east-1.amazonaws.com/prod/luz-mss/calculate-n-value?${params}`);
      setResult(response.data.calculated_n_value);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const edlValue = Number(localStorage.getItem('edlValue'));
    const bValue = Number(localStorage.getItem('b_section'));
    const e_external = getValues('e_external');

    const edllux = (edlValue * e_external) / 100;

    setValue('phi_duct', (edllux) * (Number(Math.pow(bValue, 2).toFixed(2))));

  }, [watch('e_external'), localStorage.getItem('edlValue'), localStorage.getItem('b_section')]);

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
        type="float"
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
          valueAsNumber: true
        }}
        type="float"
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
        type="float"
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
          valueAsNumber: true
        }}
        type="float"
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
          valueAsNumber: true
        }}
        type="float"
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
          valueAsNumber: true
        }}
        type="float"
        defaultValue={3}
        // placeholder="Cd"
        disabled= {true}
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
