// src/components/TrackingModal.tsx
import { useState } from 'react'
import { FaTimes, FaSearch, FaBoxOpen, FaClipboardList } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface TrackingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TrackingModal({ isOpen, onClose }: TrackingModalProps) {
  const [trackingCode, setTrackingCode] = useState('')
  // 'legacy' = Equipo 3 (Actual), 'g5' = Equipo 1 (Nuevo)
  const [systemType, setSystemType] = useState<'legacy' | 'g5'>('legacy')
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingCode.trim()) {
      const code = trackingCode.trim().toUpperCase()
      onClose()

      // Redirección según el sistema seleccionado
      if (systemType === 'legacy') {
        navigate(`/tracking/${code}`)
      } else {
        navigate(`/tracking-g5/${code}`)
      }
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracking-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative animate-fadeIn overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
          aria-label="Cerrar ventana de seguimiento"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] text-white p-8 pt-10 rounded-t-3xl">
          <div className="text-center">
            <h2 id="tracking-title" className="text-3xl font-bold">Seguimiento</h2>
            <p className="text-[#ffe8e0] mt-2">Selecciona el sistema y rastrea tu pedido</p>
          </div>

          {/* Selector de Sistema (Tabs) */}
          <div className="flex bg-black/10 p-1 rounded-xl mt-6">
            <button
              onClick={() => setSystemType('legacy')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${systemType === 'legacy'
                ? 'bg-white text-[#ff6b35] shadow-md'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
            >
              <FaBoxOpen /> Equipo 3
            </button>
            <button
              onClick={() => setSystemType('g5')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${systemType === 'g5'
                ? 'bg-white text-[#ff6b35] shadow-md'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
            >
              <FaClipboardList /> Equipo 1
            </button>
          </div>
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
                placeholder={systemType === 'g5' ? "Ej: EMP-1 o PART-1" : "Ej: ORD-2011-7479"}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-[#cfcfd8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e] uppercase"
                required
              />
            </div>
            <p className="text-xs text-[#6b6b7e] mt-2">
              {systemType === 'g5'
                ? 'Ingresa tu código de empresa o particular.'
                : 'Ingresa tu código de seguimiento para ver el estado de tu pedido.'}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white py-3.5 rounded-xl hover:shadow-lg transition-all font-semibold text-lg transform hover:-translate-y-0.5"
          >
            Buscar en {systemType === 'g5' ? 'Equipo 1' : 'Equipo 3'}
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