// src/pages/HomePage.tsx
import { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getCookie } from '../utils/cookies'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Loader from '../components/Loader'

// Importación diferida de componentes pesados (Lazy Loading)
const Services = lazy(() => import('../components/Services'))
const Machinery = lazy(() => import('../components/Machinery'))
const Reception = lazy(() => import('../components/Reception'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading } = useAuth()
  
  // Estados de carga de la página
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  // 1. Lógica de precarga de imagen y temporizador
  useEffect(() => {
    // A. Temporizador mínimo de 1 segundo para evitar parpadeos
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 1000)

    // B. Precargar imagen del Hero (Versión optimizada WebP)
    const img = new Image()
    img.src = "/images/hero/lavanderia-principal.webp" 
    
    img.onload = () => {
      setHeroImageLoaded(true)
    }
    
    // Fallback: Si la imagen falla, quitamos el loader igual para no bloquear al usuario
    img.onerror = () => {
      console.warn("No se pudo precargar la imagen del hero (verifica la ruta o extensión .webp/.png)")
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

  // Redirección si ya está logueado
  useEffect(() => {
    if (!authLoading) {
      const rememberUser = getCookie('rememberUser')
      if (rememberUser === 'true' && isAuthenticated) {
        navigate('/intranet/dashboard', { replace: true })
      }
    }
  }, [authLoading, isAuthenticated, navigate])

  // Observer para actualizar la URL al hacer scroll
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
      {/* Loader Global que cubre toda la pantalla al inicio */}
      <Loader fullScreen isLoading={isPageLoading} />

      {/* Contenido de la página con transición de opacidad */}
      <div className={`min-h-screen bg-white transition-opacity duration-700 ${isPageLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar scrollToSection={scrollToSection} />
        
        {/* Hero se carga normal porque es vital para el LCP (Largest Contentful Paint) */}
        <Hero scrollToSection={scrollToSection} />
        
        {/* El resto de componentes se cargan bajo demanda */}
        <Suspense fallback={<div className="py-20 flex justify-center"><Loader /></div>}>
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