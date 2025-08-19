import { z } from 'zod'

const IFormInputsSchema = z.object({
  section: z
    .string()
    .min(1, { message: 'O b tem que ser maior que 0.' })
    .regex(/^[\d,.]+$/, {
      message: 'O b deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O b deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 10000)
      },
      { message: 'O b deve ser menor que 10000.' }
    ),
  height: z
    .string()
    .min(1, { message: 'O c tem que ser maior que 0.' })
    .regex(/^[\d,.]+$/, {
      message: 'O c deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O c deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 100000)
      },
      { message: 'O c deve ser menor que 100000.' }
    ),
  reflectance: z
    .string()
    .min(1, { message: 'O ρ tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O ρ deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O ρ deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 1)
      },
      { message: 'O ρ deve ser menor que 1.' }
    )
})

const IAverageIlluminanceSchema = z.object({
  number_of_ducts: z
    .string()
    .min(1, { message: 'O n tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O n deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O n deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue >= 1000000)
      },
      { message: 'O n deve ser menor que 1000000.' }
    ),
  e_external: z
    .string()
    .min(1, { message: 'O E Externo tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O E Externo deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O E Externo deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 1000000)
      },
      { message: 'O E Externo deve ser menor que 1000000.' }
    ),
  phi_duct: z.number().min(0, { message: 'O φ tem que ser maior que 0' }),
  a: z
    .string()
    .min(1, { message: 'O A tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O A deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O A deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 1000000)
      },
      { message: 'O A deve ser menor que 1000000.' }
    ),
  fd: z
    .string()
    .min(1, { message: 'O Fd tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O Fd deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O Fd deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 1000000)
      },
      { message: 'O Fd deve ser menor que 1000000.' }
    ),
  cd: z
    .string()
    .min(1, { message: 'O Cd tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O Cd deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O Cd deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 1000000)
      },
      { message: 'O Cd deve ser menor que 1000000.' }
    )
})

const INumberOfDuctsSchema = z.object({
  e_lux: z
    .string()
    .min(1, { message: 'O E lux tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O E lux deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O E lux deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 1000000)
      },
      { message: 'O E lux deve ser menor que 1000000.' }
    ),
  e_external: z
    .string()
    .min(1, { message: 'O E Externo tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O E Externo deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O E Externo deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 1000000)
      },
      { message: 'O E Externo deve ser menor que 1000000.' }
    ),
  phi_duct: z.number().min(0, { message: 'O φ tem que ser maior que 0' }),
  a: z
    .string()
    .min(1, { message: 'O A tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O A deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O A deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 1000000)
      },
      { message: 'O A deve ser menor que 1000000.' }
    ),
  fd: z
    .string()
    .min(1, { message: 'O Fd tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O Fd deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O Fd deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 1000000)
      },
      { message: 'O Fd deve ser menor que 1000000.' }
    ),
  cd: z
    .string()
    .min(1, { message: 'O Cd tem que ser maior que 0' })
    .regex(/^[\d,.]+$/, {
      message: 'O Cd deve conter apenas números e vírgulas.'
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      { message: 'O Cd deve ser um número válido.' }
    )
    .refine(
      (value) => {
        const normalizedValue = parseFloat(value.replace(',', '.'))
        return !(normalizedValue > 1000000)
      },
      { message: 'O Cd deve ser menor que 1000000.' }
    )
})

export { IAverageIlluminanceSchema, IFormInputsSchema, INumberOfDuctsSchema }
