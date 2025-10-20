// src/pages/intranet/modules/ManagementModule.tsx
import { FaChartBar, FaCheckCircle } from 'react-icons/fa'

export default function ManagementModule() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Módulo de Gestión Interna</h1>
        <p className="text-[#6b6b7e]">Control de inventarios, reportes y administración general</p>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-xl p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <FaChartBar className="text-5xl" />
            <h2 className="text-4xl font-bold">Módulo en Desarrollo</h2>
          </div>
          <p className="text-lg text-purple-100 mb-6">
            Sistema completo de gestión administrativa, control de inventarios 
            y generación de reportes estratégicos para la toma de decisiones.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-left">
            <p className="font-semibold mb-3">Funcionalidades planificadas:</p>
            <ul className="space-y-2 text-purple-100">
              <li className="flex items-center gap-2"><FaCheckCircle /> Control de inventario de insumos</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Alertas de stock mínimo</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Reportes de productividad</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Análisis de rentabilidad</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Gestión de usuarios y permisos</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Configuración del sistema</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
