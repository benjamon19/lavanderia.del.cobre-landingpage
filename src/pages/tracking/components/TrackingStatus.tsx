// src/pages/tracking/components/TrackingStatus.tsx
import { FaCheckCircle, FaClock } from 'react-icons/fa'

interface TrackingStatusProps {
  currentStage: number
  totalStages: number
}

export default function TrackingStatus({ currentStage, totalStages }: TrackingStatusProps) {
  const progress = (currentStage / totalStages) * 100
  const isComplete = currentStage === totalStages

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">
            {isComplete ? 'Pedido Completado' : 'En Proceso'}
          </h2>
          <p className="text-[#6b6b7e]">
            {isComplete 
              ? 'Tu pedido está listo para ser retirado' 
              : `Etapa ${currentStage} de ${totalStages}`
            }
          </p>
        </div>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isComplete 
            ? 'bg-green-100 text-green-600' 
            : 'bg-orange-100 text-[#ff6b35]'
        }`}>
          {isComplete ? <FaCheckCircle className="text-3xl" /> : <FaClock className="text-3xl" />}
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-[#f0f0f5] rounded-full h-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right text-sm text-[#6b6b7e] mt-2 font-semibold">
          {progress.toFixed(0)}% Completado
        </p>
      </div>
    </div>
  )
}
