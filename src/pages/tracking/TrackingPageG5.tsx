// src/pages/tracking/TrackingPageG5.tsx
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
import TrackingHeader from './components/TrackingHeader'
// Importamos todos los iconos necesarios
import {
    FaCheckCircle,
    FaClock,
    FaCircle,
    FaUser,
    FaCalendarAlt,
    FaTruck,
    FaCheck,
    FaSpinner,
    FaClipboardList,
    FaExclamationCircle
} from 'react-icons/fa'

interface FaseData {
    estado: string
    tiempoEstimado?: number
    tiempoReal?: number
    encargado?: string
}

interface ComandaData {
    id: string
    numeroOrden: string
    tipo: string
    estado: string
    faseActual: string
    fechaCreacion: string | any
    despacho: boolean
    cliente: {
        nombre: string
        telefono: string
    }
    fases: Record<string, FaseData>
    collection: string
}

export default function TrackingPageG5() {
    const { code } = useParams<{ code: string }>()
    const [comanda, setComanda] = useState<ComandaData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const buscarComanda = async () => {
            if (!code) {
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)

            try {
                const codigoBuscado = code.toUpperCase().trim()

                const qEmpresa = query(
                    collection(db, 'comandas_empresa_grupo_5'),
                    where('numeroOrden', '==', codigoBuscado)
                )

                const qParticular = query(
                    collection(db, 'comandas_particular_grupo_5'),
                    where('numeroOrden', '==', codigoBuscado)
                )

                const [snapEmpresa, snapParticular] = await Promise.all([
                    getDocs(qEmpresa),
                    getDocs(qParticular)
                ])

                let docFound = null
                let collectionName = ''

                if (!snapEmpresa.empty) {
                    docFound = snapEmpresa.docs[0]
                    collectionName = 'comandas_empresa_grupo_5'
                } else if (!snapParticular.empty) {
                    docFound = snapParticular.docs[0]
                    collectionName = 'comandas_particular_grupo_5'
                }

                if (docFound) {
                    const data = docFound.data()
                    setComanda({
                        id: docFound.id,
                        ...data,
                        collection: collectionName
                    } as ComandaData)
                } else {
                    setError('No se encontró ninguna comanda con ese código.')
                }
            } catch (err) {
                console.error('Error al buscar comanda:', err)
                setError('Ocurrió un error al buscar el pedido.')
            } finally {
                setLoading(false)
            }
        }

        buscarComanda()
    }, [code])

    const getEstadoFase = (fase: string, faseActual: string, fases: any) => {
        const orden = ['analisis', 'lavado', 'planchado', 'embolsado', 'despacho']
        const indexFase = orden.indexOf(fase)
        const indexActual = orden.indexOf(faseActual || 'analisis')

        if (indexFase < indexActual) return 'completado'
        if (indexFase === indexActual) return (fases && fases[fase]?.estado) || 'pendiente'
        return 'pendiente'
    }

    const formatearFase = (fase: string) => {
        const nombres: Record<string, string> = {
            analisis: 'Análisis',
            lavado: 'Lavado',
            planchado: 'Planchado',
            embolsado: 'Embolsado',
            despacho: 'Despacho'
        }
        return nombres[fase] || fase
    }

    const formatDate = (dateInput: any) => {
        if (!dateInput) return ''
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput.toDate ? dateInput.toDate() : new Date()
        return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-white">
            {/* AQUÍ ESTÁ EL ARREGLO DEL BUSCADOR: pasamos basePath */}
            <TrackingHeader trackingCode={code || 'N/A'} basePath="/tracking-g5" />

            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                {loading && (
                    <div className="bg-white rounded-2xl shadow-sm p-12 border border-[#f0f0f5] flex flex-col items-center justify-center">
                        <FaSpinner className="animate-spin text-4xl text-[#ff6b35] mb-4" />
                        <p className="text-[#6b6b7e] font-medium">Buscando pedido...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-white rounded-2xl shadow-sm p-8 border border-red-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
                            <FaExclamationCircle className="text-3xl" />
                        </div>
                        <p className="text-red-600 font-bold text-lg mb-2">{error}</p>
                        <p className="text-gray-500 mb-6">Verifica que el código sea correcto (ej: EMP-1).</p>
                        <Link to="/" className="text-[#ff6b35] font-semibold hover:underline">Volver al inicio</Link>
                    </div>
                )}

                {!loading && !error && comanda && (
                    <div className="space-y-6 animate-fadeIn">

                        {/* Tarjeta Principal */}
                        <div className="bg-white rounded-3xl shadow-lg border border-[#f0f0f5] overflow-hidden">
                            <div className="p-6 md:p-8 border-b border-[#f0f0f5]">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${comanda.tipo === 'Empresa' ? 'bg-orange-100 text-orange-700' : 'bg-indigo-100 text-indigo-700'
                                                }`}>
                                                {comanda.tipo === 'Empresa' ? <FaClipboardList /> : <FaUser />}
                                                {comanda.tipo === 'Empresa' ? 'Empresa' : 'Particular'}
                                            </span>
                                        </div>
                                        <h1 className="text-4xl font-extrabold text-[#1a1a2e] tracking-tight">{comanda.numeroOrden}</h1>
                                    </div>

                                    {comanda.estado === 'Finalizado' ? (
                                        <div className="w-full md:w-auto bg-green-50 border border-green-100 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm">
                                            <div className="bg-green-500 text-white p-2 rounded-full">
                                                <FaCheckCircle className="text-xl" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg leading-tight">¡Listo para retirar!</p>
                                                <p className="text-xs text-green-600 font-medium mt-0.5">Proceso finalizado con éxito</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full md:w-auto bg-blue-50 border border-blue-100 text-blue-800 px-6 py-4 rounded-2xl shadow-sm">
                                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Fase Actual</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-2xl font-bold">{formatearFase(comanda.faseActual || 'analisis')}</p>
                                                <div className="animate-pulse w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                                            </div>
                                            {comanda.fases?.[comanda.faseActual || 'analisis']?.tiempoEstimado ? (
                                                <p className="text-sm mt-1 flex items-center gap-1.5 opacity-80 font-medium">
                                                    <FaClock /> Aprox. {comanda.fases[comanda.faseActual].tiempoEstimado} min
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="p-6 md:p-8 bg-[#f8f9fc] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#ff6b35] text-xl">
                                        <FaUser />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#6b6b7e] uppercase font-bold tracking-wider mb-0.5">Cliente</p>
                                        <p className="font-semibold text-[#1a1a2e]">{comanda.cliente.nombre}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#ff6b35] text-xl">
                                        <FaCalendarAlt />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#6b6b7e] uppercase font-bold tracking-wider mb-0.5">Fecha Emisión</p>
                                        <p className="font-semibold text-[#1a1a2e]">{formatDate(comanda.fechaCreacion)}</p>
                                    </div>
                                </div>
                                {comanda.despacho && (
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#ff6b35] text-xl">
                                            <FaTruck />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#6b6b7e] uppercase font-bold tracking-wider mb-0.5">Entrega</p>
                                            <p className="font-semibold text-[#1a1a2e]">Despacho a Domicilio</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white rounded-3xl shadow-lg border border-[#f0f0f5] p-6 md:p-8">
                            <h3 className="text-xl font-bold text-[#1a1a2e] mb-8 flex items-center gap-2">
                                <FaClipboardList className="text-[#ff6b35]" /> Estado del Proceso
                            </h3>

                            <div className="relative pl-2 md:pl-4">
                                <div className="absolute left-[27px] md:left-[35px] top-5 bottom-5 w-0.5 bg-gray-100" />

                                {['analisis', 'lavado', 'planchado', 'embolsado', 'despacho'].map((fase) => {
                                    if (fase === 'despacho' && !comanda.despacho) return null;

                                    const estado = getEstadoFase(fase, comanda.faseActual, comanda.fases);
                                    const datosFase = (comanda.fases && comanda.fases[fase]) || {};
                                    const isActive = estado === 'en_proceso';
                                    const isCompleted = estado === 'completado';

                                    return (
                                        <div key={fase} className="relative flex gap-4 md:gap-6 mb-8 last:mb-0 group">
                                            <div className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border-[3px] transition-all duration-300 shadow-sm ${isCompleted ? 'bg-green-50 border-green-500 text-green-500' :
                                                isActive ? 'bg-blue-50 border-blue-500 text-blue-500 scale-110 shadow-md' :
                                                    'bg-white border-gray-200 text-gray-300'
                                                }`}>
                                                {isCompleted ? <FaCheck className="text-2xl" /> :
                                                    isActive ? <FaClock className="text-2xl animate-pulse" /> :
                                                        <FaCircle className="text-xs" />}
                                            </div>

                                            <div className={`flex-1 pt-2 transition-opacity duration-300 ${isCompleted ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}>
                                                <h4 className={`text-lg md:text-xl font-bold mb-1 ${isActive ? 'text-blue-600' :
                                                    isCompleted ? 'text-green-600' : 'text-gray-400'
                                                    }`}>
                                                    {formatearFase(fase)}
                                                </h4>

                                                {isCompleted && (
                                                    <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 inline-flex px-3 py-1 rounded-lg text-sm">
                                                        <FaCheckCircle className="text-sm" />
                                                        <span>Completado {datosFase.tiempoReal ? `en ${datosFase.tiempoReal} min` : ''}</span>
                                                    </div>
                                                )}

                                                {isActive && (
                                                    <div className="mt-3 bg-blue-50 p-4 rounded-xl border border-blue-100 animate-fadeIn">
                                                        <p className="text-blue-700 font-bold text-sm flex items-center gap-2 mb-1">
                                                            <FaSpinner className="animate-spin" /> Procesando actualmente...
                                                        </p>
                                                        {datosFase.encargado && (
                                                            <p className="text-xs text-blue-500 flex items-center gap-1">
                                                                <FaUser className="text-[10px]" /> Operador: {datosFase.encargado}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                {estado === 'pendiente' && (
                                                    <p className="text-sm text-gray-400 italic">Pendiente</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                                <p className="text-xs sm:text-sm md:text-base text-[#6b6b7e] text-center sm:text-right">
                                    ¿Tienes alguna pregunta sobre tu pedido?
                                </p>
                                <button
                                    onClick={() => window.location.href = '/#contacto'}
                                    className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg font-semibold text-sm sm:text-base whitespace-nowrap"
                                >
                                    Contáctanos
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}