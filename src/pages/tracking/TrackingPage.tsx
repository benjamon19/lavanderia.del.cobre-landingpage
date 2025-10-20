// src/pages/tracking/TrackingPage.tsx
import { useParams } from 'react-router-dom'
import TrackingHeader from './components/TrackingHeader'
import TrackingStatus from './components/TrackingStatus'
import TrackingTimeline from './components/TrackingTimeline'

export default function TrackingPage() {
  const { code } = useParams<{ code: string }>()
  
  const getCurrentStage = (trackingCode: string) => {
    const hash = trackingCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return (hash % 5) + 1
  }
  
  const currentStage = code ? getCurrentStage(code) : 1
  const totalStages = 5

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-white">
      <TrackingHeader trackingCode={code || 'N/A'} />
      
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <TrackingStatus 
          currentStage={currentStage} 
          totalStages={totalStages} 
        />
        
        <TrackingTimeline currentStage={currentStage} />
        
        <div className="mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm md:text-base text-[#6b6b7e] text-center sm:text-right">
              ¿Tienes alguna pregunta sobre tu pedido?
            </p>
            <button
              onClick={() => window.location.href = '/#contacto'}
              className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg font-semibold text-sm sm:text-base whitespace-nowrap"
            >
              Contáctanos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
