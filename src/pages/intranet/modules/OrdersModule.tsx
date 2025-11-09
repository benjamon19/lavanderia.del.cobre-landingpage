// src/pages/intranet/modules/OrdersModule.tsx
import { useSearchParams } from 'react-router-dom'
import { ListaComandasModule, RegistroComandaModule, DetalleComandaModule } from './comandas'

export default function OrdersModule() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabFromUrl = searchParams.get('tab') as 'equipo5' | 'equipo2' | null
  const view = searchParams.get('view')
  const id = searchParams.get('id')
  const activeTab = tabFromUrl || 'equipo2'
  
  const handleTabChange = (tab: 'equipo5' | 'equipo2') => {
    setSearchParams({ tab })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2c2c3e] mb-2">Sistema de Comandas</h1>
        <p className="text-[#6b6b7e]">Gestión de comandas y facturación de pedidos</p>
      </div>

      {/* Pestañas */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => handleTabChange('equipo5')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'equipo5'
              ? 'bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white shadow-lg'
              : 'bg-white text-[#6b6b7e] hover:bg-[#fff4f0] border-2 border-[#f0f0f5]'
          }`}
        >
          Equipo 5
        </button>
        <button
          onClick={() => handleTabChange('equipo2')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'equipo2'
              ? 'bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white shadow-lg'
              : 'bg-white text-[#6b6b7e] hover:bg-[#fff4f0] border-2 border-[#f0f0f5]'
          }`}
        >
          Equipo 2
        </button>
      </div>

      {/* Contenido de pestañas */}
      {activeTab === 'equipo5' && (
        <div className="bg-white rounded-2xl shadow-sm border border-[#f0f0f5] p-8">
          <h2 className="text-2xl font-bold text-[#2c2c3e] mb-4">Comandas - Equipo 5</h2>
          <p className="text-[#6b6b7e] mb-6">Gestión de comandas para el Equipo 5</p>
          {/* Aquí irá el contenido específico del Equipo 5 */}
          <div className="text-center py-12 text-[#6b6b7e]">
            <p>Contenido del Equipo 5 en desarrollo</p>
          </div>
        </div>
      )}
      
      {activeTab === 'equipo2' && (
        <>
          {view === 'registro' ? (
            <RegistroComandaModule />
          ) : view === 'detalle' && id ? (
            <DetalleComandaModule comandaId={id} />
          ) : (
            <ListaComandasModule />
          )}
        </>
      )}
    </div>
  )
}
