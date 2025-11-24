// src/components/Login.tsx
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaTimes, FaUser, FaLock, FaEnvelope, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { getDoc, doc } from 'firebase/firestore'
import { db, auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom' // IMPORTANTE: Agregar esto

interface LoginProps {
  isOpen: boolean
  onClose: () => void
  onOpenRegister: () => void
}

const URL_APP_REPARTIDOR = 'http://localhost:5174/';

export default function Login({ isOpen, onClose, onOpenRegister }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMessage, setResetMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const { login, resetPassword, logout } = useAuth()
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 1. Login en Firebase (ya no redirige automáticamente)
      await login(email, password, rememberMe)

      // 2. Verificación de Rol
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'usuarios', currentUser.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userRol = (userData.rol || '').toLowerCase();

          if (userRol === 'repartidor') {
            const redirectUrl = `${URL_APP_REPARTIDOR}?token=${currentUser.uid}`;

            window.open(redirectUrl, '_blank', 'noopener,noreferrer');

            await logout();

            // Cerramos el modal y limpiamos
            onClose();
            setEmail('');
            setPassword('');
            return;
          }
        }
      }

      navigate('/intranet/dashboard');

      onClose()
      setEmail('')
      setPassword('')
      setRememberMe(false)

    } catch (error: any) {
      setError(error.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetMessage(null)
    setLoading(true)

    try {
      await resetPassword(resetEmail)
      setResetMessage({
        type: 'success',
        text: `Hemos enviado un correo a ${resetEmail} con instrucciones para restablecer tu contraseña.`
      })
      setResetEmail('')
    } catch (error: any) {
      setResetMessage({
        type: 'error',
        text: error.message || 'Error al enviar el correo de recuperación'
      })
    } finally {
      setLoading(false)
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
        {!showForgotPassword ? (
          <>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#ffe8e0] hover:text-white transition-colors z-10"
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
                    placeholder="usuario@ejemplo.com"
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
                  <span className="ml-2 text-xs sm:text-sm text-[#2c2c3e] font-medium">Recordar usuario</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
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
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl hover:shadow-lg transition-all font-semibold text-base sm:text-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-3"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>

              <div className="text-center">
                <p className="text-sm text-[#6b6b7e] mb-2">¿No tienes cuenta?</p>
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="text-[#ff6b35] hover:text-[#e85d2e] font-semibold transition-colors text-sm"
                >
                  Regístrate como cliente
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-6 sm:p-8 md:p-10">
            <button
              onClick={() => {
                setShowForgotPassword(false)
                setResetMessage(null)
                setResetEmail('')
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#6b6b7e] hover:text-[#1a1a2e] transition-colors"
              aria-label="Cerrar recuperación de contraseña"
            >
              <FaTimes className="text-xl sm:text-2xl" />
            </button>

            <div className="mt-2">
              <div className="w-16 h-16 bg-[#ff6b35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLock className="text-3xl text-[#ff6b35]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-3 text-center">Recuperar Contraseña</h3>
              <p className="text-sm sm:text-base text-[#6b6b7e] mb-8 text-center max-w-xs mx-auto">
                Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
              </p>

              {resetMessage && (
                <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${resetMessage.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
                  }`}>
                  {resetMessage.type === 'success' ? (
                    <FaCheckCircle className="text-green-600 flex-shrink-0 mt-0.5 text-lg" />
                  ) : (
                    <FaExclamationTriangle className="text-red-600 flex-shrink-0 mt-0.5 text-lg" />
                  )}
                  <p className={`text-sm font-medium ${resetMessage.type === 'success' ? 'text-green-700' : 'text-red-700'
                    }`}>
                    {resetMessage.text}
                  </p>
                </div>
              )}

              <form onSubmit={handleForgotPassword}>
                <div className="mb-6">
                  <label htmlFor="reset-email" className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e] text-lg" />
                    <input
                      type="email"
                      id="reset-email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-[#cfcfd8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white py-3.5 rounded-xl hover:shadow-lg transition-all font-semibold text-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4"
                >
                  {loading ? 'Enviando...' : 'Enviar Correo'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false)
                    setResetMessage(null)
                    setResetEmail('')
                  }}
                  className="w-full text-[#6b6b7e] hover:text-[#1a1a2e] font-medium transition-colors text-sm flex items-center justify-center gap-2"
                >
                  Volver al inicio de sesión
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}