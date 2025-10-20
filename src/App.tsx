// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TrackingPage from './pages/tracking/TrackingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tracking/:code" element={<TrackingPage />} />
    </Routes>
  )
}

export default App