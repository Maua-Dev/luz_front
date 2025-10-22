import { AnimatePresence, motion } from 'motion/react'
import {
  createContext,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction
} from 'react'

interface TooltipProps {
  children: ReactNode
}

interface TooltipContextTypes {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  ref: RefObject<HTMLDivElement | null>
}

const TooltipContext = createContext<TooltipContextTypes | undefined>(undefined)

function TooltipProvider({ children }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen, ref }}>
      {children}
    </TooltipContext.Provider>
  )
}

function TooltipTrigger({ children }: { children: ReactNode }) {
  const { setIsOpen, ref } = useContext(TooltipContext) as TooltipContextTypes

  function handleMouseEnter() {
    setIsOpen(true)
  }

  function handleMouseLeave() {
    setIsOpen(false)
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

function TooltipContent({ children }: TooltipProps) {
  const { isOpen, ref } = useContext(TooltipContext) as TooltipContextTypes

  if (!ref.current) {
    return null // Ensure ref is defined before rendering
  }

  // Simple mobile detection
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640

  const tooltipPosition = isMobile
    ? {
        top: ref.current.offsetTop + ref.current.offsetHeight,
        right: 0,
        left: 'auto'
      }
    : {
        top: ref.current.offsetTop + ref.current.offsetHeight,
        left: ref.current.offsetLeft
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -55 }}
          animate={{ opacity: 1, y: -60 }}
          exit={{ opacity: 0, y: -55 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            right: tooltipPosition.right,
            zIndex: 50
          }}
          className="bg-background-800 w-fit rounded p-2 text-nowrap text-white drop-shadow-lg"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { TooltipContent, TooltipProvider, TooltipTrigger }
