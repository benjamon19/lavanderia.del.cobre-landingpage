// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TrackingPage from './pages/tracking/TrackingPage'
import TrackingPageG5 from './pages/tracking/TrackingPageG5'
import IntranetLayout from './pages/intranet/IntranetLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tracking/:code" element={<TrackingPage />} />
      <Route path="/tracking-g5/:code" element={<TrackingPageG5 />} />
      <Route path="/intranet/*" element={<IntranetLayout />} />
    </Routes>
  )
}

export default App