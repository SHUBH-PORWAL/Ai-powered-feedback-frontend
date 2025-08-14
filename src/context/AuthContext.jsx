import { createContext, useState, useEffect } from 'react'
import { getStoredToken, removeStoredToken, setStoredToken } from '../utils/auth'
import api from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredToken()
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          setUser({ token })
        } catch (error) {
          removeStoredToken()
          delete api.defaults.headers.common['Authorization']
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = (token, userData) => {
    setStoredToken(token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser({ token, ...userData })
  }

  const logout = () => {
    removeStoredToken()
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}