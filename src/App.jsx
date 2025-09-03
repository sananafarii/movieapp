import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import CTA from './components/layout/CTA'
import PlayerPage from './pages/PlayerPage'

function App() {
  return (
    <Router>
      <div className="min-h-full" style={{ background: '#111216' }}>
        <Navbar />
        <CTA />
        <Routes>
          <Route path="/" element={<PlayerPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
