// src/pages/intranet/modules/UsersModule.tsx
import { useState } from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../../config/firebase'
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

interface UserFormData {
  correo: string
  contraseña: string
  confirmarContraseña: string
  nombre: string
  rol: 'administrador' | 'cliente' | 'operario'
  activo: boolean
}

export default function UsersModule() {
  const [formData, setFormData] = useState<UserFormData>({
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
    nombre: '',
    rol: 'cliente',
    activo: true
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

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
    setMessage(null)

    // Validaciones
    if (formData.contraseña !== formData.confirmarContraseña) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden' })
      return
    }

    const passwordValidation = validatePassword(formData.contraseña)
    if (passwordValidation.length > 0) {
      setMessage({ type: 'error', text: 'La contraseña no cumple con los requisitos mínimos' })
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
        rol: formData.rol,
        activo: formData.activo,
        fecha_creacion: serverTimestamp(),
        ultimo_acceso: serverTimestamp()
      })

      setMessage({ 
        type: 'success', 
        text: `Usuario ${formData.nombre} creado exitosamente. Se ha enviado un correo de verificación a ${formData.correo}` 
      })

      // Limpiar formulario
      setFormData({
        correo: '',
        contraseña: '',
        confirmarContraseña: '',
        nombre: '',
        rol: 'cliente',
        activo: true
      })
      setPasswordErrors([])

    } catch (error: any) {
      console.error('Error al crear usuario:', error)
      
      // Mensajes de error más amigables
      let errorMessage = 'Error al crear usuario'
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo ya está registrado'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es demasiado débil'
      }
      
      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Gestión de Usuarios</h1>
        <p className="text-[#6b6b7e]">Crear y administrar usuarios del sistema</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#ff6b35] to-[#e85d2e] rounded-xl">
              <FaUser className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a2e]">Crear Nuevo Usuario</h2>
              <p className="text-sm text-[#6b6b7e]">Completa todos los campos del formulario</p>
            </div>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 border-2 border-green-200 text-green-700' 
                : 'bg-red-50 border-2 border-red-200 text-red-700'
            }`}>
              {message.type === 'success' ? (
                <FaCheckCircle className="text-xl flex-shrink-0 mt-0.5" />
              ) : (
                <FaExclamationTriangle className="text-xl flex-shrink-0 mt-0.5" />
              )}
              <p className="font-medium">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
                Nombre Completo
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e]" />
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff6b35] focus:outline-none transition-colors"
                  placeholder="Ej: Juan Pérez"
                  required
                />
              </div>
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e]" />
                <input
                  type="email"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff6b35] focus:outline-none transition-colors"
                  placeholder="usuario@ejemplo.com"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e]" />
                <input
                  type="password"
                  value={formData.contraseña}
                  onChange={handlePasswordChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff6b35] focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
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
            <div>
              <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e]" />
                <input
                  type="password"
                  value={formData.confirmarContraseña}
                  onChange={(e) => setFormData({ ...formData, confirmarContraseña: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff6b35] focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
                Rol del Usuario
              </label>
              <div className="relative">
                <FaUserTag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e]" />
                <select
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value as any })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff6b35] focus:outline-none transition-colors appearance-none bg-white"
                  required
                >
                  <option value="cliente">Cliente</option>
                  <option value="operario">Operario</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
            </div>

            {/* Estado Activo */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="activo"
                checked={formData.activo}
                onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                className="w-5 h-5 text-[#ff6b35] border-gray-300 rounded focus:ring-[#ff6b35]"
              />
              <label htmlFor="activo" className="text-sm font-semibold text-[#2c2c3e] cursor-pointer">
                Usuario activo
              </label>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={loading || passwordErrors.length > 0}
              className="w-full py-4 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando usuario...' : 'Crear Usuario'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
