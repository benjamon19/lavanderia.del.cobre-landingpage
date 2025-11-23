// src/pages/intranet/modules/AdminDashboard.tsx
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import Loader from '../../../components/Loader'
import { 
  FaClipboardList, 
  FaMoneyBillWave, 
  FaExclamationTriangle, 
  FaUsers, 
  FaSync,
  FaCalendarAlt,
  FaHashtag,
  FaBuilding
} from 'react-icons/fa'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts'

// === TIPOS ===
interface DashboardStats {
  activeOrders: number
  totalRevenue: number
  stockAlerts: number
  totalClients: number
}

interface RecentOrder {
  id: string
  numeroOrden: string
  cliente: string
  estado: string
  total: number
  fecha: string
  origen: string
  timestamp: number
}

interface ChartData {
  name: string
  value: number
  [key: string]: any
}

const COLORS = ['#ff6b35', '#2c2c3e', '#6b6b7e', '#e85d2e', '#1a1a2e']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'solucion1' | 'solucion2'>('solucion1')
  const [loading, setLoading] = useState(true)
  
  const [stats, setStats] = useState<DashboardStats>({
    activeOrders: 0,
    totalRevenue: 0,
    stockAlerts: 0,
    totalClients: 0
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [revenueData, setRevenueData] = useState<ChartData[]>([])
  const [statusData, setStatusData] = useState<ChartData[]>([])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      let newStats: DashboardStats = { activeOrders: 0, totalRevenue: 0, stockAlerts: 0, totalClients: 0 }
      const allOrders: RecentOrder[] = []
      
      const tempRevenueByMonth: Record<string, number> = {}
      const tempStatusCount: Record<string, number> = {}

      // --- PROCESADOR UNIFICADO DE PEDIDOS ---
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processOrder = (data: any, id: string, origen: string, type: 'sol1' | 'sol2') => {
        // 1. Monto
        const monto = type === 'sol1' ? Number(data.total || 0) : Number(data.montoTotal || 0)
        newStats.totalRevenue += monto

        // 2. Estado
        const estado = data.estado || 'Pendiente'
        const estadoLower = estado.toLowerCase()
        
        const isInactive = 
          estadoLower.includes('entregado') || 
          estadoLower.includes('finalizado') || 
          estadoLower.includes('cancelada') || 
          estadoLower.includes('anulada')
        
        if (!isInactive) newStats.activeOrders++

        // 3. Fecha
        let fechaObj = new Date()
        if (type === 'sol1' && typeof data.fechaCreacion === 'string') {
          fechaObj = new Date(data.fechaCreacion)
        } else if (type === 'sol2' && data.fechaIngreso?.seconds) {
          fechaObj = new Date(data.fechaIngreso.seconds * 1000)
        } else if (data.fechaCreacion?.seconds) {
           fechaObj = new Date(data.fechaCreacion.seconds * 1000)
        }

        // 4. Cliente
        const nombreCliente = data.nombreCliente || data.cliente?.nombre || 'Cliente Anónimo'

        // 5. Agrupar datos
        const mesNombre = fechaObj.toLocaleString('es-CL', { month: 'short' })
        const mesKey = mesNombre.charAt(0).toUpperCase() + mesNombre.slice(1)
        tempRevenueByMonth[mesKey] = (tempRevenueByMonth[mesKey] || 0) + monto
        
        const estadoKey = estadoLower.charAt(0).toUpperCase() + estadoLower.slice(1)
        tempStatusCount[estadoKey] = (tempStatusCount[estadoKey] || 0) + 1

        allOrders.push({
          id,
          numeroOrden: data.numeroOrden || id.substring(0, 6).toUpperCase(),
          cliente: nombreCliente,
          estado,
          total: monto,
          fecha: fechaObj.toLocaleDateString(),
          timestamp: fechaObj.getTime(),
          origen
        })
      }

      if (activeTab === 'solucion1') {
        // === SOLUCIÓN 1 (G5, G7) ===
        const [snapEmp, snapPart] = await Promise.all([
          getDocs(collection(db, 'comandas_empresa_grupo_5')),
          getDocs(collection(db, 'comandas_particular_grupo_5'))
        ])
        
        snapEmp.forEach(doc => processOrder(doc.data(), doc.id, 'Empresa G5', 'sol1'))
        snapPart.forEach(doc => processOrder(doc.data(), doc.id, 'Particular G5', 'sol1'))

        // Alertas G7
        try {
          const snapAlertas = await getDocs(collection(db, 'alertas_gestion_7'))
          newStats.stockAlerts = snapAlertas.size
        } catch (e) { console.warn(e) }

        // Clientes G5
        try {
          const snapClientes = await getDocs(collection(db, 'Clientes_equipo_5'))
          newStats.totalClients = snapClientes.size
        } catch (e) { console.warn(e) }

      } else {
        // === SOLUCIÓN 2 (G2, G4) ===
        const snapComandas2 = await getDocs(collection(db, 'comandas_2'))
        snapComandas2.forEach(doc => processOrder(doc.data(), doc.id, 'G2', 'sol2'))

        // Alertas G4 (Calculadas desde productos_4)
        try {
          const snapProd = await getDocs(collection(db, 'productos_4'))
          let alertas = 0
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          snapProd.forEach((doc: any) => {
            const d = doc.data()
            const qty = Number(d.quantity)
            const min = Number(d.minStock)
            if (!isNaN(qty) && !isNaN(min) && qty <= min) alertas++
          })
          newStats.stockAlerts = alertas
        } catch (e) { console.warn(e) }

        // Clientes G2 (Calculados)
        newStats.totalClients = new Set(allOrders.map(o => o.cliente)).size
      }

      allOrders.sort((a, b) => b.timestamp - a.timestamp)
      setStats(newStats)
      setRecentOrders(allOrders.slice(0, 10))
      setRevenueData(Object.keys(tempRevenueByMonth).map(k => ({ name: k, value: tempRevenueByMonth[k] })))
      setStatusData(Object.keys(tempStatusCount).map(k => ({ name: k, value: tempStatusCount[k] })))

    } catch (error) {
      console.error("Error dashboard:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [activeTab])

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 pb-24 md:pb-8">
      
      {/* Header y Tabs */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-4 md:gap-6">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-slate-800">Dashboard General</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">Resumen operativo unificado</p>
        </div>
        
        <div className="w-full xl:w-auto flex flex-row items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <div className="bg-slate-100 p-1 rounded-xl flex flex-row flex-nowrap min-w-fit">
            <button onClick={() => setActiveTab('solucion1')} className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${activeTab === 'solucion1' ? 'bg-white text-[#ff6b35] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              Solución 1 <span className="hidden sm:inline text-[10px] opacity-70 ml-1">(Eq. 1, 5, 7)</span>
            </button>
            <button onClick={() => setActiveTab('solucion2')} className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${activeTab === 'solucion2' ? 'bg-white text-[#ff6b35] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              Solución 2 <span className="hidden sm:inline text-[10px] opacity-70 ml-1">(Eq. 3, 2, 4)</span>
            </button>
          </div>
          <button onClick={fetchData} className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:h-auto sm:w-auto sm:px-4 sm:py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:border-[#ff6b35] hover:text-[#ff6b35] transition-colors shadow-sm">
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center"><Loader text="Sincronizando datos..." /></div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <KpiCard title="Ingresos Totales" value={formatCurrency(stats.totalRevenue)} icon={<FaMoneyBillWave />} color="green" />
            <KpiCard title="Pedidos Activos" value={stats.activeOrders} icon={<FaClipboardList />} color="blue" />
            <KpiCard title="Alertas Stock" value={stats.stockAlerts} icon={<FaExclamationTriangle />} color="red" />
            <KpiCard title="Clientes Totales" value={stats.totalClients} icon={<FaUsers />} color="purple" />
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-w-0 h-[350px]">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Ingresos Mensuales</h3>
              <div className="flex-1 w-full min-h-0" style={{ width: '100%', height: '100%' }}>
                {revenueData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} />
                      <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                      <Bar dataKey="value" fill="#ff6b35" radius={[4, 4, 0, 0]} maxBarSize={50} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyState />}
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-w-0 h-[350px]">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Estado de Pedidos</h3>
              <div className="flex-1 w-full min-h-0" style={{ width: '100%', height: '100%' }}>
                {statusData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {statusData.map((_, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                      </Pie>
                      <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
                      <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <EmptyState />}
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm">Últimos Movimientos</h3>
            </div>
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-100 bg-slate-50/30">
                    <th className="px-6 py-3 font-medium">Orden</th>
                    <th className="px-6 py-3 font-medium">Origen</th>
                    <th className="px-6 py-3 font-medium">Cliente</th>
                    <th className="px-6 py-3 font-medium">Fecha</th>
                    <th className="px-6 py-3 font-medium">Monto</th>
                    <th className="px-6 py-3 font-medium text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-3 font-mono text-slate-600 group-hover:text-[#ff6b35] transition-colors">{order.numeroOrden}</td>
                      <td className="px-6 py-3"><span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 border border-slate-200">{order.origen}</span></td>
                      <td className="px-6 py-3 text-slate-800">{order.cliente}</td>
                      <td className="px-6 py-3 text-slate-500">{order.fecha}</td>
                      <td className="px-6 py-3 text-slate-600 font-medium">{formatCurrency(order.total)}</td>
                      <td className="px-6 py-3 text-right"><StatusBadge status={order.estado} /></td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-slate-400">Sin datos</td></tr>}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-100">
              {recentOrders.map((order, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-mono text-sm font-bold text-[#ff6b35] block">{order.numeroOrden}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><FaBuilding className="text-[10px]" /> {order.origen}</span>
                    </div>
                    <StatusBadge status={order.estado} />
                  </div>
                  <div className="text-sm font-medium text-slate-800 mb-2">{order.cliente}</div>
                  <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-50">
                    <span className="flex items-center gap-1"><FaCalendarAlt /> {order.fecha}</span>
                    <span className="font-bold text-slate-700 text-sm">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              ))}
              {recentOrders.length === 0 && <div className="p-8 text-center text-slate-400 text-sm">Sin datos</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// COMPONENTES
function KpiCard({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: 'green' | 'blue' | 'red' | 'purple' }) {
  const styles = { green: 'bg-emerald-50 text-emerald-600', blue: 'bg-blue-50 text-blue-600', red: 'bg-rose-50 text-rose-600', purple: 'bg-violet-50 text-violet-600' }
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{title}</p><h3 className="text-xl font-bold text-slate-800">{value}</h3></div>
      <div className={`p-3 rounded-xl ${styles[color]}`}><span className="text-lg">{icon}</span></div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let style = 'bg-slate-100 text-slate-600 border-slate-200'
  const s = status.toLowerCase()
  if (s.includes('activa') || s.includes('proceso') || s.includes('lavad')) style = 'bg-blue-50 text-blue-700 border-blue-100'
  else if (s.includes('listo') || s.includes('entreg') || s.includes('finaliz')) style = 'bg-emerald-50 text-emerald-700 border-emerald-100'
  else if (s.includes('cancel') || s.includes('anul')) style = 'bg-red-50 text-red-700 border-red-100'
  else if (s.includes('pendie')) style = 'bg-amber-50 text-amber-700 border-amber-100'
  return <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${style}`}><FaHashtag className="text-[8px] opacity-50" /> {status}</span>
}

function EmptyState() {
  return <div className="h-full flex flex-col items-center justify-center text-slate-300"><div className="text-3xl mb-1">📊</div><p className="text-xs">Sin datos</p></div>
}