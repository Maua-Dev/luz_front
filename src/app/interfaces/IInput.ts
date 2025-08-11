import { type RegisterOptions, type UseFormRegister } from 'react-hook-form'

export interface IInput {
  label: string
  tooltip?: string
  // Disable the linter rule for this line as it is necessary for the form handling
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  register_options?: RegisterOptions
  type: HTMLInputElement['type']
  placeholder?: string
  className?: string
  error?: string
  disabled?: boolean
  id?: string
  defaultValue?: string | number
}
