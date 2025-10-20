// src/pages/intranet/modules/ClientDashboard.tsx
import { FaShoppingBag, FaClock, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'

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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Mis Pedidos</h1>
        <p className="text-[#6b6b7e]">Consulta el estado de tus pedidos en tiempo real</p>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] rounded-xl flex items-center justify-center text-white">
              <FaShoppingBag className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-[#6b6b7e] font-semibold">Pedidos Activos</p>
              <p className="text-2xl font-bold text-[#1a1a2e]">{activeOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white">
              <FaCheckCircle className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-[#6b6b7e] font-semibold">Listos para Retiro</p>
              <p className="text-2xl font-bold text-[#1a1a2e]">{readyOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
              <FaClock className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-[#6b6b7e] font-semibold">Total de Pedidos</p>
              <p className="text-2xl font-bold text-[#1a1a2e]">{myOrders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de pedidos */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5]">
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">Historial de Pedidos</h2>
        <div className="space-y-4">
          {myOrders.map((order) => (
            <div key={order.id} className="p-6 bg-[#f8f9fa] rounded-xl border-2 border-[#f0f0f5] hover:border-[#ff6b35] transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-bold text-lg text-[#1a1a2e]">{order.id}</p>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border-2 ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[#6b6b7e]">{order.items} • {order.quantity} prendas</p>
                  <p className="text-sm text-[#6b6b7e] mt-1">Fecha: {order.date}</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm text-[#6b6b7e] mb-1">Estimado de entrega</p>
                  <p className="font-semibold text-[#1a1a2e]">{order.estimatedReady}</p>
                </div>
              </div>
              
              {/* Barra de progreso */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-[#6b6b7e]">Progreso</p>
                  <p className="text-xs font-semibold text-[#ff6b35]">{order.progress}%</p>
                </div>
                <div className="w-full bg-[#e0e0e5] rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${order.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 p-6 bg-[#fff4f0] rounded-xl border border-[#ffded0]">
        <div className="flex items-center gap-2 mb-2">
          <FaInfoCircle className="text-[#ff6b35]" />
          <h3 className="font-semibold text-[#1a1a2e]">Información Importante</h3>
        </div>
        <ul className="text-sm text-[#2c2c3e] space-y-1">
          <li className="flex items-start gap-2"><span className="text-[#ff6b35] mt-1">•</span> Los pedidos marcados como "Listo para Retiro" pueden ser recogidos en nuestro local.</li>
          <li className="flex items-start gap-2"><span className="text-[#ff6b35] mt-1">•</span> Recibirás una notificación cuando tu pedido esté listo.</li>
          <li className="flex items-start gap-2"><span className="text-[#ff6b35] mt-1">•</span> Horario de atención: Lunes a Viernes de 8:00 a 18:00, Sábados de 9:00 a 14:00.</li>
        </ul>
      </div>
    </div>
  )
}
