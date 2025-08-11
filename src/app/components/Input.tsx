import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/app/components/Tooltip';
import type { IInput } from '@/app/interfaces/IInput';
import { Info } from 'react-feather';

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
    <div className="flex h-fit sm:h-16 flex-col sm:flex-row items-center justify-between gap-x-8 gap-y-8">
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
      <div className='flex flex-col h-full w-full sm:w-auto'>
        <input
          type={type}
          id={id}
          disabled={disabled}
          {...register(id, { ...register_options })}
          className={`bg-background-50 text-text-950 border-background-200 focus:ring-accent-400 h-16 sm:h-full w-full sm:w-64 border p-2 text-xl transition-all duration-300 focus:ring-2 focus:outline-none ${error ? 'border-red-500' : ''} ${className}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  )
}

export default Input
