import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/app/components/Tooltip'
import type { IInput } from '@/app/interfaces/IInput'
import { Info } from 'react-feather'

function Input({
  label,
  tooltip,
  register,
  register_options,
  type = 'text',
  placeholder = '',
  className = '',
  defaultValue = '',
  error,
  disabled,
  id = ''
}: IInput) {
  return (
    <div className="flex h-fit flex-col items-center justify-between gap-x-8 gap-y-8 sm:h-16 sm:flex-row">
      <div className="bg-background-900 flex h-full w-full flex-row items-center justify-between p-4">
        <p className="text-text-50 text-xl">{label}</p>
        <TooltipProvider>
          <TooltipTrigger>
            <Info
              className="text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300"
              size={20}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-text-50 text-sm">{tooltip}</p>
          </TooltipContent>
        </TooltipProvider>
      </div>
      <div className="flex h-full w-full flex-col sm:w-auto">
        <input
          type={type}
          id={id}
          disabled={disabled}
          {...register(id, { ...register_options })}
          {...id && { name: id }}
          onChange={(e) => {
            const value = e.target.value
            const filtredValue = value.replace(/[^\d,]/g, '')

            const parts= filtredValue.split(',')
            const finalValue =
              parts.length > 2 ? parts[0] + ',' + parts.slice(1).join('') : filtredValue

            id.onChange(finalValue)
          }}
          className={`bg-background-50 text-text-950 border-background-200 focus:ring-accent-400 h-16 w-full border p-2 text-xl transition-all duration-300 focus:ring-2 focus:outline-none sm:h-full sm:w-64 ${error ? 'border-red-500' : ''} ${className}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  )
}

export default Input
