// src/pages/intranet/components/Sidebar.tsx
import type { ReactNode } from 'react'
import { FaClipboardList, FaFileInvoice, FaBox, FaShoppingBag } from 'react-icons/fa'
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
    onClose() // Cerrar sidebar en móvil después de seleccionar
  }

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-xl z-30
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-16
        border-r-2 border-[#f0f0f5]
      `}>

        {/* Menú de navegación */}
        <nav className="p-4">
          <p className="text-xs font-semibold text-[#6b6b7e] uppercase mb-4 px-4">
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
          <div className="bg-[#fff4f0] border border-[#ffded0] rounded-xl p-4">
            <p className="text-xs text-[#2c2c3e] font-medium">
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
