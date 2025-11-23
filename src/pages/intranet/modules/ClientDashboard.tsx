// src/pages/intranet/modules/ClientDashboard.tsx
import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { useAuth } from '../../../context/AuthContext'
import Loader from '../../../components/Loader'
import { 
  FaShoppingBag, 
  FaClock, 
  FaCheckCircle, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaSearch,
  FaHashtag,
  FaSync
} from 'react-icons/fa'

// Interfaz unificada para la vista
interface ClientOrder {
  id: string
  numeroOrden: string
  fecha: string
  timestamp: number
  total: number
  estado: string
  items: string
  origen: string
}

export default function ClientDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'solucion1' | 'solucion2'>('solucion1')
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<ClientOrder[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  
  // KPIs
  const [stats, setStats] = useState({
    activos: 0,
    completados: 0,
    gastoTotal: 0
  })

  const fetchOrders = async () => {
    if (!user) return
    setLoading(true)

    try {
      const newOrders: ClientOrder[] = []
      let totalActivos = 0
      let totalCompletados = 0
      let totalGasto = 0

      if (activeTab === 'solucion1') {
        // --- 1. SOLUCIÓN 1 (Equipo 5): Buscar por EMAIL ---
        // Colecciones: comandas_empresa_grupo_5, comandas_particular_grupo_5
        const qEmpresa = query(
          collection(db, 'comandas_empresa_grupo_5'), 
          where('cliente.correo', '==', user.email)
        )
        const qParticular = query(
          collection(db, 'comandas_particular_grupo_5'), 
          where('cliente.correo', '==', user.email)
        )

        const [snapEmp, snapPart] = await Promise.all([
          getDocs(qEmpresa),
          getDocs(qParticular)
        ])

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processG5 = (doc: any, tipo: string) => {
          const data = doc.data()
          const fecha = data.fechaCreacion ? new Date(data.fechaCreacion) : new Date()
          const total = Number(data.total || 0)
          const estado = data.estado || 'Pendiente'
          
          const itemCount = data.prendas ? data.prendas.length : 0
          const itemsSummary = `${itemCount} prenda${itemCount !== 1 ? 's' : ''}`

          newOrders.push({
            id: doc.id,
            numeroOrden: data.numeroOrden || 'S/N',
            fecha: fecha.toLocaleDateString(),
            timestamp: fecha.getTime(),
            total: total,
            estado: estado,
            items: itemsSummary,
            origen: `Eq.5 (${tipo})`
          })

          totalGasto += total
          const st = estado.toLowerCase()
          if (st.includes('entrega') || st.includes('finaliz') || st.includes('completado')) {
            totalCompletados++
          } else if (!st.includes('cancel')) {
            totalActivos++
          }
        }

        snapEmp.forEach(doc => processG5(doc, 'Empresa'))
        snapPart.forEach(doc => processG5(doc, 'Particular'))

      } else {
        // --- 2. SOLUCIÓN 2 (Equipo 2): Buscar por NOMBRE ---
        // Colección: comandas_2 (No tiene email, usamos nombreCliente)
        const qComandas2 = query(
          collection(db, 'comandas_2'),
          where('nombreCliente', '==', user.name)
        )

        const snapG2 = await getDocs(qComandas2)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processG2 = (doc: any) => {
          const data = doc.data()
          const fecha = data.fechaIngreso?.seconds ? new Date(data.fechaIngreso.seconds * 1000) : new Date()
          const total = Number(data.montoTotal || 0)
          const estado = data.estado || 'Pendiente'
          
          const itemCount = data.prendas ? data.prendas.length : 0
          const itemsSummary = `${itemCount} prenda${itemCount !== 1 ? 's' : ''}`

          newOrders.push({
            id: doc.id,
            numeroOrden: data.numeroOrden || 'ORD-G2',
            fecha: fecha.toLocaleDateString(),
            timestamp: fecha.getTime(),
            total: total,
            estado: estado,
            items: itemsSummary,
            origen: 'Eq.2'
          })

          totalGasto += total
          const st = estado.toLowerCase()
          if (st.includes('entregado')) {
            totalCompletados++
          } else if (!st.includes('cancel') && !st.includes('anul')) {
            totalActivos++
          }
        }

        snapG2.forEach(processG2)
      }

      // Ordenar por fecha más reciente
      newOrders.sort((a, b) => b.timestamp - a.timestamp)

      setOrders(newOrders)
      setStats({ activos: totalActivos, completados: totalCompletados, gastoTotal: totalGasto })

    } catch (error) {
      console.error("Error cargando pedidos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [user, activeTab])

  // Filtrado local por buscador
  const filteredOrders = orders.filter(order => 
    order.numeroOrden.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.estado.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
  }

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 pb-24">
      
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-4 md:gap-6">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-slate-800">Mis Pedidos</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">Historial completo de tus servicios</p>
        </div>
        
        <div className="w-full xl:w-auto flex flex-col sm:flex-row gap-3">
          {/* Tabs de Solución */}
          <div className="bg-slate-100 p-1 rounded-xl flex w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('solucion1')}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all text-center whitespace-nowrap ${
                activeTab === 'solucion1' ? 'bg-white text-[#ff6b35] shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Solución 1 <span className="hidden sm:inline text-[10px] opacity-70 ml-1">(Eq. 5)</span>
            </button>
            <button
              onClick={() => setActiveTab('solucion2')}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all text-center whitespace-nowrap ${
                activeTab === 'solucion2' ? 'bg-white text-[#ff6b35] shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Solución 2 <span className="hidden sm:inline text-[10px] opacity-70 ml-1">(Eq. 2)</span>
            </button>
          </div>

          {/* Buscador */}
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar orden..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff6b35] transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Botón refrescar */}
          <button 
            onClick={fetchOrders} 
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:border-[#ff6b35] hover:text-[#ff6b35] transition-colors shadow-sm w-full sm:w-auto"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center"><Loader text="Buscando tus pedidos..." /></div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pedidos Activos</p>
                <h3 className="text-2xl font-bold text-slate-800">{stats.activos}</h3>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600"><FaClock className="text-xl" /></div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Completados</p>
                <h3 className="text-2xl font-bold text-slate-800">{stats.completados}</h3>
              </div>
              <div className="p-3 rounded-xl bg-green-50 text-green-600"><FaCheckCircle className="text-xl" /></div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Gastado</p>
                <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(stats.gastoTotal)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 text-[#ff6b35]"><FaMoneyBillWave className="text-xl" /></div>
            </div>
          </div>

          {/* Lista de Pedidos */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm">Detalle de Órdenes</h3>
            </div>
            
            {filteredOrders.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        order.estado.toLowerCase().includes('activa') || order.estado.toLowerCase().includes('proceso')
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        <FaShoppingBag />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-800">{order.numeroOrden}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                            {order.origen}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{order.items} • <span className="font-medium text-slate-700">{formatCurrency(order.total)}</span></p>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <FaCalendarAlt /> {order.fecha}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pl-16 sm:pl-0">
                      <StatusBadge status={order.estado} />
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400">
                <FaShoppingBag className="mx-auto text-4xl mb-3 opacity-20" />
                <p>No se encontraron pedidos en esta solución.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Componente Badge
function StatusBadge({ status }: { status: string }) {
  let style = 'bg-slate-100 text-slate-600 border-slate-200'
  const s = status.toLowerCase()
  
  if (s.includes('activa') || s.includes('proceso') || s.includes('lavad')) style = 'bg-blue-50 text-blue-700 border-blue-100'
  else if (s.includes('listo') || s.includes('entreg') || s.includes('finaliz') || s.includes('completado')) style = 'bg-emerald-50 text-emerald-700 border-emerald-100'
  else if (s.includes('cancel') || s.includes('anul')) style = 'bg-red-50 text-red-700 border-red-100'
  else if (s.includes('pendie')) style = 'bg-amber-50 text-amber-700 border-amber-100'

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${style}`}>
      <FaHashtag className="text-[8px] opacity-50" /> {status}
    </span>
  )
}