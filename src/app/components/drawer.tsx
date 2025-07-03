import { AnimatePresence, motion } from 'framer-motion'
import {
    createContext,
    useContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from 'react'
import { X } from 'react-feather'
import { DrawerContext, DrawerProvider, useDrawer } from '@/app/contexts/Drawer-context'

// interface DrawerContext {
//   isOpen: boolean
//   setIsOpen: Dispatch<SetStateAction<boolean>>
// }

// const DrawerContext = createContext<DrawerContext | undefined>(undefined)

function Drawer({ children }: { children: ReactNode }) {
    const context = useContext(DrawerContext)

    if (!context) {
        throw new Error('Drawer must be used within a DrawerProvider')
    }

    return (
        <AnimatePresence>
            {context.isOpen && (
                <motion.div
                    ref={(el) => {
                        if (el) {
                            el.addEventListener('click', (e) => {
                                if (e.target === el) {
                                    context.setIsOpen(false)
                                }
                            })
                        }
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="fixed top-0 right-0 w-full h-full bg-black/40 z-50"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
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
            className="fixed top-0 right-0 w-6/7 md:w-2xl lg:w-1/3 h-full bg-white z-50 flex flex-col overflow-y-auto"
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
        <div className="pt-8 ml-10 mr-10 justify-between items-center flex border-b pb-1 flex-shrink-0">
            <p className="text-xl text-black borde">{children}</p>

            <button
                className="text-black hover:text-accent-500 transition-colors duration-300 cursor-pointer"
                onClick={() => context.setIsOpen(false)}
            >
                <X size={24} />
            </button>
        </div>
    )
}

function OpenDrawer() {
    const context = useContext(DrawerContext)
    if (!context) {
        throw new Error('DrawerTopbar must be used within a Drawer')
    }
    context.setIsOpen(true);
}

export { Drawer, DrawerContent, DrawerTopbar, OpenDrawer }