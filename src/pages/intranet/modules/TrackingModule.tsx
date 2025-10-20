// src/pages/intranet/modules/TrackingModule.tsx
import { FaRocket, FaCheckCircle } from 'react-icons/fa'

export default function TrackingModule() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Módulo de Seguimiento de Órdenes de Trabajo</h1>
        <p className="text-[#6b6b7e]">Sistema completo de seguimiento y gestión de órdenes</p>
      </div>

      <div className="bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] text-white rounded-2xl shadow-xl p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <FaRocket className="text-5xl" />
            <h2 className="text-4xl font-bold">Módulo en Desarrollo</h2>
          </div>
          <p className="text-lg text-[#ffe8e0] mb-6">
            Este módulo permitirá gestionar todas las órdenes de trabajo en tiempo real, 
            con funcionalidades de asignación, seguimiento y reportes detallados.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-left">
            <p className="font-semibold mb-3">Funcionalidades planificadas:</p>
            <ul className="space-y-2 text-[#ffe8e0]">
              <li className="flex items-center gap-2"><FaCheckCircle /> Vista de todas las órdenes activas</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Asignación de tareas a trabajadores</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Actualización de estados en tiempo real</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Historial completo de cambios</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Alertas y notificaciones automáticas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
