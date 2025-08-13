import { Drawer, DrawerContent, DrawerTopbar } from '@/app/components/drawer'
import { DrawerContext } from '@/app/contexts/Drawer-context'
import { AnimatePresence } from 'motion/react'
import { useContext } from 'react'

function Table() {
  return (
    <AnimatePresence>
      <main className="px-10 py-5">
        <div className="flex h-150 w-87 items-center justify-center border-1 border-black/30 md:w-100">
          <div className="text-black/30">(Em desenvolvimento)</div>
        </div>
      </main>
    </AnimatePresence>
  )
}
export function TableDrawer() {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('InformationDrawer must be used within a DrawerContex')
  }
  return (
    <Drawer isOpen={context.isOpen} setIsOpen={context.setIsOpen}>
      <DrawerContent>
        <DrawerTopbar>Tabela</DrawerTopbar>
        <Table />
      </DrawerContent>
    </Drawer>
  )
}
