// src/pages/tracking/components/TrackingHeader.tsx
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface TrackingHeaderProps {
  trackingCode: string;
}

export default function TrackingHeader({ trackingCode }: TrackingHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate("/")}
          className="bg-white text-[#ff6b35] px-4 py-2 rounded-xl hover:bg-[#fff4f0] transition-all duration-300 font-bold flex items-center gap-2 mb-6 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          aria-label="Volver al inicio"
        >
          <FaArrowLeft /> Volver al inicio
        </button>

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <FaSearch className="text-3xl" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Seguimiento de Pedido</h1>
            <p className="text-[#ffe8e0] mt-1">Código: {trackingCode}</p>
          </div>
        </div>

        <p className="text-center text-[#ffe8e0] max-w-2xl mx-auto mt-6">
          A continuación puedes ver el estado actual de tu pedido y el progreso
          de cada etapa del proceso de lavandería
        </p>
      </div>
    </div>
  );
}
