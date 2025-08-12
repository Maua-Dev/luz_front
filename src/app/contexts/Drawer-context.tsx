import { AnimatePresence, motion } from 'motion/react'
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react'

interface DrawerContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  component: ReactNode
  setComponent: Dispatch<SetStateAction<ReactNode>>
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined)

const DrawerContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [component, setComponent] = useState<ReactNode>(null)

  return (
    <DrawerContext.Provider
      value={{ isOpen, setIsOpen, component, setComponent }}
    >
      <AnimatePresence>
        <motion.div>{component}</motion.div>
      </AnimatePresence>
      {children}
    </DrawerContext.Provider>
  )
}

export { DrawerContextProvider, DrawerContext }
