// src/pages/intranet/modules/TrackingModule.tsx
import { useState } from 'react'

export default function TrackingModule() {
  const [activeTab, setActiveTab] = useState<'equipo1' | 'equipo3'>('equipo1')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Módulo de Seguimiento de Órdenes de Trabajo</h1>
        <p className="text-[#6b6b7e]">Sistema completo de seguimiento y gestión de órdenes</p>
      </div>

      {/* Pestañas */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('equipo1')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 shadow-lg ${
            activeTab === 'equipo1'
              ? 'bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white border-transparent'
              : 'bg-white text-[#6b6b7e] hover:bg-gray-50 border-gray-200 shadow-sm'
          }`}
        >
          Equipo 1
        </button>
        <button
          onClick={() => setActiveTab('equipo3')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 shadow-lg ${
            activeTab === 'equipo3'
              ? 'bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white border-transparent'
              : 'bg-white text-[#6b6b7e] hover:bg-gray-50 border-gray-200 shadow-sm'
          }`}
        >
          Equipo 3
        </button>
      </div>

      {/* Contenido de pestañas */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {activeTab === 'equipo1' && (
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Seguimiento - Equipo 1</h2>
            <p className="text-[#6b6b7e] mb-6">Gestión de órdenes de trabajo para el Equipo 1</p>
            {/* Aquí irá el contenido específico del Equipo 1 */}
            <div className="text-center py-12 text-[#6b6b7e]">
              <p>Contenido del Equipo 1 en desarrollo</p>
            </div>
          </div>
        )}
        
        {activeTab === 'equipo3' && (
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Seguimiento - Equipo 3</h2>
            <p className="text-[#6b6b7e] mb-6">Gestión de órdenes de trabajo para el Equipo 3</p>
            {/* Aquí irá el contenido específico del Equipo 3 */}
            <div className="text-center py-12 text-[#6b6b7e]">
              <p>Contenido del Equipo 3 en desarrollo</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
