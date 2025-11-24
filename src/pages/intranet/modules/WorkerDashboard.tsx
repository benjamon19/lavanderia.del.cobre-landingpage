// src/pages/intranet/modules/WorkerDashboard.tsx
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { useAuth } from '../../../context/AuthContext'
import Loader from '../../../components/Loader'
import { 
  FaClipboardList, 
  FaSync, 
  FaCheckCircle,
  FaUser,
  FaBox,
  FaCalendarAlt
} from 'react-icons/fa'

interface WorkOrder {
  id: string
  numeroOrden: string
  cliente: string
  detalle: string
  estado: string
  origen: string
  esAsignada: boolean
  timestamp: number
}

export default function WorkerDashboard() {
  const { user } = useAuth()
  
  // Estados
  const [activeTab, setActiveTab] = useState<'solucion1' | 'solucion2'>('solucion1')
  const [viewMode, setViewMode] = useState<'mis-tareas' | 'cola-general'>('cola-general')
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<WorkOrder[]>([])
  const [kpis, setKpis] = useState({ asignadas: 0, completadas: 0, colaGeneral: 0 })

  // --- LOGICA DE TAREAS ---
  const fetchData = async () => {
    setLoading(true)
    try {
      const newOrders: WorkOrder[] = []
      let countAsignadas = 0
      let countCompletadas = 0
      let countCola = 0
      const workerName = user?.name?.toLowerCase() || ''

      if (activeTab === 'solucion1') {
        // --- Solución 1: G5 (Empresa/Particular) ---
        const [snapEmp, snapPart] = await Promise.all([
          getDocs(collection(db, 'comandas_empresa_grupo_5')),
          getDocs(collection(db, 'comandas_particular_grupo_5'))
        ])

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processG5 = (docs: any[], tipo: string) => {
          docs.forEach(doc => {
            const data = doc.data()
            const fases = data.fases || {}
            let esMiTarea = false
            let estadoTarea = data.estado || 'Pendiente'

            Object.values(fases).forEach((fase: any) => {
              if (fase.encargado && fase.encargado.toLowerCase().includes(workerName)) {
                esMiTarea = true
                if (fase.estado === 'completado') countCompletadas++
              }
            })

            let fechaObj = new Date()
            if (data.fechaCreacion) fechaObj = new Date(data.fechaCreacion)

            const order: WorkOrder = {
              id: doc.id,
              numeroOrden: data.numeroOrden || 'S/N',
              cliente: data.cliente?.nombre || 'Cliente G5',
              detalle: `Pedido ${tipo}`,
              estado: estadoTarea,
              origen: `Eq.5 (${tipo})`,
              esAsignada: esMiTarea,
              timestamp: fechaObj.getTime()
            }

            const st = estadoTarea.toLowerCase()
            if (!st.includes('finalizado') && !st.includes('entregado')) {
              countCola++
              if (esMiTarea && !st.includes('completado')) countAsignadas++
            }
            newOrders.push(order)
          })
        }
        processG5(snapEmp.docs, 'Empresa')
        processG5(snapPart.docs, 'Particular')

      } else {
        // --- Solución 2: G2 (Comandas) + G3 (Seguimiento) ---
        const [snapG2, snapSeguimiento] = await Promise.all([
          getDocs(collection(db, 'comandas_2')),
          getDocs(collection(db, 'seguimiento_3'))
        ])

        // Crear mapa de seguimiento para búsqueda rápida
        const seguimientoMap = new Map()
        snapSeguimiento.forEach(doc => {
          const data = doc.data()
          if (data.numeroOrden) seguimientoMap.set(data.numeroOrden, data)
          if (data.comanda_id) seguimientoMap.set(data.comanda_id, data)
        })

        snapG2.forEach(doc => {
          const data = doc.data()
          const estado = data.estado || 'Pendiente'
          
          // Buscar asignación en seguimiento_3
          let esMiTarea = false
          const segData = seguimientoMap.get(data.numeroOrden) || seguimientoMap.get(doc.id)
          
          if (segData) {
            // Verificamos si el usuario está en 'operariosAsignados' o en 'desmanche'
            if (segData.operariosAsignados && segData.operariosAsignados[user?.uid || '']) esMiTarea = true
            if (segData.desmanche?.operarioNombre?.toLowerCase().includes(workerName)) esMiTarea = true
          }

          let fechaObj = new Date()
          if (data.fechaIngreso?.seconds) fechaObj = new Date(data.fechaIngreso.seconds * 1000)

          const order: WorkOrder = {
            id: doc.id,
            numeroOrden: data.numeroOrden || 'ORD-G2',
            cliente: data.nombreCliente || 'Cliente G2',
            detalle: `${data.prendas?.length || 0} prendas`,
            estado: estado,
            origen: 'Eq.2 + Eq.3',
            esAsignada: esMiTarea,
            timestamp: fechaObj.getTime()
          }

          const st = estado.toLowerCase()
          if (st === 'activa' || st === 'en proceso') {
            countCola++
            if (esMiTarea) countAsignadas++
          }
          newOrders.push(order)
        })
      }

      newOrders.sort((a, b) => b.timestamp - a.timestamp)
      setOrders(newOrders)
      setKpis({ asignadas: countAsignadas, completadas: countCompletadas, colaGeneral: countCola })
    } catch (error) {
      console.error("Worker data error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [activeTab, user])

  const filteredOrders = viewMode === 'mis-tareas' 
    ? orders.filter(o => o.esAsignada)
    : orders

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-slate-800">Panel de Operaciones</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">Bienvenido, {user?.name}</p>
        </div>
        
        <div className="flex flex-row gap-2 w-full md:w-auto">
            <button onClick={fetchData} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-[#ff6b35] transition-colors shadow-sm">
              <FaSync className={loading ? "animate-spin" : ""} />
            </button>
        </div>
      </div>

      {/* Tabs Solución */}
      <div className="w-full overflow-x-auto pb-1 sm:pb-0">
        <div className="bg-slate-100 p-1 rounded-xl flex w-fit">
            <button onClick={() => setActiveTab('solucion1')} className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'solucion1' ? 'bg-white text-[#ff6b35] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            Solución 1
            </button>
            <button onClick={() => setActiveTab('solucion2')} className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'solucion2' ? 'bg-white text-[#ff6b35] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            Solución 2
            </button>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center"><Loader text="Cargando tareas..." /></div>
      ) : (
        <div className="space-y-6 animate-fadeIn">
          
          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden col-span-2 md:col-span-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider z-10 relative">Pendientes Planta</p>
              <p className="text-3xl font-bold text-blue-600 mt-1 z-10 relative">{kpis.colaGeneral}</p>
              <FaClipboardList className="absolute -right-4 -bottom-4 text-6xl text-blue-50 opacity-50" />
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider z-10 relative">Mis Asignaciones</p>
              <p className="text-3xl font-bold text-[#ff6b35] mt-1 z-10 relative">{kpis.asignadas}</p>
              <FaUser className="absolute -right-4 -bottom-4 text-6xl text-orange-50 opacity-50" />
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider z-10 relative">Mis Completadas</p>
              <p className="text-3xl font-bold text-green-600 mt-1 z-10 relative">{kpis.completadas}</p>
              <FaCheckCircle className="absolute -right-4 -bottom-4 text-6xl text-green-50 opacity-50" />
            </div>
          </div>

          {/* Filtro Vista */}
          <div className="flex border-b border-slate-200 overflow-x-auto">
            <button onClick={() => setViewMode('cola-general')} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${viewMode === 'cola-general' ? 'border-[#ff6b35] text-[#ff6b35]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              Cola General
            </button>
            <button onClick={() => setViewMode('mis-tareas')} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${viewMode === 'mis-tareas' ? 'border-[#ff6b35] text-[#ff6b35]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              Mis Asignaciones
            </button>
          </div>

          {/* Lista */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-md tracking-wide">{order.origen}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${order.estado.toLowerCase().includes('completado') ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{order.estado}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#ff6b35] transition-colors">{order.numeroOrden}</h3>
                    {order.esAsignada && <span className="text-[10px] bg-[#ff6b35] text-white px-2 py-0.5 rounded-full font-bold">ASIGNADA</span>}
                  </div>
                  <p className="text-sm text-slate-500 mb-1 flex items-center gap-2"><FaUser className="text-xs opacity-50" /> {order.cliente}</p>
                  <p className="text-xs text-slate-400 mb-4 flex items-center gap-2"><FaCalendarAlt className="text-[10px]" /> {new Date(order.timestamp).toLocaleDateString()}</p>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-500 flex items-center gap-1 font-medium"><FaBox className="text-slate-400" /> {order.detalle}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <FaClipboardList className="mx-auto text-3xl mb-2 opacity-20" />
                <p className="text-slate-500 font-medium">No hay tareas aquí</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}