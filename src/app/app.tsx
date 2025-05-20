import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Home } from '@/app/pages/home'

export function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}
