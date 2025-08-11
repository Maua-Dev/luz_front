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
    <div className="flex h-16 flex-row items-center justify-between gap-x-8 ">
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
      <div className='flex flex-col '>
        <input
          type={type}
          id={id}
          disabled={disabled}
          {...register(id, { ...register_options })}
          className={`bg-background-50 text-text-950 border-background-200 focus:ring-accent-400 h-full w-50 md:w-64 border p-2 text-xl transition-all duration-300 focus:ring-2 focus:outline-none ${error? 'border-red-500/70 border-background-red-500/70 focus:ring-red-500/70': 'border border-background-200 focus:ring-accent-400'}`}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {error && <span className="text-xs text-red-500 py-1">{error}</span>}
      </div>
    </div>
  )
}

export default Input
