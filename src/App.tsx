// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TrackingPage from './pages/tracking/TrackingPage'
import IntranetLayout from './pages/intranet/IntranetLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tracking/:code" element={<TrackingPage />} />
      <Route path="/intranet/*" element={<IntranetLayout />} />
    </Routes>
  )
}

export default App