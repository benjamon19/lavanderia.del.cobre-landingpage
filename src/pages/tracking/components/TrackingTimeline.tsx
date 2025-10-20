// src/pages/tracking/components/TrackingTimeline.tsx
import { 
  FaClipboardCheck, 
  FaTshirt, 
  FaWind, 
  FaCheckCircle 
} from 'react-icons/fa'
import { GiIronCross } from 'react-icons/gi'

interface Stage {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  timestamp: string
  status: 'completed' | 'in-progress' | 'pending'
}

interface TrackingTimelineProps {
  currentStage: number
}

export default function TrackingTimeline({ currentStage }: TrackingTimelineProps) {
  const stages: Stage[] = [
    {
      id: 1,
      name: 'Recepcionado',
      description: 'Tu pedido ha sido recibido y registrado',
      icon: <FaClipboardCheck className="text-2xl" />,
      timestamp: '20 Oct 2025, 14:30',
      status: currentStage >= 1 ? 'completed' : 'pending'
    },
    {
      id: 2,
      name: 'Lavado',
      description: 'Tu ropa está siendo lavada con cuidado',
      icon: <FaTshirt className="text-2xl" />,
      timestamp: currentStage >= 2 ? '20 Oct 2025, 15:45' : 'Pendiente',
      status: currentStage > 2 ? 'completed' : currentStage === 2 ? 'in-progress' : 'pending'
    },
    {
      id: 3,
      name: 'Secado',
      description: 'Proceso de secado en marcha',
      icon: <FaWind className="text-2xl" />,
      timestamp: currentStage >= 3 ? '20 Oct 2025, 17:15' : 'Pendiente',
      status: currentStage > 3 ? 'completed' : currentStage === 3 ? 'in-progress' : 'pending'
    },
    {
      id: 4,
      name: 'Planchado',
      description: 'Tu ropa está siendo planchada',
      icon: <GiIronCross className="text-2xl" />,
      timestamp: currentStage >= 4 ? '20 Oct 2025, 18:30' : 'Pendiente',
      status: currentStage > 4 ? 'completed' : currentStage === 4 ? 'in-progress' : 'pending'
    },
    {
      id: 5,
      name: 'Listo',
      description: 'Tu pedido está listo para retirar',
      icon: <FaCheckCircle className="text-2xl" />,
      timestamp: currentStage >= 5 ? '20 Oct 2025, 19:00' : 'Pendiente',
      status: currentStage >= 5 ? 'completed' : 'pending'
    }
  ]

  const getStatusStyles = (status: Stage['status']) => {
    switch (status) {
      case 'completed':
        return {
          container: 'bg-green-50 border-green-200',
          icon: 'bg-green-500 text-white',
          text: 'text-green-700',
          line: 'bg-green-500'
        }
      case 'in-progress':
        return {
          container: 'bg-orange-50 border-[#ff6b35]',
          icon: 'bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] text-white animate-pulse',
          text: 'text-[#ff6b35]',
          line: 'bg-[#cfcfd8]'
        }
      case 'pending':
        return {
          container: 'bg-gray-50 border-gray-200',
          icon: 'bg-gray-300 text-gray-500',
          text: 'text-gray-500',
          line: 'bg-[#cfcfd8]'
        }
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">
        Línea de Tiempo del Proceso
      </h2>
      
      <div className="relative">
        {stages.map((stage, index) => {
          const styles = getStatusStyles(stage.status)
          const isLast = index === stages.length - 1
          
          return (
            <div key={stage.id} className="relative pb-12 last:pb-0">
              {/* Línea conectora */}
              {!isLast && (
                <div 
                  className={`absolute left-8 top-16 w-1 h-full ${styles.line} transition-all duration-500`}
                  style={{ height: 'calc(100% - 0rem)' }}
                />
              )}
              
              {/* Card de etapa */}
              <div className={`relative flex gap-6 border-2 ${styles.container} rounded-xl p-6 transition-all duration-300`}>
                {/* Icono */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${styles.icon} flex items-center justify-center shadow-lg transition-all duration-300`}>
                  {stage.icon}
                </div>
                
                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-xl font-bold ${styles.text}`}>
                      {stage.name}
                    </h3>
                    <span className={`text-sm font-medium ${styles.text}`}>
                      {stage.status === 'in-progress' && '⏳ '}
                      {stage.status === 'completed' && '✓ '}
                      {stage.timestamp}
                    </span>
                  </div>
                  <p className="text-[#6b6b7e] leading-relaxed">
                    {stage.description}
                  </p>
                  
                  {stage.status === 'in-progress' && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-[#ff6b35] text-[#ff6b35] font-semibold text-sm">
                      🔄 En proceso ahora
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-8 p-6 bg-[#fff4f0] rounded-xl border border-[#ffded0]">
        <h3 className="font-semibold text-[#1a1a2e] mb-2">
          ℹ️ Información Importante
        </h3>
        <p className="text-sm text-[#2c2c3e]">
          El tiempo estimado de cada etapa puede variar según la carga de trabajo. 
          Te notificaremos cuando tu pedido esté listo para retirar.
        </p>
      </div>
    </div>
  )
}
