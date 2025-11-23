// src/pages/intranet/modules/UsersModule.tsx
import { useState } from 'react'
// Importamos utilidades para manejar apps secundarias
import { initializeApp, deleteApp, type FirebaseApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
// Importamos la db normal y la configuración para crear la app temporal
import { db, firebaseConfig } from '../../../config/firebase'
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaPhone, FaIdCard } from 'react-icons/fa'
import { validateAndFormatRUT, formatChileanPhone, formatRut } from '../../../utils/chileanValidators'
import NotificationModal from '../../../components/NotificationModal'

interface UserFormData {
  correo: string
  contraseña: string
  confirmarContraseña: string
  nombre: string
  rut: string
  telefono: string
  rol: 'administrador' | 'cliente' | 'operario' | 'recepcionista'
  activo: boolean
}

export default function UsersModule() {
  const [formData, setFormData] = useState<UserFormData>({
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
    nombre: '',
    rut: '',
    telefono: '',
    rol: 'cliente',
    activo: true
  })

  const [loading, setLoading] = useState(false)
  const [notificationModal, setNotificationModal] = useState<{
    isOpen: boolean
    type: 'success' | 'error'
    title: string
    message: string
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  })

  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [rutError, setRutError] = useState<string>('')
  const [telefonoError, setTelefonoError] = useState<string>('')
  const [rutFormatted, setRutFormatted] = useState<string>('')
  const [telefonoFormatted, setTelefonoFormatted] = useState<string>('')

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

  const handleRUTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rutValue = e.target.value
    // Formatear progresivamente
    const formatted = formatRut(rutValue)

    // Limpiar para guardar en el estado
    const cleanValue = formatted.replace(/[.\-\s]/g, '').toUpperCase()

    setFormData({ ...formData, rut: formatted })

    if (cleanValue.length >= 8) {
      const validation = validateAndFormatRUT(cleanValue)
      if (validation.isValid) {
        setRutFormatted(validation.formatted)
        setRutError('')
      } else {
        setRutFormatted(validation.formatted)
        setRutError(validation.error || 'RUT inválido')
      }
    } else {
      setRutFormatted('')
      setRutError('')
    }
  }

  const handleTelefonoFocus = () => {
    if (!formData.telefono) {
      setFormData({ ...formData, telefono: '+569' })
    }
  }

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value

    // Si el usuario borra todo, permitirlo
    if (phoneValue === '') {
      setFormData({ ...formData, telefono: '' })
      setTelefonoFormatted('')
      setTelefonoError('')
      return
    }

    // Asegurar que empiece con +569 si no está vacío
    let newValue = phoneValue
    if (!newValue.startsWith('+569')) {
      // Si el usuario intenta borrar el prefijo, lo restauramos o limpiamos según la lógica
      // Aquí optamos por mantener el prefijo si hay números
      const numbers = newValue.replace(/[^0-9]/g, '')
      if (numbers.length > 0) {
        newValue = '+569' + numbers.replace(/^569/, '')
      }
    }

    // Permitir solo números y el + inicial
    if (!/^\+?[0-9]*$/.test(newValue)) return

    setFormData({ ...formData, telefono: newValue })

    // Validar solo la parte numérica después del +569
    const cleanValue = newValue.replace(/\D/g, '')
    // 569 + 8 dígitos = 11 dígitos
    if (cleanValue.length === 11) {
      const validation = formatChileanPhone(cleanValue)
      if (validation.isValid) {
        setTelefonoFormatted(validation.formatted)
        setTelefonoError('')
      } else {
        setTelefonoFormatted(validation.formatted)
        setTelefonoError(validation.error || 'Teléfono inválido')
      }
    } else {
      setTelefonoFormatted('')
      setTelefonoError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones básicas
    if (formData.contraseña !== formData.confirmarContraseña) {
      setNotificationModal({
        isOpen: true,
        type: 'error',
        title: 'Error de validación',
        message: 'Las contraseñas no coinciden'
      })
      return
    }

    const passwordValidation = validatePassword(formData.contraseña)
    if (passwordValidation.length > 0) {
      setNotificationModal({
        isOpen: true,
        type: 'error',
        title: 'Contraseña débil',
        message: 'La contraseña no cumple con los requisitos mínimos'
      })
      return
    }

    // Validar RUT
    if (!formData.rut || formData.rut.length < 8) {
      setNotificationModal({
        isOpen: true,
        type: 'error',
        title: 'RUT inválido',
        message: 'Por favor ingresa un RUT válido'
      })
      return
    }
    const rutValidation = validateAndFormatRUT(formData.rut.replace(/[.\-\s]/g, ''))
    if (!rutValidation.isValid) {
      setNotificationModal({
        isOpen: true,
        type: 'error',
        title: 'RUT inválido',
        message: rutValidation.error || 'El RUT ingresado no es válido'
      })
      return
    }

    // Validar teléfono
    if (!formData.telefono || formData.telefono.length < 8) {
      setNotificationModal({
        isOpen: true,
        type: 'error',
        title: 'Teléfono inválido',
        message: 'Por favor ingresa un teléfono válido (8 dígitos)'
      })
      return
    }
    const telefonoValidation = formatChileanPhone(formData.telefono)
    if (!telefonoValidation.isValid) {
      setNotificationModal({
        isOpen: true,
        type: 'error',
        title: 'Teléfono inválido',
        message: telefonoValidation.error || 'El teléfono ingresado no es válido'
      })
      return
    }

    setLoading(true)

    // Variable para la app secundaria
    let secondaryApp: FirebaseApp | null = null;

    try {
      // 1. Crear instancia secundaria de Firebase para no cerrar sesión del admin
      secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
      const secondaryAuth = getAuth(secondaryApp);

      // 2. Crear usuario en Firebase Authentication usando la instancia secundaria
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        formData.correo,
        formData.contraseña
      )

      const uid = userCredential.user.uid

      // 3. Enviar correo de verificación
      await sendEmailVerification(userCredential.user)

      // 4. Guardar datos del usuario en Firestore usando la instancia PRINCIPAL (db)
      // Esto es importante porque 'db' tiene la sesión del admin autenticado con permisos de escritura
      await setDoc(doc(db, 'usuarios', uid), {
        uid,
        correo: formData.correo,
        nombre: formData.nombre,
        rut: rutValidation.clean,
        telefono: telefonoValidation.formatted,
        rol: formData.rol,
        activo: true, // Siempre activo por defecto
        fecha_creacion: serverTimestamp(),
        ultimo_acceso: serverTimestamp()
      })

      // 5. Cerrar sesión en la app secundaria
      await signOut(secondaryAuth);

      setNotificationModal({
        isOpen: true,
        type: 'success',
        title: 'Usuario Creado',
        message: `Usuario ${formData.nombre} creado exitosamente. Ya puede iniciar sesión con su correo y contraseña`
      })

      // Limpiar formulario
      setFormData({
        correo: '',
        contraseña: '',
        confirmarContraseña: '',
        nombre: '',
        rut: '',
        telefono: '',
        rol: 'cliente',
        activo: true
      })
      setPasswordErrors([])
      setRutError('')
      setTelefonoError('')
      setRutFormatted('')
      setTelefonoFormatted('')

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
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Error de conexión. Verifica tu internet.'
      }

      setNotificationModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: errorMessage
      })
    } finally {
      // 6. Limpiar la app secundaria de la memoria
      if (secondaryApp) {
        await deleteApp(secondaryApp).catch(console.error);
      }
      setLoading(false)
    }
  }

  return (
    <div>
      <NotificationModal
        isOpen={notificationModal.isOpen}
        onClose={() => setNotificationModal({ ...notificationModal, isOpen: false })}
        type={notificationModal.type}
        title={notificationModal.title}
        message={notificationModal.message}
      />

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

            {/* RUT */}
            <div>
              <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
                RUT
              </label>
              <div className="relative">
                <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e]" />
                <input
                  type="text"
                  value={formData.rut}
                  onChange={handleRUTChange}
                  className={` w-full  pl-12  pr-4  py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all 
    ${rutError ? 'border-red-300' : rutFormatted && !rutError ? 'border-green-300' : 'border-gray-200'
                    }`}
                  placeholder="12.345.678-9"
                  required
                  maxLength={12}
                />
              </div>
              {rutFormatted && !rutError && (
                <p className="mt-1 text-xs text-green-600">RUT válido: {rutFormatted}</p>
              )}
              {rutError && (
                <p className="mt-1 text-xs text-red-600">{rutError}</p>
              )}
              <p className="mt-1 text-xs text-[#6b6b7e]">El formato se ajustará automáticamente</p>
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-semibold text-[#2c2c3e] mb-2">
                Teléfono
              </label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b7e]" />
                <input
                  type="text"
                  value={formData.telefono}
                  onChange={handleTelefonoChange}
                  onFocus={handleTelefonoFocus}
                  className={` w-full  pl-12  pr-4  py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent transition-all 
    ${telefonoError ? 'border-red-300' : telefonoFormatted && !telefonoError ? 'border-green-300' : 'border-gray-200'
                    }`}
                  placeholder="+569 12345678"
                  required
                  maxLength={12}
                />
              </div>
              {telefonoFormatted && !telefonoError && (
                <p className="mt-1 text-xs text-green-600">Teléfono válido: {telefonoFormatted}</p>
              )}
              {telefonoError && (
                <p className="mt-1 text-xs text-red-600">{telefonoError}</p>
              )}
              <p className="mt-1 text-xs text-[#6b6b7e]">Ingresa 8 dígitos (se formateará como +569...)</p>
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
                  <option value="administrador">Administrador</option>
                  <option value="recepcionista">Recepcionista</option>
                  <option value="operario">Operario</option>
                  <option value="cliente">Cliente</option>
                </select>
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={loading || passwordErrors.length > 0 || !!rutError || !!telefonoError || !rutFormatted || !telefonoFormatted}
              className="w-full py-4 bg-gradient-to-r from-[#ff6b35] to-[#e85d2e] text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando usuario...' : 'Crear Usuario'}
            </button>
          </form>
        </div>
      </div>
    </div >
  )
}