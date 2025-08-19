import { AnimatePresence, motion } from 'framer-motion'
import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react'
import { X } from 'react-feather'

interface DrawerContext {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const DrawerContext = createContext<DrawerContext | undefined>(undefined)

function Drawer({
  children,
  isOpen,
  setIsOpen
}: {
  children: ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <DrawerContext.Provider value={{ isOpen, setIsOpen }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={(el) => {
              if (el) {
                el.addEventListener('click', (e) => {
                  if (e.target === el) {
                    setIsOpen(false)
                  }
                })
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 z-100 h-full w-full bg-black/40"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </DrawerContext.Provider>
  )
}

function DrawerContent({ children }: { children: ReactNode }) {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('DrawerContent must be used within a Drawer')
  }
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 z-100 flex h-full w-6/7 flex-col overflow-y-auto bg-background-900 md:w-2xl lg:w-1/3"
    >
      {children}
    </motion.div>
  )
}

function DrawerTopbar({ children }: { children: ReactNode }) {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('DrawerTopbar must be used within a Drawer')
  }

  return (
    <div className="mr-10 ml-10 flex flex-shrink-0 items-center justify-between border-b border-text-50 pt-8 pb-1">
      <p className="text-xl text-text-50">{children}</p>

      <button
        className="hover:text-accent-500 cursor-pointer text transition-colors duration-300 text-text-50"
        onClick={() => context.setIsOpen(false)}
      >
        <X size={24} />
      </button>
    </div>
  )
}

export { Drawer, DrawerContent, DrawerTopbar }
