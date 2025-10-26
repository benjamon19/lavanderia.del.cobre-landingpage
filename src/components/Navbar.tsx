// src/components/Navbar.tsx
import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaUser, FaSearch } from 'react-icons/fa'
import Login from './Login'
import TrackingModal from './TrackingModal'

interface NavbarProps {
  scrollToSection: (id: string) => void
}

export default function Navbar({ scrollToSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [trackingOpen, setTrackingOpen] = useState(false)
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
    { label: 'Contacto', id: 'contacto' }
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/40 backdrop-blur-xl border-b border-white/20 shadow-lg ${
          scrolled 
            ? 'bg-white/60 shadow-xl' 
            : ''
        }`}
        style={{
          background: scrolled 
            ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.5))' 
            : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))'
        }}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-16 xl:h-18 2xl:h-20">
            {/* Logo - Adaptativo según tamaño */}
            <button 
              className="flex items-center cursor-pointer group flex-shrink-0" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Ir al inicio"
            >
              {/* Logo imagen */}
              <img 
                src="/logo.png" 
                alt="Lavandería el Cobre" 
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 object-contain transition-all group-hover:scale-105"
              />
              
              {/* Texto completo - oculto en móvil pequeño */}
              <span className="ml-2 text-sm lg:text-base xl:text-base 2xl:text-lg font-bold text-[#1a1a2e] hidden min-[500px]:hidden sm:hidden md:hidden lg:block xl:block">
                Lavandería el Cobre
              </span>
              
              {/* Texto mediano - visible en tablets */}
              <span className="ml-2 text-sm font-bold text-[#1a1a2e] hidden min-[500px]:hidden sm:hidden md:block lg:hidden">
                Lavandería el Cobre
              </span>
              
              {/* Texto corto - visible en móviles medianos */}
              <span className="ml-2 text-sm font-bold text-[#1a1a2e] hidden min-[500px]:block sm:block md:hidden">
                Lav. el Cobre
              </span>
            </button>

            {/* Desktop Menu - Se oculta en pantallas más pequeñas */}
            <div className="hidden xl:flex items-center gap-5 2xl:gap-8">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleScroll(item.id)} 
                  className="text-[#2c2c3e] hover:text-[#ff6b35] font-semibold transition-colors text-sm xl:text-sm 2xl:text-base relative group px-2"
                  aria-label={`Ir a ${item.label}`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff6b35] transition-all group-hover:w-full" aria-hidden="true"></span>
                </button>
              ))}
              <button
                onClick={() => setTrackingOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white px-4 xl:px-5 2xl:px-6 py-2 xl:py-2 2xl:py-2.5 rounded-xl hover:shadow-lg transition-all font-semibold text-sm xl:text-sm 2xl:text-base transform hover:-translate-y-0.5"
                aria-label="Seguimiento de pedido"
              >
                <FaSearch className="text-xs xl:text-xs 2xl:text-sm" aria-hidden="true" /> Seguimiento
              </button>
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 text-[#2c2c3e] hover:text-[#ff6b35] font-semibold transition-all text-sm xl:text-sm 2xl:text-base border-2 border-[#cfcfd8] hover:border-[#ff6b35] px-4 xl:px-4 2xl:px-5 py-2 xl:py-2 2xl:py-2.5 rounded-xl"
                aria-label="Iniciar sesión"
              >
                <FaUser className="text-xs xl:text-xs 2xl:text-sm" aria-hidden="true" /> Login
              </button>
            </div>

            {/* Tablet/Desktop reducido Menu - visible entre lg y xl */}
            <div className="hidden lg:flex xl:hidden items-center gap-3">
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
                onClick={() => setTrackingOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white px-3 py-1.5 rounded-xl hover:shadow-lg transition-all font-semibold text-sm transform hover:-translate-y-0.5"
                aria-label="Seguimiento de pedido"
              >
                <FaSearch className="text-xs" aria-hidden="true" />
              </button>
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 text-[#2c2c3e] hover:text-[#ff6b35] font-semibold transition-all text-sm border-2 border-[#cfcfd8] hover:border-[#ff6b35] px-3 py-1.5 rounded-xl"
                aria-label="Iniciar sesión"
              >
                <FaUser className="text-xs" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Menu Button - visible solo en móvil y tablets pequeños */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100/50 text-[#1a1a2e] hover:text-[#ff6b35] transition-colors"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Mismo estilo que navbar */}
        {menuOpen && (
          <div 
            id="mobile-menu"
            className={`lg:hidden animate-slideUp backdrop-blur-xl border-t border-white/20 shadow-lg transition-all duration-300 ${
              scrolled 
                ? 'bg-white/60' 
                : 'bg-white/40'
            }`}
            style={{
              background: scrolled 
                ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.5))' 
                : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))'
            }}
            role="menu"
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleScroll(item.id)} 
                  className="block w-full text-left px-4 py-2.5 text-[#2c2c3e] hover:bg-white/60 hover:text-[#ff6b35] font-semibold rounded-lg my-1 transition-all text-sm"
                  role="menuitem"
                  aria-label={`Ir a ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setTrackingOpen(true)
                  setMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2.5 mt-3 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white hover:shadow-lg font-semibold rounded-lg flex items-center gap-2 transition-all text-sm"
                role="menuitem"
                aria-label="Seguimiento de pedido"
              >
                <FaSearch className="text-xs" aria-hidden="true" /> Seguimiento
              </button>
              <button
                onClick={() => {
                  setLoginOpen(true)
                  setMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2.5 mt-2 border-2 border-[#cfcfd8] hover:border-[#ff6b35] text-[#2c2c3e] hover:text-[#ff6b35] bg-white/40 hover:bg-white/70 font-semibold rounded-lg flex items-center gap-2 transition-all text-sm"
                role="menuitem"
                aria-label="Iniciar sesión"
              >
                <FaUser className="text-xs" aria-hidden="true" /> Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modal Login */}
      <Login isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      
      {/* Modal Seguimiento */}
      <TrackingModal isOpen={trackingOpen} onClose={() => setTrackingOpen(false)} />
    </>
  )
}