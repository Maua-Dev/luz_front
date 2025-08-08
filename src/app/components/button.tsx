import type { ReactNode } from 'react'
import { Loader } from 'react-feather'

interface ButtonProps {
  type: HTMLButtonElement['type']
  children: ReactNode
  disabled?: boolean
  loading?: boolean
  className?: string
  onClick?: () => void
}

function Button({
  children,
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`text-text-50 bg-accent-500 hover:bg-accent-600 w-full sm:min-w-64 sm:w-fit items-center justify-center rounded-sm px-10 py-4 text-2xl transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <Loader className="text-text-50 animate-spin" size={20} />
      ) : (
        children
      )}
    </button>
  )
}

export default Button
