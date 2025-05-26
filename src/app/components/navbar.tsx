function Navbar() {
  /* TODO: 
    - Map the links to a configuration object or array for better scalability,
    - Add active link styles based on the current opened drawer,
    - Implement the drawer functionality to toggle the visibility of the menu items.
    */

  return (
    <nav className="bg-background-900 flex h-20 w-full flex-row items-center gap-x-8 rounded-sm px-8">
      <img src="icon.svg" alt="Logo" className="h-10" />
      <ul className="flex flex-row items-center justify-start gap-x-8 text-base">
        <li className="text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300">
          Home
        </li>
        <li className="text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300">
          Princípios
        </li>
        <li className="text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300">
          Tabela
        </li>
        <li className="text-text-50 hover:text-accent-400 cursor-pointer transition-colors duration-300">
          Saiba mais
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
