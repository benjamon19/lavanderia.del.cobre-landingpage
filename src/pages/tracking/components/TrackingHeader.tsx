// src/pages/tracking/components/TrackingHeader.tsx
import { FaArrowLeft, FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface TrackingHeaderProps {
  trackingCode: string
}

export default function TrackingHeader({ trackingCode }: TrackingHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] text-white py-8 sm:py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        <button
          onClick={() => navigate("/")}
          className="bg-white text-[#ff6b35] px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl hover:bg-[#fff4f0] font-bold flex items-center gap-2 mb-4 sm:mb-6 shadow-md text-sm sm:text-base"
          aria-label="Volver al inicio"
        >
          <FaArrowLeft className="text-xs sm:text-sm" /> Volver al inicio
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <FaSearch className="text-xl sm:text-2xl md:text-3xl" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Seguimiento de Pedido</h1>
            <p className="text-[#ffe8e0] mt-1 text-sm sm:text-base">Código: {trackingCode}</p>
          </div>
        </div>

        <p className="text-center text-[#ffe8e0] max-w-2xl mx-auto mt-4 sm:mt-6 text-xs sm:text-sm md:text-base px-2">
          A continuación puedes ver el estado actual de tu pedido y el progreso
          de cada etapa del proceso de lavandería
        </p>
      </div>
    </div>
  )
}
