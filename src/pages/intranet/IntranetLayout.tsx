// src/pages/intranet/IntranetLayout.tsx
import { useState, useEffect, useRef } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import IntranetNavbar from './components/IntranetNavbar'
import Sidebar from './components/Sidebar'
import AdminDashboard from './modules/AdminDashboard'
import WorkerDashboard from './modules/WorkerDashboard'
import RecepcionistaDashboard from './modules/RecepcionistaDashboard'
import TrackingModule from './modules/TrackingModule'
import OrdersModule from './modules/OrdersModule'
import ManagementModule from './modules/ManagementModule'
import MyOrdersModule from './modules/MyOrdersModule'
import UsersModule from './modules/UsersModule'
import { ListaComandasModule, RegistroComandaModule, DetalleComandaModule } from './modules/comandas'

export default function IntranetLayout() {
  const { user, isAuthenticated, loading } = useAuth()
  const [searchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const previousModuleRef = useRef<string>('')
  
  // Obtener módulo de los parámetros de URL o de la ruta
  const modulo = searchParams.get('modulo') || window.location.pathname.split('/').pop() || 'dashboard'
  const view = searchParams.get('view')
  const id = searchParams.get('id')

  // Determinar el módulo activo
  const activeModule = user?.role === 'Cliente' ? 'my-orders' : modulo

  // Prevenir scroll automático al cambiar de módulo
  useEffect(() => {
    if (previousModuleRef.current && previousModuleRef.current !== activeModule) {
      // Mantener la posición del scroll actual al cambiar de módulo
      const currentScrollY = window.scrollY
      window.scrollTo(0, currentScrollY)
    }
    previousModuleRef.current = activeModule
  }, [activeModule])

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#ff6b35] mx-auto mb-4"></div>
          <p className="text-[#6b6b7e] font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si no está autenticado, redirigir al home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Renderizar el módulo activo
  const renderModule = () => {
    // Para comandas2 (sub-rutas del sistema de comandas), verificar si hay una vista específica
    if (activeModule === 'comandas2') {
      if (view === 'registro') {
        return <RegistroComandaModule />
      } else if (view === 'detalle' && id) {
        return <DetalleComandaModule comandaId={id} />
      } else {
        return <ListaComandasModule />
      }
    }
    
    switch (activeModule) {
      case 'dashboard':
        if (user?.role === 'Administrador') return <AdminDashboard />
        if (user?.role === 'Trabajador') return <WorkerDashboard />
        if (user?.role === 'Recepcionista') return <RecepcionistaDashboard />
        return <AdminDashboard />
      
      case 'seguimiento':
        return <TrackingModule />
      
      case 'orders':
        return <OrdersModule />
      
      case 'management':
        return <ManagementModule />
      
      case 'users':
        return <UsersModule />
      
      case 'my-orders':
        return <MyOrdersModule />
      
      default:
        if (user?.role === 'Cliente') return <MyOrdersModule />
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-white">
      <IntranetNavbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex pt-16">
        <Sidebar 
          activeModule={activeModule}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">
            <div 
              key={activeModule} 
              className="animate-fadeIn"
            >
              {renderModule()}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
