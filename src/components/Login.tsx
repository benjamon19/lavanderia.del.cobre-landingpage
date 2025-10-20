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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin1@elcobre.cl"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white py-3.5 rounded-xl hover:shadow-lg transition-all font-semibold text-lg transform hover:-translate-y-0.5"
          >
            Iniciar Sesión
          </button>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <FaLightbulb className="text-blue-600" />
              <p className="text-xs text-blue-800 font-semibold">Ejemplos de acceso:</p>
            </div>
            <p className="text-xs text-blue-700">• Admin: admin1@elcobre.cl</p>
            <p className="text-xs text-blue-700">• Trabajador: trabajador2@elcobre.cl</p>
            <p className="text-xs text-blue-700">• Cliente: cliente3@gmail.com</p>
          </div>
        </form>
      </div>
    </div>
  )
}