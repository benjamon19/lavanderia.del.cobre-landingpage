// src/pages/intranet/modules/comandas/ListaComandasModule.tsx
import { useState, useEffect } from 'react'
import { dbComandas } from '../../../../config/firebaseComandas'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaEye, FaDownload, FaBell } from 'react-icons/fa'

interface Comanda {
  id: string
  numeroOrden: string
  nombreCliente: string
  tipoCliente: string
  fechaIngreso: any
  montoTotal: number
}

export default function ListaComandasModule() {
  const navigate = useNavigate()
  const [comandas, setComandas] = useState<Comanda[]>([])
  const [loading, setLoading] = useState(true)

  const [filtroFecha, setFiltroFecha] = useState(() => {
    const hoy = new Date()
    const offset = hoy.getTimezoneOffset()
    return new Date(hoy.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0]
  })
  const [filtroTipo, setFiltroTipo] = useState('Todos')

  useEffect(() => {
    setLoading(true)
    let q = query(collection(dbComandas, "comandas"), orderBy("fechaIngreso", "desc"))

    if (filtroTipo !== 'Todos') {
      q = query(q, where("tipoCliente", "==", filtroTipo))
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comandasList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comanda[]
      
      const comandasFiltradas = comandasList.filter(comanda => {
        if (!filtroFecha) return true
        const fechaComanda = comanda.fechaIngreso?.toDate().toISOString().split('T')[0]
        return fechaComanda === filtroFecha
      })

      setComandas(comandasFiltradas)
      setLoading(false)
    }, (error) => {
      console.error("Error al cargar comandas:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [filtroFecha, filtroTipo])

  const handleVerDetalle = (id: string) => {
    navigate(`/intranet/orders?tab=equipo2&view=detalle&id=${id}`)
  }

  const handleCrearComanda = () => {
    navigate('/intranet/orders?tab=equipo2&view=registro')
  }

  return (
    <div className="space-y-4 md:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2c2c3e]">
          Comandas Equipo 2
        </h1>
        <button
          onClick={handleCrearComanda}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
        >
          <FaPlus className="text-sm sm:text-base" />
          <span>Crear Comanda</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[#f0f0f5]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2c2c3e]">
            Lista de Comandas
          </h2>
          
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="w-full">
            <label className="block text-xs sm:text-sm font-medium text-[#6b6b7e] mb-1 sm:mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#e0e0e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            />
          </div>
          <div className="w-full">
            <label className="block text-xs sm:text-sm font-medium text-[#6b6b7e] mb-1 sm:mb-2">
              Tipo de Cliente
            </label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#e0e0e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            >
              <option value="Todos">Todos los tipos</option>
              <option value="Particular">Particular</option>
              <option value="Empresa">Empresa</option>
              <option value="Hotel">Hotel</option>
              <option value="Restaurante">Restaurante</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Comandas */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#f0f0f5] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-8 sm:py-12">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#ff6b35]"></div>
            </div>
          ) : comandas.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-[#6b6b7e] text-sm sm:text-base">
              <p>No hay comandas para mostrar</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {comandas.map((comanda) => (
                <div
                  key={comanda.id}
                  className="flex flex-col p-3 sm:p-4 border border-[#f0f0f5] rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start w-full mb-2">
                    <div>
                      <h3 className="font-semibold text-[#2c2c3e] text-sm sm:text-base">
                        #{comanda.numeroOrden}
                      </h3>
                      <p className="text-sm text-[#6b6b7e] line-clamp-1">
                        {comanda.nombreCliente}
                      </p>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-[#2c2c3e] whitespace-nowrap ml-2">
                      S/. {comanda.montoTotal?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {comanda.tipoCliente}
                      </span>
                      <span className="text-[#6b6b7e]">
                        {comanda.fechaIngreso?.toDate().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVerDetalle(comanda.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm bg-[#f8f9fa] text-[#2c2c3e] rounded-lg hover:bg-[#f0f0f5] transition-colors"
                      >
                        <FaEye className="text-[#6b6b7e] text-xs sm:text-sm" />
                        <span className="hidden sm:inline">Ver</span>
                      </button>
                      <button
                        className="p-1.5 sm:p-2 rounded-lg bg-[#f0f0f5] hover:bg-[#e0e0e5] transition-colors"
                        title="Descargar"
                      >
                        <FaDownload className="text-[#6b6b7e] text-sm sm:text-base" />
                      </button>
                      <button
                        className="p-1.5 sm:p-2 rounded-lg bg-[#f0f0f5] hover:bg-[#e0e0e5] transition-colors"
                        title="Notificar"
                      >
                        <FaBell className="text-[#6b6b7e] text-sm sm:text-base" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
