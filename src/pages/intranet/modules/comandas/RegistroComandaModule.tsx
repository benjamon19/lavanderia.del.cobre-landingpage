// src/pages/intranet/modules/comandas/RegistroComandaModule.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dbComandas, storageComandas } from '../../../../config/firebaseComandas'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FaArrowLeft, FaSave, FaPaperclip, FaPlus, FaTimes, FaImage } from 'react-icons/fa'

interface Prenda {
  cantidad: number
  nombre: string
  valor: string
  detalle: string
}

interface FotoFile extends File {
  preview?: string
}

export default function RegistroComandaModule() {
  const navigate = useNavigate()

  const generarNumeroOrden = () => {
    const hoy = new Date()
    const dia = String(hoy.getDate()).padStart(2, '0')
    const mes = String(hoy.getMonth() + 1).padStart(2, '0')
    const random = Math.floor(1000 + Math.random() * 9000)
    return `ORD-${dia}${mes}-${random}`
  }

  const getFechaLocal = () => {
    const hoy = new Date()
    const offset = hoy.getTimezoneOffset()
    const fechaLocal = new Date(hoy.getTime() - (offset * 60 * 1000))
    return fechaLocal.toISOString().split('T')[0]
  }

  const [numeroOrden, setNumeroOrden] = useState('')
  const [fechaIngreso, setFechaIngreso] = useState(getFechaLocal())
  const [nombreCliente, setNombreCliente] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [tipoCliente, setTipoCliente] = useState('Particular')
  const [servicioExpress, setServicioExpress] = useState(false)
  const [prendas, setPrendas] = useState<Prenda[]>([{ cantidad: 1, nombre: '', valor: '', detalle: '' }])
  const [montoSubtotal, setMontoSubtotal] = useState(0)
  const [montoTotal, setMontoTotal] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [fotos, setFotos] = useState<FotoFile[]>([])

  const PORCENTAJE_EXPRESS = 0.50

  useEffect(() => {
    setNumeroOrden(generarNumeroOrden())
  }, [])

  useEffect(() => {
    const subtotal = prendas.reduce((sum, prenda) => {
      const valorPrenda = parseFloat(prenda.valor) || 0
      const cantidad = parseInt(String(prenda.cantidad)) || 1
      return sum + (valorPrenda * cantidad)
    }, 0)
    setMontoSubtotal(subtotal)
    let totalFinal = subtotal
    if (servicioExpress) {
      totalFinal = subtotal * (1 + PORCENTAJE_EXPRESS)
    }
    setMontoTotal(Math.round(totalFinal))
  }, [prendas, servicioExpress])

  const handlePrendaChange = (index: number, field: keyof Prenda, value: string | number) => {
    const newPrendas = [...prendas]
    newPrendas[index][field] = value as never
    setPrendas(newPrendas)
  }

  const addPrendaRow = () => setPrendas([...prendas, { cantidad: 1, nombre: '', valor: '', detalle: '' }])
  
  const removePrendaRow = (index: number) => {
    if (prendas.length > 1) setPrendas(prendas.filter((_, i) => i !== index))
  }

  const handleGuardar = async () => {
    if (!nombreCliente || !telefono) {
      alert('Falta el nombre del cliente o el teléfono.')
      return
    }
    setIsSubmitting(true)
    try {
      const fotosURLs: string[] = []
      if (fotos.length > 0) {
        const uploadPromises = fotos.map(async (fotoFile) => {
          const storageRef = ref(storageComandas, `comandas/${numeroOrden}/${fotoFile.name}`)
          await uploadBytes(storageRef, fotoFile)
          return await getDownloadURL(storageRef)
        })
        const urls = await Promise.all(uploadPromises)
        fotosURLs.push(...urls)
      }

      await addDoc(collection(dbComandas, 'comandas'), {
        numeroOrden,
        fechaIngreso: Timestamp.fromDate(new Date(fechaIngreso + 'T12:00:00')),
        nombreCliente,
        direccion,
        telefono,
        tipoCliente,
        servicioExpress,
        prendas,
        montoSubtotal,
        montoTotal,
        fotos: fotosURLs
      })

      alert('¡Comanda guardada exitosamente!')
      navigate('/intranet/orders?tab=equipo2')
    } catch (error) {
      console.error("Error:", error)
      alert('Error al guardar. Revisa la consola.')
      setIsSubmitting(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFotos: FotoFile[] = Array.from(files).map(file => {
        const fotoFile = file as FotoFile
        fotoFile.preview = URL.createObjectURL(file)
        return fotoFile
      })
      setFotos([...fotos, ...newFotos])
    }
  }

  const removerFoto = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      {/* Modal de fotos */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-[#f0f0f5]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-[#2c2c3e] flex items-center gap-2">
                  <FaImage className="text-[#ff6b35]" />
                  Adjuntar Fotos
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-[#f0f0f5] text-[#6b6b7e] transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            
            <div className="p-4 md:p-6 space-y-4">
              <div
                onClick={() => document.getElementById('fileInput')?.click()}
                className="border-2 border-dashed border-[#e0e0e5] rounded-xl p-6 md:p-8 text-center cursor-pointer hover:border-[#ff6b35] hover:bg-[#fff4f0] transition-all"
              >
                <FaPaperclip className="text-3xl md:text-4xl text-[#ff6b35] mx-auto mb-3" />
                <p className="text-sm md:text-base text-[#2c2c3e] font-semibold">Seleccionar fotos</p>
                <p className="text-xs md:text-sm text-[#6b6b7e] mt-1">Múltiples archivos</p>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {fotos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                  {fotos.map((foto, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={foto.preview}
                        alt="preview"
                        className="w-full h-24 md:h-32 object-cover rounded-lg border-2 border-[#f0f0f5]"
                      />
                      <button
                        onClick={() => removerFoto(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 md:p-6 border-t border-[#f0f0f5] flex justify-end gap-3">
              <button
                onClick={() => {
                  setFotos([])
                  setShowModal(false)
                }}
                className="px-4 md:px-6 py-2 border border-[#e0e0e5] text-[#6b6b7e] rounded-xl text-sm md:text-base font-semibold hover:bg-[#f0f0f5] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 md:px-6 py-2 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white rounded-xl text-sm md:text-base font-semibold hover:shadow-lg transition-all"
              >
                Confirmar ({fotos.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => navigate('/intranet/orders?tab=equipo2')}
            className="p-2 rounded-lg hover:bg-[#f0f0f5] text-[#6b6b7e] transition-colors flex-shrink-0"
          >
            <FaArrowLeft className="text-lg md:text-xl" />
          </button>
          <h1 className="text-xl md:text-3xl font-bold text-[#2c2c3e]">
            Registro de Comanda
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 border-2 border-[#ff6b35] text-[#ff6b35] rounded-xl text-sm md:text-base font-semibold hover:bg-[#fff4f0] transition-all"
          >
            <FaPaperclip />
            <span>Adjuntar Foto {fotos.length > 0 && `(${fotos.length})`}</span>
          </button>
          <button
            onClick={handleGuardar}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white rounded-xl text-sm md:text-base font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSave />
            <span>{isSubmitting ? 'Subiendo...' : 'Guardar Comanda'}</span>
          </button>
        </div>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#f0f0f5] p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Información básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
              Número de Orden
            </label>
            <input
              type="text"
              value={numeroOrden}
              readOnly
              className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#f8f9fa] border border-[#e0e0e5] rounded-xl text-sm md:text-base text-[#6b6b7e] font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
              Fecha de Ingreso
            </label>
            <input
              type="date"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e0e0e5] rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            />
          </div>
        </div>

        {/* Datos del cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
              Nombre del Cliente <span className="text-[#ff6b35]">*</span>
            </label>
            <input
              type="text"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              placeholder="Ej: Juan Pérez"
              required
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e0e0e5] rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
              Teléfono <span className="text-[#ff6b35]">*</span>
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="+569 1234 5678"
              required
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e0e0e5] rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
              Dirección
            </label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Calle, Número, Comuna"
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e0e0e5] rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            />
          </div>
        </div>

        {/* Tipo de cliente y servicio express */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
              Tipo de Cliente
            </label>
            <select
              value={tipoCliente}
              onChange={(e) => setTipoCliente(e.target.value)}
              className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e0e0e5] rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
            >
              <option value="Particular">Particular</option>
              <option value="Hotel">Hotel</option>
            </select>
          </div>
          <div className="flex items-center md:pt-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={servicioExpress}
                onChange={(e) => setServicioExpress(e.target.checked)}
                className="w-5 h-5 text-[#ff6b35] border-[#e0e0e5] rounded focus:ring-2 focus:ring-[#ff6b35]"
              />
              <span className="text-sm font-semibold text-[#2c2c3e]">
                Servicio Express (+{PORCENTAJE_EXPRESS * 100}%)
              </span>
            </label>
          </div>
        </div>

        {/* Prendas - Vista móvil (Cards) */}
        <div className="block md:hidden">
          <h3 className="text-lg font-bold text-[#2c2c3e] mb-4">Prendas</h3>
          <div className="space-y-3">
            {prendas.map((item, index) => (
              <div key={index} className="bg-[#f8f9fa] rounded-xl p-4 border border-[#f0f0f5] space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-bold text-[#2c2c3e]">Prenda #{index + 1}</span>
                  {prendas.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePrendaRow(index)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#6b6b7e] mb-1">Cantidad</label>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) => handlePrendaChange(index, 'cantidad', e.target.value)}
                      className="w-full px-3 py-2 border border-[#e0e0e5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6b6b7e] mb-1">Valor Unit.</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="$"
                      value={item.valor}
                      onChange={(e) => handlePrendaChange(index, 'valor', e.target.value)}
                      className="w-full px-3 py-2 border border-[#e0e0e5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-[#6b6b7e] mb-1">Nombre de Prenda</label>
                  <input
                    type="text"
                    placeholder="Ej: Pantalón"
                    value={item.nombre}
                    onChange={(e) => handlePrendaChange(index, 'nombre', e.target.value)}
                    className="w-full px-3 py-2 border border-[#e0e0e5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-[#6b6b7e] mb-1">Detalle</label>
                  <input
                    type="text"
                    placeholder="Mancha, rotura..."
                    value={item.detalle}
                    onChange={(e) => handlePrendaChange(index, 'detalle', e.target.value)}
                    className="w-full px-3 py-2 border border-[#e0e0e5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                  />
                </div>
                
                <div className="pt-2 border-t border-[#e0e0e5]">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-[#6b6b7e]">Subtotal:</span>
                    <span className="text-base font-bold text-[#ff6b35]">
                      ${new Intl.NumberFormat('es-CL').format((parseFloat(item.valor) || 0) * item.cantidad)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addPrendaRow}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 text-[#ff6b35] bg-[#fff4f0] hover:bg-[#ffe5d9] rounded-xl font-semibold transition-colors"
          >
            <FaPlus />
            Añadir otra prenda
          </button>
        </div>

        {/* Prendas - Vista desktop (Tabla) */}
        <div className="hidden md:block">
          <h3 className="text-lg font-bold text-[#2c2c3e] mb-4">Prendas</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f8f9fa] border-b-2 border-[#f0f0f5]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#6b6b7e] uppercase">Cant.</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#6b6b7e] uppercase">Prenda</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#6b6b7e] uppercase">Valor Unit.</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-[#6b6b7e] uppercase">Detalle</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f5]">
                {prendas.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={(e) => handlePrendaChange(index, 'cantidad', e.target.value)}
                        className="w-20 px-3 py-2 border border-[#e0e0e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Ej: Pantalón"
                        value={item.nombre}
                        onChange={(e) => handlePrendaChange(index, 'nombre', e.target.value)}
                        className="w-full px-3 py-2 border border-[#e0e0e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        placeholder="$"
                        value={item.valor}
                        onChange={(e) => handlePrendaChange(index, 'valor', e.target.value)}
                        className="w-full px-3 py-2 border border-[#e0e0e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder="Mancha, rotura..."
                        value={item.detalle}
                        onChange={(e) => handlePrendaChange(index, 'detalle', e.target.value)}
                        className="w-full px-3 py-2 border border-[#e0e0e5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {prendas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePrendaRow(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={addPrendaRow}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-[#ff6b35] hover:bg-[#fff4f0] rounded-lg font-semibold transition-colors"
          >
            <FaPlus />
            Añadir otra prenda
          </button>
        </div>

        {/* Fotos adjuntas */}
        {fotos.length > 0 && (
          <div>
            <h3 className="text-base md:text-lg font-bold text-[#2c2c3e] mb-3 md:mb-4 flex items-center gap-2">
              <FaImage className="text-[#ff6b35]" />
              Fotos Adjuntas ({fotos.length})
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
              {fotos.map((foto, index) => (
                <div key={index} className="relative group">
                  <img
                    src={foto.preview}
                    alt="adjunto"
                    className="w-full h-20 md:h-24 object-cover rounded-lg border-2 border-[#f0f0f5]"
                  />
                  <button
                    onClick={() => removerFoto(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resumen de montos */}
        <div className="bg-gradient-to-r from-[#fff4f0] to-[#ffded0] rounded-xl p-4 md:p-6 border-2 border-[#ff6b35]">
          <div className="text-right space-y-2">
            {servicioExpress && (
              <div className="text-xs md:text-sm text-[#6b6b7e]">
                <p>Subtotal: ${new Intl.NumberFormat('es-CL').format(montoSubtotal)}</p>
                <p>+ Recargo Express ({(PORCENTAJE_EXPRESS * 100)}%)</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-1 sm:gap-2">
              <span className="text-sm md:text-base font-semibold text-[#2c2c3e]">MONTO TOTAL A PAGAR:</span>
              <span className="text-2xl md:text-3xl font-bold text-[#ff6b35]">
                ${new Intl.NumberFormat('es-CL').format(montoTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}