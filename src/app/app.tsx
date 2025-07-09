import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Home } from '@/app/pages/home'
import { DrawerContextProvider } from '@/app/contexts/Drawer-context'

export function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<DrawerContextProvider><Home /></DrawerContextProvider>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}
