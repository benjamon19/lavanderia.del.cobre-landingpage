// src/pages/intranet/modules/AdminDashboard.tsx
import { FaShoppingCart, FaDollarSign, FaExclamationTriangle, FaChartLine, FaClock, FaUser } from 'react-icons/fa'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Pedidos en Proceso',
      value: '24',
      icon: <FaShoppingCart />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Ingresos del Día',
      value: '$450.000',
      icon: <FaDollarSign />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Alertas de Inventario',
      value: '3',
      icon: <FaExclamationTriangle />,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      title: 'Productividad',
      value: '89%',
      icon: <FaChartLine />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ]

  const recentOrders = [
    { id: '#1245', client: 'Juan Pérez', items: '5 prendas', status: 'En Lavado', statusColor: 'bg-blue-500', time: '30 min' },
    { id: '#1244', client: 'María González', items: '12 prendas', status: 'Planchado', statusColor: 'bg-purple-500', time: '1 hora' },
    { id: '#1243', client: 'Carlos Ruiz', items: '8 prendas', status: 'Listo', statusColor: 'bg-green-500', time: '2 horas' },
    { id: '#1242', client: 'Ana Silva', items: '15 prendas', status: 'Secado', statusColor: 'bg-orange-500', time: '3 horas' }
  ]

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-1 sm:mb-2">Dashboard Administrativo</h1>
        <p className="text-xs sm:text-sm text-[#6b6b7e]">Resumen general del sistema y estadísticas clave</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md p-3 sm:p-4 md:p-6 border-2 border-[#f0f0f5]"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                <span className="text-base sm:text-xl md:text-2xl lg:text-3xl">{stat.icon}</span>
              </div>
            </div>
            <h3 className="text-[10px] sm:text-xs font-semibold text-[#6b6b7e] mb-1 uppercase tracking-wide">{stat.title}</h3>
            <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Pedidos recientes */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border-2 border-[#f0f0f5] overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-[#f0f0f5]">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#1a1a2e]">Pedidos Recientes</h2>
        </div>

        {/* Vista Desktop - Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8f9fa] border-b-2 border-[#f0f0f5]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b6b7e] uppercase tracking-wide">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b6b7e] uppercase tracking-wide">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b6b7e] uppercase tracking-wide">Artículos</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b6b7e] uppercase tracking-wide">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b6b7e] uppercase tracking-wide">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#f0f0f5] hover:bg-[#fff4f0]">
                  <td className="py-4 px-4 font-semibold text-[#1a1a2e]">{order.id}</td>
                  <td className="py-4 px-4 text-[#2c2c3e]">{order.client}</td>
                  <td className="py-4 px-4 text-[#6b6b7e]">{order.items}</td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white text-xs font-semibold rounded-full">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-[#6b6b7e]">Hace {order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista Móvil - Cards */}
        <div className="md:hidden divide-y divide-[#f0f0f5]">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 hover:bg-[#fff4f0]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-[#1a1a2e]">{order.id}</span>
                    <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white text-[10px] font-semibold rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#2c2c3e]">
                    <FaUser className="text-[10px] text-[#6b6b7e]" />
                    <span>{order.client}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6b6b7e]">{order.items}</span>
                <div className="flex items-center gap-1 text-[#6b6b7e]">
                  <FaClock className="text-[10px]" />
                  <span>Hace {order.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}