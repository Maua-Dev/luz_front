import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Home } from '@/app/pages/home'
import { HowToUseDrawer } from '@/app/pages/how-to-use'
import { DrawerInformation, TesteTela } from '@/app/pages/iformation'
import { DrawerProvider } from '@/app/contexts/Drawer-context'

export function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-use" element={<HowToUseDrawer />} />
        <Route path="/information" element={<DrawerProvider><TesteTela /></DrawerProvider>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}
