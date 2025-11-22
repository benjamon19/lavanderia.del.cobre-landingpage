// src/pages/intranet/modules/WorkerDashboard.tsx
import { FaClipboardCheck, FaClock, FaCheckCircle, FaExclamationTriangle, FaTimes, FaUser, FaBox } from 'react-icons/fa'
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
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-1 sm:mb-2">Panel de Trabajo</h1>
              <p className="text-xs sm:text-sm text-[#6b6b7e]">Gestiona tus tareas diarias y pedidos asignados</p>
            </div>
            <button
              onClick={() => setShowStockModal(true)}
              className="flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg sm:rounded-xl hover:shadow-lg font-semibold text-sm sm:text-base whitespace-nowrap"
            >
              <FaExclamationTriangle className="text-sm sm:text-base" /> 
              <span className="hidden sm:inline">Generar Aviso de Stock</span>
              <span className="sm:hidden">Aviso Stock</span>
            </button>
          </div>

          {showSuccessAlert && (
            <div className="p-3 sm:p-4 bg-green-50 border-2 border-green-200 rounded-lg sm:rounded-xl relative">
              <div className="flex items-start gap-2 sm:gap-3 pr-8">
                <FaCheckCircle className="text-green-600 text-base sm:text-xl flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-green-800 text-sm sm:text-base">Aviso de Stock Generado</p>
                  <p className="text-xs sm:text-sm text-green-600 mt-0.5">El administrador ha sido notificado sobre la necesidad de reposición de inventario.</p>
                </div>
                <button
                  onClick={() => setShowSuccessAlert(false)}
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 text-green-600 hover:text-green-800"
                  aria-label="Cerrar alerta"
                >
                  <FaTimes className="text-base sm:text-lg" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 md:p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <FaClipboardCheck className="text-lg sm:text-xl md:text-2xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs md:text-sm text-[#6b6b7e] font-semibold uppercase tracking-wide">Tareas Pendientes</p>
              <p className="text-xl sm:text-2xl font-bold text-[#1a1a2e]">{todayTasks.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 md:p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] rounded-lg sm:rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <FaClock className="text-lg sm:text-xl md:text-2xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs md:text-sm text-[#6b6b7e] font-semibold uppercase tracking-wide">En Proceso</p>
              <p className="text-xl sm:text-2xl font-bold text-[#1a1a2e]">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 md:p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <FaCheckCircle className="text-lg sm:text-xl md:text-2xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs md:text-sm text-[#6b6b7e] font-semibold uppercase tracking-wide">Completados Hoy</p>
              <p className="text-xl sm:text-2xl font-bold text-[#1a1a2e]">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secciones principales */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Últimos pedidos recibidos */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border-2 border-[#f0f0f5] overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-[#f0f0f5]">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#1a1a2e]">Últimos Pedidos Recibidos</h2>
          </div>
          <div className="p-3 sm:p-4 md:p-6">
            <div className="space-y-3 sm:space-y-4">
              {todayTasks.map((task) => (
                <div key={task.id} className="p-3 sm:p-4 bg-[#f8f9fa] rounded-lg sm:rounded-xl border-2 border-[#f0f0f5] hover:border-[#ffded0]">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-0 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm sm:text-base text-[#1a1a2e] mb-1">{task.id} - {task.client}</p>
                      <p className="text-xs sm:text-sm text-[#6b6b7e]">{task.items}</p>
                    </div>
                    <span className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-full border-2 ${getPriorityColor(task.priority)} self-start whitespace-nowrap`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-3">
                    <span className="px-2.5 sm:px-3 py-1 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white text-[10px] sm:text-xs font-semibold rounded-full">
                      {task.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pedidos listos para empaque */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border-2 border-[#f0f0f5] overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-[#f0f0f5]">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#1a1a2e]">Pedidos Listos para Empaque</h2>
          </div>
          <div className="p-3 sm:p-4 md:p-6">
            <div className="space-y-3 sm:space-y-4">
              {readyOrders.map((order) => (
                <div key={order.id} className="p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border-2 border-green-200 hover:border-green-300">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm sm:text-base text-[#1a1a2e]">{order.id}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <FaUser className="text-[10px] text-[#6b6b7e]" />
                        <p className="text-xs sm:text-sm text-[#6b6b7e]">{order.client}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] text-[#6b6b7e]">Listo a las</p>
                      <p className="text-xs sm:text-sm font-bold text-green-600">{order.readyTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-2 sm:mt-3">
                    <div className="flex items-center gap-1.5">
                      <FaBox className="text-[10px] text-[#6b6b7e]" />
                      <p className="text-xs sm:text-sm text-[#6b6b7e]">{order.items}</p>
                    </div>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white text-[10px] sm:text-xs font-semibold rounded-lg hover:bg-green-700 whitespace-nowrap">
                      Marcar Empacado
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de reporte de stock */}
      {showStockModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={() => setShowStockModal(false)}
        >
          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl relative">
              <button
                onClick={() => setShowStockModal(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white"
                aria-label="Cerrar"
              >
                <FaTimes className="text-lg sm:text-xl" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="text-xl sm:text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Reporte de Stock</h2>
                  <p className="text-red-100 text-xs sm:text-sm mt-0.5 sm:mt-1">Selecciona los insumos faltantes</p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-4 sm:p-6">
              <div className="space-y-2 sm:space-y-3">
                <label className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-red-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stockItems.detergentes}
                    onChange={() => handleToggleItem('detergentes')}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-sm sm:text-base text-[#1a1a2e] font-semibold flex-1">Detergentes especializados</span>
                  {stockItems.detergentes && <FaCheckCircle className="text-red-600 flex-shrink-0" />}
                </label>

                <label className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-red-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stockItems.quimicos}
                    onChange={() => handleToggleItem('quimicos')}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-sm sm:text-base text-[#1a1a2e] font-semibold flex-1">Productos químicos</span>
                  {stockItems.quimicos && <FaCheckCircle className="text-red-600 flex-shrink-0" />}
                </label>

                <label className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-red-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stockItems.empaque}
                    onChange={() => handleToggleItem('empaque')}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-sm sm:text-base text-[#1a1a2e] font-semibold flex-1">Materiales de empaque</span>
                  {stockItems.empaque && <FaCheckCircle className="text-red-600 flex-shrink-0" />}
                </label>
              </div>

              {/* Botones */}
              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button
                  onClick={() => setShowStockModal(false)}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 text-sm sm:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitReport}
                  disabled={!hasSelectedItems}
                  className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base ${
                    hasSelectedItems
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg'
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
