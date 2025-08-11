import type { IInput } from '@/app/interfaces/IInput'

export interface ICalculation {
  inputs: IInput[]
  onSubmit: (data: Record<string, unknown>) => void
  result: string | number | null
  isLoading: boolean
}
