import {z} from 'zod';

const IFormInputsSchema= z.object({
  section: z.number().min(1,{message: "A largura tem que ser maior que 0"}).max(999, {message: "A largura tem que ser menor que 1000"}),
  height: z.number().min(1,{message: "O comprimento tem que ser maior que 0"}).max(999, {message: "O comprimenteo tem que ser menor que 1000"}),
  reflectance: z.number().min(1,{message: "O ρ tem que ser maior que 0"})
});


const IAverageIlluminanceSchema= z.object({
  b: z.number().min(1, {message: "O b tem que ser maior que 0"}),
  height: z.number().min(1, {message: "A Altura tem que ser maior que 0"}),
  reflectance: z.number().min(1, {message: "O ρ tem que ser maior que 0"}),
  number_of_ducts: z.number().min(1, {message: "O Número de dutos tem que ser maior que 0"})
});

// type IAverageIlluminanceValidation = z.infer<typeof IAverageIlluminanceSchema>;

const INumberOfDuctsSchema= z.object({
  edl: z.number().min(1, {message: "O edl tem que ser maior que 0"}),
  e: z.number().min(1, {message: "O E tem que ser maior que 0"}),
  e_external: z.number().min(1, {message: "O E Externo tem que ser maior que 0"}),
  phi_duct: z.number().min(1, {message: "O φ tem que ser maior que 0"}),
  a: z.number().min(1, {message: "O A tem que ser maior que 0"}),
  fd: z.number().min(1, {message: "O Fd tem que ser maior que 0"}),
  cd: z.number().min(1, {message: "O Cd tem que ser maior que 0"})
});

// type INumberOfDuctsValidation = z.infer<typeof INumberOfDuctsSchema>;

export {IFormInputsSchema, IAverageIlluminanceSchema, INumberOfDuctsSchema}