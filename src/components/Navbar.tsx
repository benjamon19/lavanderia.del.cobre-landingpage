// src/components/Navbar.tsx
import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaUser } from 'react-icons/fa'
import Login from './Login'

interface NavbarProps {
  scrollToSection: (id: string) => void
}

export default function Navbar({ scrollToSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = (id: string) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  const menuItems = [
    { label: 'Servicios', id: 'servicios' },
    { label: 'Maquinaria', id: 'maquinaria' },
    { label: 'Recepción', id: 'recepcion' },
    { label: 'Transporte', id: 'transporte' }
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xl' 
            : 'bg-white shadow-md'
        }`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Logo - Adaptativo según tamaño */}
            <button 
              className="flex items-center cursor-pointer group flex-shrink-0" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Ir al inicio"
            >
              {/* Logo siempre visible */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <span className="text-white font-bold text-lg sm:text-xl" aria-hidden="true">LC</span>
              </div>
              
              {/* Texto completo - oculto en móvil pequeño */}
              <span className="ml-2 text-base font-bold text-[#1a1a2e] hidden min-[500px]:hidden sm:hidden md:hidden lg:block xl:block">
                Lavandería del Cobre
              </span>
              
              {/* Texto mediano - visible en tablets */}
              <span className="ml-2 text-base font-bold text-[#1a1a2e] hidden min-[500px]:hidden sm:hidden md:block lg:hidden">
                Lavandería del Cobre
              </span>
              
              {/* Texto corto - visible en móviles medianos */}
              <span className="ml-2 text-base font-bold text-[#1a1a2e] hidden min-[500px]:block sm:block md:hidden">
                Lav. del Cobre
              </span>
            </button>

            {/* Desktop Menu - Se oculta en pantallas más pequeñas */}
            <div className="hidden xl:flex items-center gap-6 2xl:gap-8">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleScroll(item.id)} 
                  className="text-[#2c2c3e] hover:text-[#ff6b35] font-semibold transition-colors text-sm xl:text-base relative group px-2"
                  aria-label={`Ir a ${item.label}`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] transition-all group-hover:w-full" aria-hidden="true"></span>
                </button>
              ))}
              <button 
                onClick={() => handleScroll('contacto')} 
                className="bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white px-5 xl:px-6 py-2 xl:py-2.5 rounded-xl hover:shadow-lg transition-all font-semibold text-sm xl:text-base transform hover:-translate-y-0.5"
                aria-label="Ir a contacto"
              >
                Contacto
              </button>
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 text-[#2c2c3e] hover:text-[#ff6b35] font-semibold transition-all text-sm xl:text-base border-2 border-[#cfcfd8] hover:border-[#ff6b35] px-4 xl:px-5 py-2 xl:py-2.5 rounded-xl"
                aria-label="Iniciar sesión"
              >
                <FaUser className="text-xs xl:text-sm" aria-hidden="true" /> Login
              </button>
            </div>

            {/* Tablet/Desktop reducido Menu - visible entre lg y xl */}
            <div className="hidden lg:flex xl:hidden items-center gap-4">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleScroll(item.id)} 
                  className="text-[#2c2c3e] hover:text-[#ff6b35] font-semibold transition-colors text-sm relative group px-1"
                  aria-label={`Ir a ${item.label}`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] transition-all group-hover:w-full" aria-hidden="true"></span>
                </button>
              ))}
              <button 
                onClick={() => handleScroll('contacto')} 
                className="bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all font-semibold text-sm transform hover:-translate-y-0.5"
                aria-label="Ir a contacto"
              >
                Contacto
              </button>
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 text-[#2c2c3e] hover:text-[#ff6b35] font-semibold transition-all text-sm border-2 border-[#cfcfd8] hover:border-[#ff6b35] px-3 py-2 rounded-xl"
                aria-label="Iniciar sesión"
              >
                <FaUser className="text-xs" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Menu Button - visible solo en móvil y tablets pequeños */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 sm:p-3 rounded-xl hover:bg-[#fff4f0] text-[#1a1a2e] hover:text-[#ff6b35] transition-colors"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <HiX className="w-6 h-6 sm:w-7 sm:h-7" /> : <HiMenu className="w-6 h-6 sm:w-7 sm:h-7" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div 
              id="mobile-menu"
              className="lg:hidden pb-4 border-t border-gray-200 mt-2 animate-slideUp"
              role="menu"
            >
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleScroll(item.id)} 
                  className="block w-full text-left px-4 py-3.5 text-[#2c2c3e] hover:bg-[#fff4f0] hover:text-[#ff6b35] font-semibold rounded-lg my-1 transition-all"
                  role="menuitem"
                  aria-label={`Ir a ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => handleScroll('contacto')} 
                className="w-full text-left px-4 py-3.5 mt-3 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white hover:shadow-lg font-semibold rounded-xl transition-all"
                role="menuitem"
                aria-label="Ir a contacto"
              >
                Contacto
              </button>
              <button
                onClick={() => {
                  setLoginOpen(true)
                  setMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3.5 mt-2 border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#fff4f0] font-semibold rounded-xl flex items-center gap-2 transition-all"
                role="menuitem"
                aria-label="Iniciar sesión"
              >
                <FaUser aria-hidden="true" /> Login
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Modal Login */}
      <Login isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}