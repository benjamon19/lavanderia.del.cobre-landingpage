// src/App.tsx
import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const Services = lazy(() => import('./components/Services'))
const Machinery = lazy(() => import('./components/Machinery'))
const Reception = lazy(() => import('./components/Reception'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  // Scroll spy - detecta qué sección está visible y actualiza la URL
  useEffect(() => {
    const sections = ['servicios', 'maquinaria', 'recepcion', 'contacto']
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) {
              window.history.replaceState(null, '', `#${id}`)
            }
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

  // Maneja el hash inicial de la URL al cargar la página
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        element?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
        </div>
      }>
        <Services />
        <Machinery />
        <Reception />
        <Contact />
        <Footer scrollToSection={scrollToSection} />
      </Suspense>
    </div>
  )
}

export default App