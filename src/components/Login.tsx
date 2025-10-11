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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-8 rounded-t-2xl">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-center">Bienvenido</h2>
          <p className="text-orange-100 text-center mt-2">Ingresa a tu cuenta</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Usuario/Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario o Email
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="usuario@ejemplo.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
              </button>
            </div>
          </div>

          {/* Recordarme y Olvidé contraseña */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-600">Recordarme</span>
            </label>
            <button
              type="button"
              className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Botón Login */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}