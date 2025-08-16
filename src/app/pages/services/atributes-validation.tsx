import { z } from 'zod'

const IFormInputsSchema = z.object({
  section: z
    .string()
    .min(1, {message: 'A largura tem que ser maior que 0.'})
    .regex(/^[\d,]+$/, {
      message: 'A largura deve conter apenas números e vírgulas.',
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      {message: 'A largura deve ser um número válido.'}
    ),
  height: z
    .string()
    .min(1, {message: 'O comprimento tem que ser maior que 0.'})
    .regex(/^[\d,]+$/, {
      message: 'O comprimento deve conter apenas números e vírgulas.',
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      {message: 'O comprimento deve ser um número válido.'}
    ),
  reflectance: z
  .string()
    .min(1, {message: 'O ρ tem que ser maior que 0'})
    .regex(/^[\d,]+$/, {
      message: 'O ρ deve conter apenas números e vírgulas.',
    })
    .refine(
      (value) => {
        const nomalizedValue = value.replace(',', '.')
        return (
          !isNaN(Number(nomalizedValue)) && isFinite(Number(nomalizedValue))
        )
      },
      {message: 'O ρ deve ser um número válido.'}
    )
})

const IAverageIlluminanceSchema = z.object({
  number_of_ducts: z
    .string()
    .transform(val => parseFloat(val.replace(',', '.')))
    .pipe(
      z
      .number()
      .min(0, { message: 'O Número de dutos tem que ser maior que 0' }),
    ),
  e_external: z
    .string()
    .transform(val => parseFloat(val.replace(',', '.')))
    .pipe(
      z
      .number()
      .min(0, { message: 'O E Externo tem que ser maior que 0' }),
    ),
  phi_duct: z
      .number()
      .min(0, { message: 'O φ tem que ser maior que 0' }),
  a: z
    .string()
    .transform(val => parseFloat(val.replace(',', '.')))
    .pipe(
      z
      .number()
      .min(0, { message: 'O A tem que ser maior que 0' })
    ),
  fd: z
    .string()
    .transform(val => parseFloat(val.replace(',', '.')))
    .pipe(
      z
      .number()
      .min(0, { message: 'O Fd tem que ser maior que 0' })
    ),
  cd: z
    .string()
    .transform(val => parseFloat(val.replace(',', '.')))
    .pipe(
      z
      .number()
      .min(0, { message: 'O Cd tem que ser maior que 0' })
    )
})

const INumberOfDuctsSchema = z.object({
  e_lux: z
    .string()
    .transform(val => parseFloat(val.replace(',', '.')))
    .pipe(
      z
      .number()
      .min(0, { message: 'O E lux tem que ser maior que 0' }),
    ),
  e_external: z
    .string()
    .transform(val => parseFloat(val.replace(',', '.')))
    .pipe(
      z
      .number()
      .min(0, { message: 'O E Externo tem que ser maior que 0' }),
    ),
  phi_duct: z
      .number()
      .min(0, { message: 'O φ tem que ser maior que 0' }),
  a: z
    .string()
    .transform(val => parseFloat(val.replace(',', '.')))
    .pipe(
      z
      .number()
      .min(0, { message: 'O A tem que ser maior que 0' }),
    ),
  fd: z
    .string()
    .transform(val => parseFloat(val.replace(',', '.')))
    .pipe(
      z
      .number()
      .min(0, { message: 'O Fd tem que ser maior que 0' }),
    ),
  cd: z
  .string()
    .transform(val => parseFloat(val.replace(',', '.')))
    .pipe(
      z
      .number()
      .min(0, { message: 'O Cd tem que ser maior que 0' })
    )
})

export { IAverageIlluminanceSchema, IFormInputsSchema, INumberOfDuctsSchema }
