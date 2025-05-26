import { type RegisterOptions } from 'react-hook-form'

export interface IInput {
  label: string
  tooltip?: string
  register: any
  register_options?: RegisterOptions
  type: HTMLInputElement['type']
  placeholder?: string
  className?: string
  error?: string
  disabled?: boolean
  id?: string
}
