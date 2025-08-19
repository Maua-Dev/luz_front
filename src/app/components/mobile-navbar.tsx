import { AnimatePresence, motion } from 'framer-motion'
import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react'
import { X } from 'react-feather'

interface DrawerNavbarContext {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const DrawerNavbarContext = createContext<DrawerNavbarContext | undefined>(
  undefined
)

function DrawerNavbar({
  children,
  isOpen,
  setIsOpen
}: {
  children: ReactNode
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <DrawerNavbarContext.Provider value={{ isOpen, setIsOpen }}>
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
    </DrawerNavbarContext.Provider>
  )
}

function DrawerNavbarContent({ children }: { children: ReactNode }) {
  const context = useContext(DrawerNavbarContext)
  if (!context) {
    throw new Error('DrawerNavbarContent must be used within a Drawer')
  }
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="bg-background-900 fixed top-0 right-0 z-100 flex h-full w-6/7 flex-col overflow-y-auto md:w-2xl lg:w-1/3"
    >
      {children}
    </motion.div>
  )
}

function DrawerNavbarTopbar() {
  const context = useContext(DrawerNavbarContext)
  if (!context) {
    throw new Error('DrawerNavbarTopbar must be used within a Drawer')
  }

  return (
    <div className="mr-10 ml-10 flex flex-shrink-0 items-center justify-end pt-8 pb-1">
      <button
        className="hover:text-accent-500 text-text-50 cursor-pointer transition-colors duration-300"
        onClick={() => context.setIsOpen(false)}
      >
        <X size={24} />
      </button>
    </div>
  )
}

export { DrawerNavbar, DrawerNavbarContent, DrawerNavbarTopbar }
