// src/pages/intranet/modules/comandas/DetalleComandaModule.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { dbComandas } from '../../../../config/firebaseComandas'
import { doc, getDoc } from 'firebase/firestore'
import { FaArrowLeft, FaUser, FaPhone, FaMapMarkerAlt, FaCalendar, FaShoppingBag, FaImage, FaDollarSign, FaBolt } from 'react-icons/fa'

interface Prenda {
  cantidad: number
  nombre: string
  valor: string
  detalle: string
}

interface Comanda {
  id: string
  numeroOrden: string
  nombreCliente: string
  telefono: string
  direccion?: string
  tipoCliente: string
  fechaIngreso: any
  servicioExpress: boolean
  prendas: Prenda[]
  montoSubtotal: number
  montoTotal: number
  fotos?: string[]
}

interface DetalleComandaModuleProps {
  comandaId?: string
}

export default function DetalleComandaModule({ comandaId }: DetalleComandaModuleProps = {}) {
  const { id: paramId } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const searchId = searchParams.get('id')
  const id = comandaId || paramId || searchId
  const navigate = useNavigate()
  const [comanda, setComanda] = useState<Comanda | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComanda = async () => {
      if (!id) return
      
      try {
        const docRef = doc(dbComandas, "comandas", id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setComanda({ id: docSnap.id, ...docSnap.data() } as Comanda)
        } else {
          alert("No se encontró la comanda")
          navigate('/intranet/orders?tab=equipo2')
        }
      } catch (error) {
        console.error("Error:", error)
        alert("Error al cargar la comanda")
        navigate('/intranet/orders?tab=equipo2')
      } finally {
        setLoading(false)
      }
    }
    fetchComanda()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#ff6b35] mx-auto mb-4"></div>
          <p className="text-[#6b6b7e] font-medium">Cargando detalle...</p>
        </div>
      </div>
    )
  }

  if (!comanda) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/intranet/orders?tab=equipo2')}
          className="p-2 rounded-lg hover:bg-[#f0f0f5] text-[#6b6b7e] transition-colors"
        >
          <FaArrowLeft className="text-xl" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[#2c2c3e]">
            Detalle de Comanda
          </h1>
          <p className="text-[#6b6b7e] font-mono">{comanda.numeroOrden}</p>
        </div>
      </div>

      {/* Información del cliente */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#f0f0f5] p-6">
        <h2 className="text-xl font-bold text-[#2c2c3e] mb-6 flex items-center gap-2">
          <FaUser className="text-[#ff6b35]" />
          Información del Cliente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-[#fff4f0] rounded-lg">
              <FaUser className="text-[#ff6b35]" />
            </div>
            <div>
              <p className="text-sm text-[#6b6b7e] font-semibold">Nombre</p>
              <p className="text-[#2c2c3e] font-bold">{comanda.nombreCliente}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-3 bg-[#fff4f0] rounded-lg">
              <FaPhone className="text-[#ff6b35]" />
            </div>
            <div>
              <p className="text-sm text-[#6b6b7e] font-semibold">Teléfono</p>
              <p className="text-[#2c2c3e] font-bold">{comanda.telefono}</p>
            </div>
          </div>
          {comanda.direccion && (
            <div className="flex items-start gap-3 md:col-span-2">
              <div className="p-3 bg-[#fff4f0] rounded-lg">
                <FaMapMarkerAlt className="text-[#ff6b35]" />
              </div>
              <div>
                <p className="text-sm text-[#6b6b7e] font-semibold">Dirección</p>
                <p className="text-[#2c2c3e] font-bold">{comanda.direccion}</p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <div className="p-3 bg-[#fff4f0] rounded-lg">
              <FaCalendar className="text-[#ff6b35]" />
            </div>
            <div>
              <p className="text-sm text-[#6b6b7e] font-semibold">Fecha de Ingreso</p>
              <p className="text-[#2c2c3e] font-bold">
                {comanda.fechaIngreso?.toDate?.().toLocaleDateString('es-CL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-3 bg-[#fff4f0] rounded-lg">
              <FaShoppingBag className="text-[#ff6b35]" />
            </div>
            <div>
              <p className="text-sm text-[#6b6b7e] font-semibold">Tipo de Cliente</p>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                comanda.tipoCliente === 'Hotel' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {comanda.tipoCliente}
              </span>
            </div>
          </div>
          {comanda.servicioExpress && (
            <div className="flex items-start gap-3 md:col-span-2">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaBolt className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-[#6b6b7e] font-semibold">Servicio</p>
                <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Servicio Express (+50%)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prendas */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#f0f0f5] p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-[#2c2c3e] mb-4 md:mb-6 flex items-center gap-2">
          <FaShoppingBag className="text-[#ff6b35]" />
          Prendas
        </h2>
        
        {/* Vista móvil - Cards */}
        <div className="block md:hidden space-y-3">
          {comanda.prendas?.map((item, index) => (
            <div key={index} className="bg-[#f8f9fa] rounded-xl p-4 border border-[#f0f0f5]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-[#2c2c3e] text-base">{item.nombre}</p>
                  <p className="text-sm text-[#6b6b7e]">Cantidad: <span className="font-semibold text-[#2c2c3e]">{item.cantidad}x</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#6b6b7e]">Valor Unit.</p>
                  <p className="text-sm font-semibold text-[#2c2c3e]">
                    ${new Intl.NumberFormat('es-CL').format(parseFloat(item.valor) || 0)}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#e0e0e5]">
                <p className="text-sm text-[#6b6b7e]">
                  {item.detalle ? <span className="italic">{item.detalle}</span> : '-'}
                </p>
                <p className="text-lg font-bold text-[#ff6b35]">
                  ${new Intl.NumberFormat('es-CL').format((parseFloat(item.valor) || 0) * item.cantidad)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vista desktop - Tabla */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8f9fa] border-b-2 border-[#f0f5f5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#6b6b7e] uppercase">Cantidad</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#6b6b7e] uppercase">Prenda</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#6b6b7e] uppercase">Valor Unitario</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#6b6b7e] uppercase">Subtotal</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#6b6b7e] uppercase">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f5]">
              {comanda.prendas?.map((item, index) => (
                <tr key={index} className="hover:bg-[#fff4f0] transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-[#2c2c3e]">
                    {item.cantidad}x
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2c2c3e]">
                    {item.nombre}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6b6b7e]">
                    ${new Intl.NumberFormat('es-CL').format(parseFloat(item.valor) || 0)}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#ff6b35]">
                    ${new Intl.NumberFormat('es-CL').format((parseFloat(item.valor) || 0) * item.cantidad)}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6b6b7e] italic">
                    {item.detalle || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fotos */}
      {comanda.fotos && comanda.fotos.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#f0f0f5] p-6">
          <h2 className="text-xl font-bold text-[#2c2c3e] mb-6 flex items-center gap-2">
            <FaImage className="text-[#ff6b35]" />
            Fotos Adjuntas ({comanda.fotos.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {comanda.fotos.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border-2 border-[#f0f0f5] hover:border-[#ff6b35] transition-all"
              >
                <img
                  src={url}
                  alt="Prenda"
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    Ver imagen
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Resumen de Montos */}
      <div className="bg-gradient-to-r from-[#fff4f0] to-[#ffded0] rounded-2xl shadow-sm border-2 border-[#ff6b35] p-6">
        <h2 className="text-xl font-bold text-[#2c2c3e] mb-6 flex items-center gap-2">
          <FaDollarSign className="text-[#ff6b35]" />
          Resumen de Pago
        </h2>
        <div className="space-y-3">
          {comanda.servicioExpress && (
            <>
              <div className="flex justify-between items-center text-[#6b6b7e]">
                <span className="font-semibold">Subtotal:</span>
                <span className="text-lg font-bold">
                  ${new Intl.NumberFormat('es-CL').format(comanda.montoSubtotal)}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#6b6b7e]">
                <span className="font-semibold">Recargo Express (50%):</span>
                <span className="text-lg font-bold">
                  +${new Intl.NumberFormat('es-CL').format(comanda.montoTotal - comanda.montoSubtotal)}
                </span>
              </div>
              <div className="border-t-2 border-[#ff6b35] pt-3"></div>
            </>
          )}
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-[#2c2c3e]">TOTAL A PAGAR:</span>
            <span className="text-3xl font-bold text-[#ff6b35]">
              ${new Intl.NumberFormat('es-CL').format(comanda.montoTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
