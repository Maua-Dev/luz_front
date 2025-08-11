import { Link } from "react-router-dom"
import { useContext, useEffect, useState, type RefObject } from "react";
import { DrawerContext, DrawerContextProvider } from "@/app/contexts/Drawer-context";
import { InformationDrawer } from "@/app/pages/informationDrawer";
import { HowToUseDrawer } from "@/app/pages/howToUseDrawer";
import { InformationDrawer } from "@/app/pages/informationDrawer";
import { TableDrawer } from "@/app/pages/tableDrawer";
import { Menu } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Drawer, DrawerContent } from "@/app/components/drawer";

function NavbarLinks(){
  const drawerContext = useContext(DrawerContext)

  return (
    <nav className="bg-background-900 flex h-20 w-full flex-row items-center justify-between sm:justify-start gap-x-8 px-8 sticky top-0 z-50">
      <img src="icon.svg" alt="Logo" className="h-10" />
      <ul className="hidden sm:flex flex-row items-center justify-start gap-x-8 text-base">
        <li className="text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300">
          <div onClick={() => {
            drawerContext?.setIsOpen(true);
            drawerContext?.setComponent(<HowToUseDrawer />)
          }}>Home</div>
        </li>
        <li className="md:text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300 text-2xl md:text-base">
          <div onClick={() => {
            drawerContext?.setIsOpen(true);
            drawerContext?.setComponent(<InformationDrawer />)
          }}>Princípios</div>
        </li>
        <li className="md:text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300 text-2xl md:text-base">
          <div onClick={() => {
            drawerContext?.setIsOpen(true);
            drawerContext?.setComponent(<TableDrawer />)
          }}>Tabela</div>
        </li>
        <li className="md:text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300 text-2xl md:text-base">
          <Link to={``}>Saiba mais</Link>
        </li>
      </ul>
    </div>
  )
}

function NavbarDrawer(){
  const context = useContext(DrawerContext)
  if (!context) {
      throw new Error('NavbarDrawer must be used within a DrawerContex')
  }
  return (
      <Drawer isOpen={context.isOpen} setIsOpen={context.setIsOpen}>
          <DrawerContent>
              <NavbarLinks/>
          </DrawerContent>
      </Drawer>
  )
}

function Navbar() {
  /* TODO: 
    - Map the links to a configuration object or array for better scalability,
    - Add active link styles based on the current opened drawer,
    - Implement the drawer functionality to toggle the visibility of the menu items.
    */
  const drawerContext = useContext(DrawerContext)

  return (
    <nav className="bg-background-900 flex h-20 w-full flex-row justify-between md:justify-start items-center gap-x-8 px-8 sticky top-0 z-50">
      <img src="icon.svg" alt="Logo" className="h-10" />
      <NavbarLinks/>
      <button className="text-text-50 text-xl md:hidden cursor-pointer" onClick={() =>{
        drawerContext?.setIsOpen(true)
        drawerContext?.setComponent(<NavbarDrawer/>)
      }}>
        <Menu />
      </button>
    </nav>
  )
}

export default Navbar
