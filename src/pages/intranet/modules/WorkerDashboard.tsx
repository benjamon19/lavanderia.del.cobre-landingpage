// src/pages/intranet/modules/WorkerDashboard.tsx
import { FaClipboardCheck, FaClock, FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

export default function WorkerDashboard() {
  const [showStockModal, setShowStockModal] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [stockItems, setStockItems] = useState({
    detergentes: false,
    quimicos: false,
    empaque: false
  })

  const handleToggleItem = (item: keyof typeof stockItems) => {
    setStockItems(prev => ({ ...prev, [item]: !prev[item] }))
  }

  const handleSubmitReport = () => {
    const selectedItems = Object.entries(stockItems)
      .filter(([_, checked]) => checked)
      .map(([key]) => key)
    
    if (selectedItems.length > 0) {
      setShowStockModal(false)
      setShowSuccessAlert(true)
      // Resetear checklist
      setStockItems({ detergentes: false, quimicos: false, empaque: false })
    }
  }

  const hasSelectedItems = Object.values(stockItems).some(checked => checked)

  const todayTasks = [
    { id: '#1245', client: 'Juan Pérez', items: 'Jeans y Camisas (5 prendas)', priority: 'Alta', stage: 'Recepción' },
    { id: '#1244', client: 'María González', items: 'Ropa formal (12 prendas)', priority: 'Media', stage: 'Planchado' },
    { id: '#1243', client: 'Carlos Ruiz', items: 'Ropa deportiva (8 prendas)', priority: 'Alta', stage: 'Secado' },
    { id: '#1242', client: 'Ana Silva', items: 'Ropa de cama (15 prendas)', priority: 'Baja', stage: 'Lavado' }
  ]

  const readyOrders = [
    { id: '#1240', client: 'Pedro Morales', items: '6 prendas', readyTime: '14:30' },
    { id: '#1238', client: 'Laura Castro', items: '9 prendas', readyTime: '15:00' },
    { id: '#1235', client: 'Roberto Díaz', items: '4 prendas', readyTime: '15:45' }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-600 border-red-200'
      case 'Media': return 'bg-yellow-100 text-yellow-600 border-yellow-200'
      case 'Baja': return 'bg-green-100 text-green-600 border-green-200'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Panel de Trabajo</h1>
            <p className="text-[#6b6b7e]">Gestiona tus tareas diarias y pedidos asignados</p>
          </div>
          <button
            onClick={() => setShowStockModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold transform hover:-translate-y-0.5"
          >
            <FaExclamationTriangle /> Generar Aviso de Stock
          </button>
        </div>

        {showSuccessAlert && (
          <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl animate-fadeIn relative">
            <div className="flex items-start gap-3 pr-8">
              <FaCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-green-800">Aviso de Stock Generado</p>
                <p className="text-sm text-green-600">El administrador ha sido notificado sobre la necesidad de reposición de inventario.</p>
              </div>
              <button
                onClick={() => setShowSuccessAlert(false)}
                className="absolute top-4 right-4 text-green-600 hover:text-green-800 transition-colors"
                aria-label="Cerrar alerta"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
              <FaClipboardCheck className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-[#6b6b7e] font-semibold">Tareas Pendientes</p>
              <p className="text-2xl font-bold text-[#1a1a2e]">{todayTasks.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] rounded-xl flex items-center justify-center text-white">
              <FaClock className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-[#6b6b7e] font-semibold">En Proceso</p>
              <p className="text-2xl font-bold text-[#1a1a2e]">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white">
              <FaCheckCircle className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-[#6b6b7e] font-semibold">Completados Hoy</p>
              <p className="text-2xl font-bold text-[#1a1a2e]">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Últimos pedidos recibidos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">Últimos Pedidos Recibidos</h2>
          <div className="space-y-4">
            {todayTasks.map((task) => (
              <div key={task.id} className="p-4 bg-[#f8f9fa] rounded-xl border-2 border-[#f0f0f5] hover:border-[#ff6b35] transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-[#1a1a2e]">{task.id} - {task.client}</p>
                    <p className="text-sm text-[#6b6b7e] mt-1">{task.items}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border-2 ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white text-xs font-semibold rounded-full">
                    {task.stage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pedidos listos para empaque */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5]">
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">Pedidos Listos para Empaque</h2>
          <div className="space-y-4">
            {readyOrders.map((order) => (
              <div key={order.id} className="p-4 bg-green-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-bold text-[#1a1a2e]">{order.id}</p>
                    <p className="text-sm text-[#6b6b7e]">{order.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#6b6b7e]">Listo a las</p>
                    <p className="text-sm font-bold text-green-600">{order.readyTime}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm text-[#6b6b7e]">{order.items}</p>
                  <button className="px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    Marcar Empacado
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de reporte de stock */}
      {showStockModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowStockModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-2xl relative">
              <button
                onClick={() => setShowStockModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                aria-label="Cerrar"
              >
                <FaTimes className="text-xl" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FaExclamationTriangle className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Reporte de Stock</h2>
                  <p className="text-red-100 text-sm mt-1">Selecciona los insumos faltantes</p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-6">
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-red-300 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stockItems.detergentes}
                    onChange={() => handleToggleItem('detergentes')}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                  />
                  <span className="text-[#1a1a2e] font-semibold flex-1">Detergentes especializados</span>
                  {stockItems.detergentes && <FaCheckCircle className="text-red-600" />}
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-red-300 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stockItems.quimicos}
                    onChange={() => handleToggleItem('quimicos')}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                  />
                  <span className="text-[#1a1a2e] font-semibold flex-1">Productos químicos</span>
                  {stockItems.quimicos && <FaCheckCircle className="text-red-600" />}
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-red-300 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stockItems.empaque}
                    onChange={() => handleToggleItem('empaque')}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                  />
                  <span className="text-[#1a1a2e] font-semibold flex-1">Materiales de empaque</span>
                  {stockItems.empaque && <FaCheckCircle className="text-red-600" />}
                </label>
              </div>

              {/* Botones */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowStockModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitReport}
                  disabled={!hasSelectedItems}
                  className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all ${
                    hasSelectedItems
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Enviar Reporte
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
