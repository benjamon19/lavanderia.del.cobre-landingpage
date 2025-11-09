// src/pages/intranet/modules/ManagementModule.tsx
import { useState } from 'react'

export default function ManagementModule() {
  const [activeTab, setActiveTab] = useState<'equipo7' | 'equipo4'>('equipo7')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Módulo de Gestión Interna</h1>
        <p className="text-[#6b6b7e]">Control de inventarios, reportes y administración general</p>
      </div>

      {/* Pestañas */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('equipo7')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'equipo7'
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
              : 'bg-white text-[#6b6b7e] hover:bg-gray-50 border-2 border-gray-200'
          }`}
        >
          Equipo 7
        </button>
        <button
          onClick={() => setActiveTab('equipo4')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'equipo4'
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
              : 'bg-white text-[#6b6b7e] hover:bg-gray-50 border-2 border-gray-200'
          }`}
        >
          Equipo 4
        </button>
      </div>

      {/* Contenido de pestañas */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {activeTab === 'equipo7' && (
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Gestión Interna - Equipo 7</h2>
            <p className="text-[#6b6b7e] mb-6">Control y administración para el Equipo 7</p>
            {/* Aquí irá el contenido específico del Equipo 7 */}
            <div className="text-center py-12 text-[#6b6b7e]">
              <p>Contenido del Equipo 7 en desarrollo</p>
            </div>
          </div>
        )}
        
        {activeTab === 'equipo4' && (
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Gestión Interna - Equipo 4</h2>
            <p className="text-[#6b6b7e] mb-6">Control y administración para el Equipo 4</p>
            {/* Aquí irá el contenido específico del Equipo 4 */}
            <div className="text-center py-12 text-[#6b6b7e]">
              <p>Contenido del Equipo 4 en desarrollo</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
