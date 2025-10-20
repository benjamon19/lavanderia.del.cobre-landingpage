// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export type UserRole = 'admin' | 'worker' | 'client' | null

interface User {
  email: string
  role: UserRole
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const login = (email: string, _password: string): boolean => {
    // Simulación de autenticación basada en el email
    // El password se ignora en esta simulación
    let role: UserRole = null
    let name = ''

    if (email.includes('1')) {
      role = 'admin'
      name = 'Administrador'
    } else if (email.includes('2')) {
      role = 'worker'
      name = 'Trabajador'
    } else if (email.includes('3')) {
      role = 'client'
      name = 'Cliente'
    } else {
      return false // Login fallido
    }

    const userData = { email, role, name }
    setUser(userData)
    
    // Guardar en localStorage para persistencia
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Redirigir al dashboard correspondiente
    navigate('/intranet/dashboard')
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/')
  }

  // Verificar si hay sesión guardada al iniciar
  const checkStoredUser = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }

  // Llamar al montar el componente
  useState(() => {
    checkStoredUser()
  })

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
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
