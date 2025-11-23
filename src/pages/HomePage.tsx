// src/pages/HomePage.tsx
import { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getCookie } from '../utils/cookies'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Loader from '../components/Loader' // Usamos el nuevo componente universal

const Services = lazy(() => import('../components/Services'))
const Machinery = lazy(() => import('../components/Machinery'))
const Reception = lazy(() => import('../components/Reception'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading } = useAuth()
  
  // Estados de carga
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  // 1. Lógica de precarga de imagen y temporizador
  useEffect(() => {
    // A. Temporizador mínimo de 1 segundo
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 1000)

    // B. Precargar imagen del Hero
    const img = new Image()
    img.src = "/images/hero/lavanderia-principal.png" // La ruta exacta de tu imagen Hero
    
    img.onload = () => {
      setHeroImageLoaded(true)
    }
    
    // Fallback por si la imagen falla, para no quedar cargando eternamente
    img.onerror = () => {
      console.warn("No se pudo precargar la imagen del hero")
      setHeroImageLoaded(true)
    }

    return () => clearTimeout(timer)
  }, [])

  // La página está cargando si: 
  // 1. Autenticación no lista O 
  // 2. Imagen no cargada O 
  // 3. Tiempo mínimo no cumplido
  const isPageLoading = authLoading || !heroImageLoaded || !minTimeElapsed
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  useEffect(() => {
    if (!authLoading) {
      const rememberUser = getCookie('rememberUser')
      if (rememberUser === 'true' && isAuthenticated) {
        navigate('/intranet/dashboard', { replace: true })
      }
    }
  }, [authLoading, isAuthenticated, navigate])

  useEffect(() => {
    const sections = ['servicios', 'maquinaria', 'recepcion', 'contacto']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) window.history.replaceState(null, '', `#${id}`)
          }
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Loader Global Inteligente */}
      <Loader fullScreen isLoading={isPageLoading} />

      <div className={`min-h-screen bg-white transition-opacity duration-700 ${isPageLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar scrollToSection={scrollToSection} />
        <Hero scrollToSection={scrollToSection} />
        
        <Suspense fallback={<Loader />}>
          <Services />
          <Machinery />
          <Reception />
          <Contact />
          <Footer scrollToSection={scrollToSection} />
        </Suspense>
      </div>
    </>
  )
}