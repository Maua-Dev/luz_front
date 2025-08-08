import { DrawerContext } from "@/app/contexts/Drawer-context";
import { HowToUseDrawer } from "@/app/pages/howToUseDrawer";
import { InformationDrawer } from "@/app/pages/informationDrawer";
import { TableDrawer } from "@/app/pages/tableDrawer";
import { Menu } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  /* TODO: 
    - Map the links to a configuration object or array for better scalability,
    - Add active link styles based on the current opened drawer,
    - Implement the drawer functionality to toggle the visibility of the menu items.
    */
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
        <li className="text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300">
          <div onClick={() => {
            drawerContext?.setIsOpen(true);
            drawerContext?.setComponent(<InformationDrawer />)
          }}>Princípios</div>
        </li>
        <li className="text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300">
          <div onClick={() => {
            drawerContext?.setIsOpen(true);
            drawerContext?.setComponent(<TableDrawer />)
          }}>Tabela</div>
        </li>
        <li className="text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300">
          <Link to={``}>Saiba mais</Link>
        </li>
      </ul>
      <Menu className="text-white cursor-pointer sm:hidden"/>
    </nav>
  )
}

export default Navbar
