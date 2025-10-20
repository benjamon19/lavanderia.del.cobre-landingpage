// src/pages/intranet/modules/AdminDashboard.tsx
import { FaShoppingCart, FaDollarSign, FaExclamationTriangle, FaChartLine } from 'react-icons/fa'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Pedidos en Proceso',
      value: '24',
      icon: <FaShoppingCart className="text-3xl" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Ingresos del Día',
      value: '$450.000',
      icon: <FaDollarSign className="text-3xl" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Alertas de Inventario',
      value: '3',
      icon: <FaExclamationTriangle className="text-3xl" />,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      title: 'Productividad',
      value: '89%',
      icon: <FaChartLine className="text-3xl" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ]

  const recentOrders = [
    { id: '#1245', client: 'Juan Pérez', items: '5 prendas', status: 'En Lavado', time: 'Hace 30 min' },
    { id: '#1244', client: 'María González', items: '12 prendas', status: 'Planchado', time: 'Hace 1 hora' },
    { id: '#1243', client: 'Carlos Ruiz', items: '8 prendas', status: 'Listo', time: 'Hace 2 horas' },
    { id: '#1242', client: 'Ana Silva', items: '15 prendas', status: 'Secado', time: 'Hace 3 horas' }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Dashboard Administrativo</h1>
        <p className="text-[#6b6b7e]">Resumen general del sistema y estadísticas clave</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5] hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-sm font-semibold text-[#6b6b7e] mb-1">{stat.title}</h3>
            <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Pedidos recientes */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f0f0f5]">
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">Pedidos Recientes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#f0f0f5]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b6b7e]">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b6b7e]">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b6b7e]">Artículos</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b6b7e]">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6b6b7e]">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#f0f0f5] hover:bg-[#fff4f0] transition-colors">
                  <td className="py-4 px-4 font-semibold text-[#1a1a2e]">{order.id}</td>
                  <td className="py-4 px-4 text-[#2c2c3e]">{order.client}</td>
                  <td className="py-4 px-4 text-[#6b6b7e]">{order.items}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white text-xs font-semibold rounded-full">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-[#6b6b7e]">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
