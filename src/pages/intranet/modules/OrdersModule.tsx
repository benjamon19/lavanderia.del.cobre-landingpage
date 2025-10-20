// src/pages/intranet/modules/OrdersModule.tsx
import { FaFileInvoice, FaCheckCircle } from 'react-icons/fa'

export default function OrdersModule() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Módulo de Sistema de Comandas</h1>
        <p className="text-[#6b6b7e]">Gestión de comandas y facturación de pedidos</p>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <FaFileInvoice className="text-5xl" />
            <h2 className="text-4xl font-bold">Módulo en Desarrollo</h2>
          </div>
          <p className="text-lg text-blue-100 mb-6">
            Este módulo facilitará la creación, gestión y seguimiento de comandas, 
            integrando el sistema de facturación y control de pagos.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-left">
            <p className="font-semibold mb-3">Funcionalidades planificadas:</p>
            <ul className="space-y-2 text-blue-100">
              <li className="flex items-center gap-2"><FaCheckCircle /> Creación rápida de comandas</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Cálculo automático de precios</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Generación de facturas</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Control de pagos y cuentas por cobrar</li>
              <li className="flex items-center gap-2"><FaCheckCircle /> Reportes de ventas diarios/mensuales</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
