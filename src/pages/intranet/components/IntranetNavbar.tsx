// src/pages/intranet/components/IntranetNavbar.tsx
import { FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'
import { useAuth } from '../../../context/AuthContext'

interface IntranetNavbarProps {
  onToggleSidebar: () => void
}

export default function IntranetNavbar({ onToggleSidebar }: IntranetNavbarProps) {
  const { user, logout } = useAuth()

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-40 border-b-2 border-[#f0f0f5]">
      <div className="flex items-center justify-between h-16 px-3 sm:px-4">
        {/* Logo y botón menú */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                  <button
                    onClick={onToggleSidebar}
                    // AGREGADO: lg:hidden para ocultar el botón en escritorio
                    className="p-2 rounded-lg hover:bg-[#fff4f0] text-[#1a1a2e] hover:text-[#ff6b35] transition-colors flex-shrink-0 lg:hidden"
                    aria-label="Toggle menu"
                  >
                    <FaBars className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
          {/* Logo - Solo visible en desktop */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3 min-w-0">
            <img 
              src="/logo.png" 
              alt="Lavandería el Cobre" 
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-base lg:text-lg font-bold text-[#1a1a2e] truncate">Lavandería el Cobre</h1>
              <p className="text-xs text-[#6b6b7e]">Sistema Interno</p>
            </div>
          </div>
        </div>

        {/* Usuario y logout */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="hidden md:flex items-center gap-3 px-3 lg:px-4 py-2 bg-[#f8f9fa] rounded-xl border border-[#f0f0f5]">
            <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <FaUser className="text-white text-sm" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#1a1a2e] truncate">{user?.name || user?.email?.split('@')[0]}</p>
              <p className="text-xs text-[#6b6b7e] capitalize truncate">{user?.role}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 border-2 border-[#cfcfd8] hover:border-[#ff6b35] text-[#2c2c3e] hover:text-[#ff6b35] font-semibold rounded-xl transition-all text-sm flex-shrink-0"
            aria-label="Cerrar sesión"
          >
            <FaSignOutAlt className="text-base" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </nav>
  )
}