// src/pages/tracking/components/TrackingHeader.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface TrackingHeaderProps {
  trackingCode: string
  basePath?: string // Nueva propiedad para definir la ruta de búsqueda
}

export default function TrackingHeader({ trackingCode, basePath = '/tracking' }: TrackingHeaderProps) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`${basePath}/${search.trim().toUpperCase()}`)
      setSearch('')
    }
  }

  return (
    <div className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Link to="/" className="text-gray-500 hover:text-[#ff6b35] transition-colors p-2 hover:bg-orange-50 rounded-full">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-[#1a1a2e]">
                {basePath === '/tracking-g5' ? 'Seguimiento Equipo 1' : 'Seguimiento de Pedido'}
              </h1>
              <p className="text-xs text-gray-500 font-medium">Orden <span className="uppercase">#{trackingCode}</span></p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={basePath === '/tracking-g5' ? "Buscar otro (Ej: EMP-1)" : "Buscar otro (Ej: LC-2024...)"}
              // 1. CAMBIO AQUÍ: aumentamos pr-4 a pr-12 para que el texto no se escriba debajo del botón
              className="w-full pl-10 pr-12 py-2.5 bg-gray-100 border-transparent focus:bg-white border-2 rounded-xl focus:border-[#ff6b35] focus:outline-none transition-all uppercase text-sm font-medium text-[#1a1a2e]"
            />

            {/* Icono decorativo de la izquierda (sin cambios) */}
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

            {/* 2. NUEVO: Botón integrado a la derecha */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#ff6b35] text-white rounded-lg hover:bg-[#e85d2e] transition-colors shadow-sm"
              aria-label="Buscar"
            >
              <FaArrowRight className="text-sm" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}