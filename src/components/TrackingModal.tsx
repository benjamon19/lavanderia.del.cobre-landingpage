// src/components/TrackingModal.tsx
import { useState } from 'react'
import { FaTimes, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface TrackingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TrackingModal({ isOpen, onClose }: TrackingModalProps) {
  const [trackingCode, setTrackingCode] = useState('')
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingCode.trim()) {
      const code = trackingCode.trim().toUpperCase()
      onClose()
      navigate(`/tracking/${code}`)
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracking-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6b6b7e] hover:text-[#1a1a2e] transition-colors z-10"
          aria-label="Cerrar ventana de seguimiento"
        >
          <FaTimes className="text-2xl" />
        </button>

        <div className="bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] text-white p-10 rounded-t-3xl">
          <div 
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            aria-hidden="true"
          >
            <FaSearch className="text-4xl" />
          </div>
          <h2 id="tracking-title" className="text-3xl font-bold text-center">Seguimiento</h2>
          <p className="text-[#ffe8e0] text-center mt-2">Rastrea tu pedido</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <label htmlFor="tracking-code" className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              Código de Seguimiento
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e]" aria-hidden="true" />
              <input
                type="text"
                id="tracking-code"
                name="trackingCode"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Ej: LC-2024-12345"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-[#cfcfd8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e] uppercase"
                required
              />
            </div>
            <p className="text-xs text-[#6b6b7e] mt-2">
              Ingresa el código que recibiste al dejar tu pedido
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white py-3.5 rounded-xl hover:shadow-lg transition-all font-semibold text-lg transform hover:-translate-y-0.5"
          >
            Buscar Pedido
          </button>

          <div className="mt-6 p-4 bg-[#fff4f0] rounded-xl border border-[#ffded0]">
            <p className="text-sm text-[#2c2c3e]">
              <span className="font-semibold">¿No tienes tu código?</span><br />
              Comunícate con nosotros para obtenerlo.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
