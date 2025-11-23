import { useEffect } from 'react'
import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import HomePage from './pages/HomePage'
import TrackingPage from './pages/tracking/TrackingPage'
import TrackingPageG5 from './pages/tracking/TrackingPageG5'
import IntranetLayout from './pages/intranet/IntranetLayout'

function App() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { logout, isAuthenticated } = useAuth() // Necesitamos el estado y la función

  // EFECTO DE SEGURIDAD: Detecta orden de cierre de sesión externa
  useEffect(() => {
    const action = searchParams.get('action')
    
    // Si la URL dice "logout", cerramos sesión forzosamente
    if (action === 'logout') {
      if (isAuthenticated) {
        console.log("Orden de cierre de sesión externo recibida.")
        logout().then(() => {
          // Una vez cerrado, limpiamos la URL para que quede bonita
          navigate('/', { replace: true })
        })
      } else {
        // Si ya estaba cerrada la sesión, solo limpiamos la URL
        navigate('/', { replace: true })
      }
    }
  }, [searchParams, logout, navigate, isAuthenticated])

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