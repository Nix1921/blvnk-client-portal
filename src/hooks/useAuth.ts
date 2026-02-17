import { useState, useEffect, useCallback } from 'react'

export function useAuth(clientId: string) {
  const sessionKey = `blvnk_auth_${clientId}`
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem(sessionKey)
    if (stored === 'true') {
      setIsAuthenticated(true)
    }
  }, [sessionKey])

  const authenticate = useCallback((password: string, correctPassword: string) => {
    if (password === correctPassword) {
      sessionStorage.setItem(sessionKey, 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }, [sessionKey])

  const logout = useCallback(() => {
    sessionStorage.removeItem(sessionKey)
    setIsAuthenticated(false)
  }, [sessionKey])

  return { isAuthenticated, authenticate, logout }
}
