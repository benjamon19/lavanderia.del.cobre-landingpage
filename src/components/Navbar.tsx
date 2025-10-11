// src/components/Navbar.tsx
import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

interface NavbarProps {
  scrollToSection: (id: string) => void
}

export default function Navbar({ scrollToSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

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
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">LC</span>
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900 hidden sm:block">Lavandería del Cobre</span>
            <span className="ml-2 text-lg font-bold text-gray-900 sm:hidden">LC</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleScroll(item.id)} 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleScroll('contacto')} 
              className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm"
            >
              Contacto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-orange-50 text-gray-700"
          >
            {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleScroll(item.id)} 
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 font-medium"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleScroll('contacto')} 
              className="w-full text-left px-4 py-3 mt-2 bg-orange-600 text-white hover:bg-orange-700 font-medium rounded-lg mx-0"
            >
              Contacto
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}