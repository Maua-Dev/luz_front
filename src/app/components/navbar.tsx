import {
  DrawerNavbar,
  DrawerNavbarContent,
  DrawerNavbarTopbar
} from '@/app/components/mobile-navbar'
import { DrawerContext } from '@/app/contexts/Drawer-context'
import { HowToUseDrawer } from '@/app/pages/drawer_pages/howToUseDrawer'
import { InformationDrawer } from '@/app/pages/drawer_pages/informationDrawer'
import { TableDrawer } from '@/app/pages/drawer_pages/tableDrawer'
import { Menu } from 'lucide-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function NavbarLinks() {
  const drawerContext = useContext(DrawerContext)

  return (
    <div className="top-[-100%] min-h-[60vh] md:static md:min-h-fit">
      <ul className="flex h-full flex-col items-center justify-evenly gap-x-8 text-base md:flex-row">
        <li className="text-text-50 hover:text-accent-400 cursor-pointer text-2xl transition-colors duration-300 md:text-base">
          <div
            onClick={() => {
              drawerContext?.setIsOpen(true)

              drawerContext?.setComponent(<HowToUseDrawer />)
            }}
          >
            Home
          </div>
        </li>

        <li className="text-text-50 hover:text-accent-400 cursor-pointer text-2xl transition-colors duration-300 md:text-base">
          <div
            onClick={() => {
              drawerContext?.setIsOpen(true)

              drawerContext?.setComponent(<InformationDrawer />)
            }}
          >
            Princípios
          </div>
        </li>

        <li className="text-text-50 hover:text-accent-400 cursor-pointer text-2xl transition-colors duration-300 md:text-base">
          <div
            onClick={() => {
              drawerContext?.setIsOpen(true)

              drawerContext?.setComponent(<TableDrawer />)
            }}
          >
            Aplicação
          </div>
        </li>

        <li className="text-text-50 hover:text-accent-400 cursor-pointer text-2xl transition-colors duration-300 md:text-base">
          <Link to={``}>Saiba mais</Link>
        </li>
      </ul>
    </div>
  )
}

function NavbarDrawer() {
  const navbarContext = useContext(DrawerContext)
  if (!navbarContext) {
    throw new Error('NavbarDrawer must be used within a DrawerContex')
  }
  return (
    <DrawerNavbar
      isOpen={navbarContext.isOpen}
      setIsOpen={navbarContext.setIsOpen}
    >
      <DrawerNavbarContent>
        <DrawerNavbarTopbar></DrawerNavbarTopbar>
        <div className="flex flex-col py-5">
          <img src="icon.svg" alt="Logo" className="h-10" />
          <NavbarLinks />
        </div>
      </DrawerNavbarContent>
    </DrawerNavbar>
  )
}

function Navbar() {
  /* TODO: 
    - Map the links to a configuration object or array for better scalability,
    - Add active link styles based on the current opened drawer,
    - Implement the drawer functionality to toggle the visibility of the menu items.
    */
  const navbarContext = useContext(DrawerContext)
  return (
    <nav className="bg-background-900 sticky top-0 z-50 flex h-20 w-full flex-row items-center justify-between gap-x-8 px-8 md:justify-start">
      <img src="icon.svg" alt="Logo" className="h-10" />
      <NavbarLinks />
      <button
        className="text-text-50 cursor-pointer text-xl md:hidden"
        onClick={() => {
          navbarContext?.setIsOpen(true)
          navbarContext?.setComponent(<NavbarDrawer />)
        }}
      >
        <Menu />
      </button>
    </nav>
  )
}

export default Navbar
