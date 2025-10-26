// src/pages/intranet/components/Sidebar.tsx
import type { ReactNode } from 'react'
import { FaClipboardList, FaFileInvoice, FaBox, FaShoppingBag, FaTimes } from 'react-icons/fa'
import { useAuth } from '../../../context/AuthContext'

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
  isOpen: boolean
  onClose: () => void
}

interface MenuItem {
  id: string
  label: string
  icon: ReactNode
  roles: Array<'admin' | 'worker' | 'client'>
}

export default function Sidebar({ activeModule, onModuleChange, isOpen, onClose }: SidebarProps) {
  const { user } = useAuth()

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaClipboardList />,
      roles: ['admin', 'worker']
    },
    {
      id: 'tracking',
      label: 'Seguimiento de Órdenes',
      icon: <FaClipboardList />,
      roles: ['admin', 'worker']
    },
    {
      id: 'orders',
      label: 'Sistema de Comandas',
      icon: <FaFileInvoice />,
      roles: ['admin', 'worker']
    },
    {
      id: 'management',
      label: 'Gestión Interna',
      icon: <FaBox />,
      roles: ['admin']
    },
    {
      id: 'my-orders',
      label: 'Mis Pedidos',
      icon: <FaShoppingBag />,
      roles: ['client']
    }
  ]

  const filteredItems = menuItems.filter(item =>
    user?.role && item.roles.includes(user.role)
  )

  const handleItemClick = (moduleId: string) => {
    onModuleChange(moduleId)
    onClose()
  }

  return (
    <>
      {/* Overlay difuminado */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 sm:w-72 bg-white shadow-xl z-50
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r-2 border-[#f0f0f5]
      `}>
        
        {/* Header del sidebar con botón cerrar */}
        <div className="h-16 bg-white border-b-2 border-[#f0f0f5] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {/* Logo y nombre - solo visible en móvil */}
            <img 
              src="/logo.png" 
              alt="Lavandería el Cobre" 
              className="w-10 h-10 object-contain sm:hidden"
            />
            <div>
              <p className="text-xs text-[#6b6b7e]">Sistema Intranet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#fff4f0] text-[#6b6b7e] hover:text-[#ff6b35] transition-colors"
            aria-label="Cerrar menú"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        {/* Menú de navegación */}
        <nav className="p-4">
          <p className="text-xs font-semibold text-[#6b6b7e] uppercase mb-4 px-4 tracking-wide">
            Menú Principal
          </p>
          <ul className="space-y-2">
            {filteredItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    font-semibold transition-all
                    ${activeModule === item.id
                      ? 'bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white shadow-lg'
                      : 'text-[#2c2c3e] hover:bg-[#fff4f0] hover:text-[#ff6b35]'
                    }
                  `}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span className="text-sm text-left flex-1">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del sidebar */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-[#fff4f0] border-2 border-[#ffded0] rounded-xl p-4">
            <p className="text-xs text-[#2c2c3e] font-semibold">
              Sistema Intranet v1.0
            </p>
            <p className="text-xs text-[#6b6b7e] mt-1">
              Lavandería el Cobre
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}