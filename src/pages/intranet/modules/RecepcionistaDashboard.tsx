// src/pages/intranet/modules/RecepcionistaDashboard.tsx
import { FaClipboardCheck, FaClock, FaCheckCircle, FaUser, FaBox } from 'react-icons/fa'

export default function RecepcionistaDashboard() {
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
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-1 sm:mb-2">Panel de Recepción</h1>
            <p className="text-xs sm:text-sm text-[#6b6b7e]">Gestiona tus tareas diarias y pedidos asignados</p>
          </div>
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
    </div>
  )
}

