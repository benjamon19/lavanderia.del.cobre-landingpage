// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { setCookie, deleteCookie } from '../utils/cookies'

export type UserRole = 'Administrador' | 'Trabajador' | 'Cliente' | 'Recepcionista' | null

interface User {
  uid: string
  email: string
  role: UserRole
  name: string
  activo: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  resendVerification: () => Promise<void>
  refreshUser: () => Promise<void>
  setIsCreatingUser: (value: boolean) => void
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  // Mapear roles de Firestore a roles del sistema
  const mapRole = (firestoreRole: string): UserRole => {
    const roleMap: Record<string, UserRole> = {
      'administrador': 'Administrador',
      'operario': 'Trabajador',
      'cliente': 'Cliente',
      'recepcionista': 'Recepcionista'
    }
    return roleMap[firestoreRole] || null
  }

  // Verificar sesión de Firebase al iniciar
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Si estamos creando un usuario, ignorar cambios temporales de autenticación
      if (isCreatingUser) {
        return
      }

      if (firebaseUser) {
        try {
          // Obtener datos del usuario desde Firestore
          const userDoc = await getDoc(doc(db, 'usuarios', firebaseUser.uid))
          
          if (userDoc.exists()) {
            const userData = userDoc.data()
            
            // Verificar si el usuario está activo
            if (userData.activo) {
              const mappedUser: User = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                role: mapRole(userData.rol),
                name: userData.nombre,
                activo: userData.activo
              }
              setUser(mappedUser)
              localStorage.setItem('user', JSON.stringify(mappedUser))
            } else {
              // Usuario inactivo
              await signOut(auth)
              setUser(null)
              localStorage.removeItem('user')
            }
          } else {
            // Usuario no existe en Firestore
            await signOut(auth)
            setUser(null)
            localStorage.removeItem('user')
          }
        } catch (error) {
          console.error('Error obteniendo datos del usuario:', error)
          setUser(null)
          localStorage.removeItem('user')
        }
      } else {
        setUser(null)
        localStorage.removeItem('user')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [isCreatingUser])

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<void> => {
    try {
      // Configurar persistencia según el checkbox "Recuérdame"
      // LOCAL: mantiene la sesión incluso después de cerrar el navegador
      // SESSION: la sesión expira cuando se cierra la pestaña/ventana del navegador
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
      // Autenticar con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      // Verificar si el correo está verificado
      if (!firebaseUser.emailVerified) {
        await signOut(auth)
        throw new Error('Por favor verifica tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.')
      }

      // Obtener datos del usuario desde Firestore
      const userDoc = await getDoc(doc(db, 'usuarios', firebaseUser.uid))
      
      if (!userDoc.exists()) {
        await signOut(auth)
        throw new Error('Tu cuenta no está configurada correctamente. Contacta al administrador.')
      }

      const userData = userDoc.data()

      // Verificar si el usuario está activo
      if (!userData.activo) {
        await signOut(auth)
        throw new Error('Tu cuenta está inactiva. Por favor contacta al administrador para más información.')
      }

      const mappedUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        role: mapRole(userData.rol),
        name: userData.nombre,
        activo: userData.activo
      }

      // Actualizar ultimo_acceso en Firestore
      await updateDoc(doc(db, 'usuarios', firebaseUser.uid), {
        ultimo_acceso: serverTimestamp()
      })

      setUser(mappedUser)
      localStorage.setItem('user', JSON.stringify(mappedUser))
      
      // Si el usuario marcó "Recordarme", guardar información en cookies
      if (rememberMe) {
        setCookie('rememberUser', 'true', 30) // 30 días
        setCookie('userEmail', email, 30)
      } else {
        // Si no marcó recordar, eliminar cookies existentes
        deleteCookie('rememberUser')
        deleteCookie('userEmail')
      }
      
      // Redirigir al dashboard
      navigate('/intranet/dashboard')
    } catch (error: any) {
      console.error('Error en login:', error)
      
      // Lanzar error con mensaje más amigable
      if (error.code === 'auth/user-not-found') {
        throw new Error('No encontramos una cuenta con este correo electrónico.')
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('La contraseña es incorrecta. Por favor intenta nuevamente.')
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('El formato del correo electrónico no es válido.')
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Demasiados intentos fallidos. Por favor espera unos minutos antes de intentar nuevamente.')
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('Esta cuenta ha sido deshabilitada. Contacta al administrador.')
      } else if (error.code === 'auth/invalid-credential') {
        throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.')
      } else if (error.message) {
        throw new Error(error.message)
      } else {
        throw new Error('Error al iniciar sesión. Por favor intenta más tarde.')
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      localStorage.removeItem('user')
      // Eliminar cookies al cerrar sesión
      deleteCookie('rememberUser')
      deleteCookie('userEmail')
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      console.error('Error al enviar correo de recuperación:', error)
      
      if (error.code === 'auth/user-not-found') {
        throw new Error('No existe una cuenta con este correo electrónico.')
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('El formato del correo electrónico no es válido.')
      } else {
        throw new Error('Error al enviar el correo de recuperación. Intenta más tarde.')
      }
    }
  }

  const resendVerification = async (): Promise<void> => {
    try {
      const currentUser = auth.currentUser
      if (currentUser && !currentUser.emailVerified) {
        await sendEmailVerification(currentUser)
      } else {
        throw new Error('No hay usuario para verificar')
      }
    } catch (error: any) {
      console.error('Error al reenviar verificación:', error)
      throw new Error('Error al enviar el correo de verificación. Intenta más tarde.')
    }
  }

  const refreshUser = async (): Promise<void> => {
    try {
      const currentUser = auth.currentUser
      if (!currentUser) {
        setUser(null)
        localStorage.removeItem('user')
        return
      }

      // Obtener datos del usuario desde Firestore
      const userDoc = await getDoc(doc(db, 'usuarios', currentUser.uid))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        
        // Verificar si el usuario está activo
        if (userData.activo) {
          const mappedUser: User = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            role: mapRole(userData.rol),
            name: userData.nombre,
            activo: userData.activo
          }
          setUser(mappedUser)
          localStorage.setItem('user', JSON.stringify(mappedUser))
        } else {
          // Usuario inactivo
          await signOut(auth)
          setUser(null)
          localStorage.removeItem('user')
        }
      } else {
        // Usuario no existe en Firestore
        await signOut(auth)
        setUser(null)
        localStorage.removeItem('user')
      }
    } catch (error) {
      console.error('Error refrescando usuario:', error)
    }
  }

  const value = {
    user,
    login,
    logout,
    resetPassword,
    resendVerification,
    refreshUser,
    setIsCreatingUser,
    isAuthenticated: !!user,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}