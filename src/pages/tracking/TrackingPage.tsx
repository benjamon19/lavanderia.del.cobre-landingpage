// src/pages/tracking/TrackingPage.tsx
import { useParams } from 'react-router-dom'
import TrackingHeader from './components/TrackingHeader'
import TrackingStatus from './components/TrackingStatus'
import TrackingTimeline from './components/TrackingTimeline'

export default function TrackingPage() {
  const { code } = useParams<{ code: string }>()
  
  // Simulación: genera un stage aleatorio basado en el código
  // En producción, esto vendría de una API
  const getCurrentStage = (trackingCode: string) => {
    const hash = trackingCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return (hash % 5) + 1 // Retorna un número entre 1 y 5
  }
  
  const currentStage = code ? getCurrentStage(code) : 1
  const totalStages = 5

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-white">
      <TrackingHeader trackingCode={code || 'N/A'} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <TrackingStatus 
          currentStage={currentStage} 
          totalStages={totalStages} 
        />
        
        <TrackingTimeline currentStage={currentStage} />
        
        <div className="mt-8 text-center">
          <p className="text-[#6b6b7e] mb-4">
            ¿Tienes alguna pregunta sobre tu pedido?
          </p>
          <button
            onClick={() => window.location.href = '/#contacto'}
            className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold transform hover:-translate-y-0.5"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </div>
  )
}
