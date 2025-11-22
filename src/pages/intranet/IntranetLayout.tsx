// src/pages/intranet/IntranetLayout.tsx
import { useState, useEffect, useRef } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import IntranetNavbar from './components/IntranetNavbar'
import Sidebar from './components/Sidebar'
import AdminDashboard from './modules/AdminDashboard'
import WorkerDashboard from './modules/WorkerDashboard'
import RecepcionistaDashboard from './modules/RecepcionistaDashboard'
import MyOrdersModule from './modules/MyOrdersModule'
import UsersModule from './modules/UsersModule'

export default function IntranetLayout() {
  const { user, isAuthenticated, loading } = useAuth()
  const [searchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const previousModuleRef = useRef<string>('')
  
  const modulo = searchParams.get('modulo') || window.location.pathname.split('/').pop() || 'dashboard'
  const activeModule = user?.role === 'Cliente' ? 'my-orders' : modulo

  useEffect(() => {
    if (previousModuleRef.current && previousModuleRef.current !== activeModule) {
      window.scrollTo(0, window.scrollY)
    }
    previousModuleRef.current = activeModule
  }, [activeModule])

  if (loading) return <div className="flex justify-center p-10">Cargando...</div>
  if (!isAuthenticated) return <Navigate to="/" replace />

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        if (user?.role === 'Administrador') return <AdminDashboard />
        if (user?.role === 'Trabajador') return <WorkerDashboard />
        if (user?.role === 'Recepcionista') return <RecepcionistaDashboard />
        return <AdminDashboard />
      
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
        <IntranetNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex pt-16">
          <Sidebar 
            activeModule={activeModule}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          {/* CAMBIO AQUÍ: lg:ml-72 para dejar espacio al sidebar fijo */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-72 min-h-[calc(100vh-4rem)]">
            <div className="max-w-7xl mx-auto">
              <div key={activeModule} className="animate-fadeIn">
                {renderModule()}
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }