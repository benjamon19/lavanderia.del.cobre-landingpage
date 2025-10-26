// src/components/Login.tsx
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaTimes, FaUser, FaLock, FaLightbulb } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

interface LoginProps {
  isOpen: boolean
  onClose: () => void
}

export default function Login({ isOpen, onClose }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validar que el email tenga 1, 2 o 3 para los roles
    const success = login(email, password)
    
    if (success) {
      onClose()
      setEmail('')
      setPassword('')
    } else {
      setError('Email inválido. Usa un email con 1 (admin), 2 (trabajador) o 3 (cliente)')
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md relative animate-fadeIn max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#6b6b7e] hover:text-[#1a1a2e] transition-colors z-10"
          aria-label="Cerrar ventana de inicio de sesión"
        >
          <FaTimes className="text-xl sm:text-2xl" />
        </button>

        <div className="bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] text-white p-6 sm:p-8 md:p-10 rounded-t-2xl sm:rounded-t-3xl">
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg"
            aria-hidden="true"
          >
            <FaUser className="text-2xl sm:text-3xl md:text-4xl" />
          </div>
          <h2 id="login-title" className="text-2xl sm:text-3xl font-bold text-center">Bienvenido</h2>
          <p className="text-[#ffe8e0] text-center mt-1 sm:mt-2 text-sm sm:text-base">Ingresa a tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-8">
          <div className="mb-4 sm:mb-6">
            <label htmlFor="login-email" className="block text-xs sm:text-sm font-semibold text-[#1a1a2e] mb-1.5 sm:mb-2">
              Usuario o Email
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e] text-sm sm:text-base" aria-hidden="true" />
              <input
                type="text"
                id="login-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin1@elcobre.cl"
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-[#cfcfd8] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e] text-sm sm:text-base"
                required
              />
            </div>
          </div>

          <div className="mb-3 sm:mb-4">
            <label htmlFor="login-password" className="block text-xs sm:text-sm font-semibold text-[#1a1a2e] mb-1.5 sm:mb-2">
              Contraseña
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e] text-sm sm:text-base" aria-hidden="true" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 md:py-3.5 border-2 border-[#cfcfd8] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e] text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#6b6b7e] hover:text-[#1a1a2e] transition-colors"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <FaEyeSlash className="text-lg sm:text-xl" /> : <FaEye className="text-lg sm:text-xl" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#ff6b35] border-[#cfcfd8] rounded focus:ring-[#ff6b35] cursor-pointer"
              />
              <span className="ml-2 text-xs sm:text-sm text-[#2c2c3e] font-medium">Recordarme</span>
            </label>
            <button
              type="button"
              className="text-xs sm:text-sm text-[#ff6b35] hover:text-[#e85d2e] font-semibold transition-colors text-left sm:text-right"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {error && (
            <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border-2 border-red-200 rounded-lg sm:rounded-xl">
              <p className="text-xs sm:text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl hover:shadow-lg transition-all font-semibold text-base sm:text-lg transform hover:-translate-y-0.5"
          >
            Iniciar Sesión
          </button>

          <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <FaLightbulb className="text-blue-600 text-sm sm:text-base" />
              <p className="text-[10px] sm:text-xs text-blue-800 font-semibold">Ejemplos de acceso:</p>
            </div>
            <p className="text-[10px] sm:text-xs text-blue-700">• Admin: admin1@elcobre.cl</p>
            <p className="text-[10px] sm:text-xs text-blue-700">• Trabajador: trabajador2@elcobre.cl</p>
            <p className="text-[10px] sm:text-xs text-blue-700">• Cliente: cliente3@gmail.com</p>
          </div>
        </form>
      </div>
    </div>
  )
}