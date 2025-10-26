// src/pages/intranet/modules/ClientDashboard.tsx
import { FaShoppingBag, FaClock, FaCheckCircle, FaInfoCircle, FaCalendar } from 'react-icons/fa'

export default function ClientDashboard() {
  const myOrders = [
    { 
      id: '#1024', 
      items: 'Jeans y Camisas', 
      quantity: 5,
      status: 'En Lavado', 
      date: '20 Oct 2025',
      estimatedReady: '21 Oct 2025, 15:00',
      progress: 40
    },
    { 
      id: '#1012', 
      items: 'Ropa de Cama', 
      quantity: 8,
      status: 'Listo para Retiro', 
      date: '19 Oct 2025',
      estimatedReady: '20 Oct 2025, 14:00',
      progress: 100
    },
    { 
      id: '#998', 
      items: 'Ropa Formal', 
      quantity: 3,
      status: 'En Planchado', 
      date: '18 Oct 2025',
      estimatedReady: '20 Oct 2025, 18:00',
      progress: 80
    },
    { 
      id: '#987', 
      items: 'Ropa Deportiva', 
      quantity: 6,
      status: 'Completado', 
      date: '15 Oct 2025',
      estimatedReady: 'Retirado',
      progress: 100
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Listo para Retiro': return 'bg-green-100 text-green-700 border-green-300'
      case 'En Lavado': return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'En Planchado': return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'Completado': return 'bg-gray-100 text-gray-700 border-gray-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const activeOrders = myOrders.filter(o => o.status !== 'Completado').length
  const readyOrders = myOrders.filter(o => o.status === 'Listo para Retiro').length

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-1 sm:mb-2">Mis Pedidos</h1>
        <p className="text-xs sm:text-sm text-[#6b6b7e]">Consulta el estado de tus pedidos en tiempo real</p>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 md:p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] rounded-lg sm:rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <FaShoppingBag className="text-lg sm:text-xl md:text-2xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs md:text-sm text-[#6b6b7e] font-semibold uppercase tracking-wide">Pedidos Activos</p>
              <p className="text-xl sm:text-2xl font-bold text-[#1a1a2e]">{activeOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 md:p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <FaCheckCircle className="text-lg sm:text-xl md:text-2xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs md:text-sm text-[#6b6b7e] font-semibold uppercase tracking-wide">Listos para Retiro</p>
              <p className="text-xl sm:text-2xl font-bold text-[#1a1a2e]">{readyOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 md:p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <FaClock className="text-lg sm:text-xl md:text-2xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs md:text-sm text-[#6b6b7e] font-semibold uppercase tracking-wide">Total de Pedidos</p>
              <p className="text-xl sm:text-2xl font-bold text-[#1a1a2e]">{myOrders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de pedidos */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border-2 border-[#f0f0f5] overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-[#f0f0f5]">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#1a1a2e]">Historial de Pedidos</h2>
        </div>
        
        <div className="p-3 sm:p-4 md:p-6">
          <div className="space-y-3 sm:space-y-4">
            {myOrders.map((order) => (
              <div key={order.id} className="p-4 sm:p-5 md:p-6 bg-[#f8f9fa] rounded-lg sm:rounded-xl border-2 border-[#f0f0f5] hover:border-[#ffded0]">
                
                {/* Header del pedido */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <p className="font-bold text-base sm:text-lg text-[#1a1a2e]">{order.id}</p>
                      <span className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-full border-2 ${getStatusColor(order.status)} whitespace-nowrap`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#2c2c3e] font-medium mb-1">{order.items}</p>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs text-[#6b6b7e]">
                      <span className="flex items-center gap-1">
                        <FaShoppingBag className="text-[8px] sm:text-[10px]" />
                        {order.quantity} prendas
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-[8px] sm:text-[10px]" />
                        {order.date}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-left sm:text-right flex-shrink-0">
                    <p className="text-[10px] sm:text-xs text-[#6b6b7e] mb-1 font-semibold uppercase tracking-wide">Estimado de entrega</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#1a1a2e]">{order.estimatedReady}</p>
                  </div>
                </div>
                
                {/* Barra de progreso */}
                <div className="mt-3 sm:mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] sm:text-xs font-semibold text-[#6b6b7e] uppercase tracking-wide">Progreso</p>
                    <p className="text-xs sm:text-sm font-bold text-[#ff6b35]">{order.progress}%</p>
                  </div>
                  <div className="w-full bg-[#e0e0e5] rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] h-1.5 sm:h-2 rounded-full"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-4 sm:mt-6 p-4 sm:p-5 md:p-6 bg-[#fff4f0] rounded-lg sm:rounded-xl border-2 border-[#ffded0]">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <FaInfoCircle className="text-[#ff6b35] text-base sm:text-lg flex-shrink-0" />
          <h3 className="font-bold text-sm sm:text-base text-[#1a1a2e]">Información Importante</h3>
        </div>
        <ul className="text-xs sm:text-sm text-[#2c2c3e] space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-[#ff6b35] mt-0.5 flex-shrink-0">•</span>
            <span>Los pedidos marcados como "Listo para Retiro" pueden ser recogidos en nuestro local.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ff6b35] mt-0.5 flex-shrink-0">•</span>
            <span>Recibirás una notificación cuando tu pedido esté listo.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ff6b35] mt-0.5 flex-shrink-0">•</span>
            <span>Horario de atención: Lunes a Viernes de 8:00 a 18:00, Sábados de 9:00 a 14:00.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}