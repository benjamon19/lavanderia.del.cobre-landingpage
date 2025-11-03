// src/pages/intranet/IntranetLayout.tsx
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import IntranetNavbar from './components/IntranetNavbar'
import Sidebar from './components/Sidebar'
import AdminDashboard from './modules/AdminDashboard'
import WorkerDashboard from './modules/WorkerDashboard'
import TrackingModule from './modules/TrackingModule'
import OrdersModule from './modules/OrdersModule'
import ManagementModule from './modules/ManagementModule'
import MyOrdersModule from './modules/MyOrdersModule'
import UsersModule from './modules/UsersModule'

export default function IntranetLayout() {
  const { user, isAuthenticated } = useAuth()
  const [activeModule, setActiveModule] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Si el usuario es cliente, siempre mostrar mis pedidos
  useEffect(() => {
    if (user?.role === 'client') {
      setActiveModule('my-orders')
    }
  }, [user])

  // IMPORTANTE: Todos los hooks deben estar ANTES de cualquier return condicional
  // Si no está autenticado, redirigir al home
  if (!isAuthenticated && !localStorage.getItem('user')) {
    return <Navigate to="/" replace />
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleModuleChange = (module: string) => {
    setActiveModule(module)
  }

  // Renderizar el módulo activo
  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        if (user?.role === 'admin') return <AdminDashboard />
        if (user?.role === 'worker') return <WorkerDashboard />
        return <AdminDashboard />
      
      case 'tracking':
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
        if (user?.role === 'client') return <MyOrdersModule />
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-white">
      <IntranetNavbar onToggleSidebar={toggleSidebar} />
      
      <div className="flex pt-16">
        <Sidebar 
          activeModule={activeModule} 
          onModuleChange={handleModuleChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  )
}
