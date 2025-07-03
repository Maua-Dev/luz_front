import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"

interface DrawerContext {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  toggleDrawer: () => void
}

const DrawerContext = createContext<DrawerContext | undefined>(undefined);

const DrawerProvider = ({children}: {children : ReactNode}) =>{
  const [isOpen, setIsOpen]= useState(false)
  
  const toggleDrawer = () =>{
    setIsOpen(prev => !prev);
  }


  return <DrawerContext.Provider value={{ isOpen, setIsOpen, toggleDrawer}}>{children}</DrawerContext.Provider>;
};

const useDrawer = (): DrawerContext => {
  const context = useContext(DrawerContext)
  
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider')
  }
  
  return context
}
export{DrawerProvider, DrawerContext, useDrawer}
