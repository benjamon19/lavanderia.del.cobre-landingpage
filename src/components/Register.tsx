// src/components/Register.tsx
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaTimes, FaUser, FaLock, FaEnvelope, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

interface RegisterProps {
  isOpen: boolean
  onClose: () => void
  onBackToLogin: () => void
}

export default function Register({ isOpen, onClose, onBackToLogin }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  if (!isOpen) return null

  // Validar requisitos de contraseña
  const validatePassword = (password: string): string[] => {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push('Mínimo 8 caracteres')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Al menos una mayúscula')
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Al menos un número')
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Al menos un signo especial')
    }

    return errors
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setFormData({ ...formData, contraseña: newPassword })
    setPasswordErrors(validatePassword(newPassword))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validaciones
    if (formData.contraseña !== formData.confirmarContraseña) {
      setError('Las contraseñas no coinciden')
      return
    }

    const passwordValidation = validatePassword(formData.contraseña)
    if (passwordValidation.length > 0) {
      setError('La contraseña no cumple con los requisitos mínimos de seguridad')
      return
    }

    setLoading(true)

    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.correo,
        formData.contraseña
      )

      const uid = userCredential.user.uid

      // Enviar correo de verificación
      await sendEmailVerification(userCredential.user)

      // Guardar datos del usuario en Firestore (sin la contraseña)
      await setDoc(doc(db, 'usuarios', uid), {
        uid,
        correo: formData.correo,
        nombre: formData.nombre,
        rol: 'cliente',
        activo: true,
        fecha_creacion: serverTimestamp(),
        ultimo_acceso: serverTimestamp()
      })

      setSuccess(true)
      setFormData({
        nombre: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: ''
      })
      setPasswordErrors([])

    } catch (error: any) {
      console.error('Error al registrar usuario:', error)

      // Mensajes de error más amigables
      if (error.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado. Por favor inicia sesión o usa otro correo.')
      } else if (error.code === 'auth/invalid-email') {
        setError('El formato del correo electrónico no es válido.')
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña es demasiado débil.')
      } else {
        setError('Error al crear la cuenta. Por favor intenta más tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-title"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md relative animate-fadeIn max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#6b6b7e] hover:text-[#1a1a2e] transition-colors z-10"
          aria-label="Cerrar ventana de registro"
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
          <h2 id="register-title" className="text-2xl sm:text-3xl font-bold text-center">Crear Cuenta</h2>
          <p className="text-[#ffe8e0] text-center mt-1 sm:mt-2 text-sm sm:text-base">Regístrate como cliente</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-8">
          {success ? (
            <div className="mb-6">
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3 mb-4">
                <FaCheckCircle className="text-2xl text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-semibold mb-2">¡Cuenta creada exitosamente!</p>
                  <p className="text-sm text-green-700 mb-3">
                    Hemos enviado un correo de verificación a <strong>{formData.correo}</strong>
                  </p>
                  <p className="text-sm text-green-700">
                    Por favor revisa tu bandeja de entrada y verifica tu correo antes de iniciar sesión.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onBackToLogin}
                className="w-full bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                Volver al inicio de sesión
              </button>
            </div>
          ) : (
            <>
              {/* Nombre */}
              <div className="mb-4 sm:mb-5">
                <label htmlFor="register-name" className="block text-xs sm:text-sm font-semibold text-[#1a1a2e] mb-1.5 sm:mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e] text-sm sm:text-base" aria-hidden="true" />
                  <input
                    type="text"
                    id="register-name"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Juan Pérez"
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-[#cfcfd8] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e] text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Correo */}
              <div className="mb-4 sm:mb-5">
                <label htmlFor="register-email" className="block text-xs sm:text-sm font-semibold text-[#1a1a2e] mb-1.5 sm:mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e] text-sm sm:text-base" aria-hidden="true" />
                  <input
                    type="email"
                    id="register-email"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    placeholder="usuario@ejemplo.com"
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 border-[#cfcfd8] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e] text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="mb-4 sm:mb-5">
                <label htmlFor="register-password" className="block text-xs sm:text-sm font-semibold text-[#1a1a2e] mb-1.5 sm:mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e] text-sm sm:text-base" aria-hidden="true" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="register-password"
                    value={formData.contraseña}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border-2 border-[#cfcfd8] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e] text-sm sm:text-base"
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
                {passwordErrors.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {passwordErrors.map((error, index) => (
                      <p key={index} className="text-xs text-red-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                        {error}
                      </p>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-xs text-[#6b6b7e]">
                  Mínimo 8 caracteres, una mayúscula, un número y un signo especial
                </p>
              </div>

              {/* Confirmar Contraseña */}
              <div className="mb-4 sm:mb-5">
                <label htmlFor="register-confirm-password" className="block text-xs sm:text-sm font-semibold text-[#1a1a2e] mb-1.5 sm:mb-2">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e] text-sm sm:text-base" aria-hidden="true" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="register-confirm-password"
                    value={formData.confirmarContraseña}
                    onChange={(e) => setFormData({ ...formData, confirmarContraseña: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border-2 border-[#cfcfd8] rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all text-[#1a1a2e] text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#6b6b7e] hover:text-[#1a1a2e] transition-colors"
                    aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showConfirmPassword ? <FaEyeSlash className="text-lg sm:text-xl" /> : <FaEye className="text-lg sm:text-xl" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border-2 border-red-200 rounded-lg sm:rounded-xl flex items-start gap-2">
                  <FaExclamationTriangle className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || passwordErrors.length > 0}
                className="w-full bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white py-3 sm:py-3.5 rounded-lg sm:rounded-xl hover:shadow-lg transition-all font-semibold text-base sm:text-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-3"
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </button>

              <button
                type="button"
                onClick={onBackToLogin}
                className="w-full text-[#ff6b35] hover:text-[#e85d2e] font-semibold transition-colors text-sm"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
