// src/components/Login.tsx
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaTimes, FaUser, FaLock } from 'react-icons/fa'

interface LoginProps {
  isOpen: boolean
  onClose: () => void
}

export default function Login({ isOpen, onClose }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Login no funcional - Solo prototipo')
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6b6b7e] hover:text-[#1a1a2e] transition-colors z-10"
          aria-label="Cerrar ventana de inicio de sesión"
        >
          <FaTimes className="text-2xl" />
        </button>

        <div className="bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] text-white p-10 rounded-t-3xl">
          <div 
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            aria-hidden="true"
          >
            <FaUser className="text-4xl" />
          </div>
          <h2 id="login-title" className="text-3xl font-bold text-center">Bienvenido</h2>
          <p className="text-[#ffe8e0] text-center mt-2">Ingresa a tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <label htmlFor="login-email" className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              Usuario o Email
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e]" aria-hidden="true" />
              <input
                type="text"
                id="login-email"
                name="email"
                placeholder="usuario@ejemplo.com"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-[#cfcfd8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e]"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="login-password" className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e]" aria-hidden="true" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                name="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 border-2 border-[#cfcfd8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b7e] hover:text-[#1a1a2e] transition-colors"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#ff6b35] border-[#cfcfd8] rounded focus:ring-[#ff6b35] cursor-pointer"
              />
              <span className="ml-2 text-sm text-[#2c2c3e] font-medium">Recordarme</span>
            </label>
            <button
              type="button"
              className="text-sm text-[#ff6b35] hover:text-[#e85d2e] font-semibold transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white py-3.5 rounded-xl hover:shadow-lg transition-all font-semibold text-lg transform hover:-translate-y-0.5"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}