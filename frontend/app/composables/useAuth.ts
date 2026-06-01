import { useState } from '#app'

interface User {
  id: string
  email: string
  alias: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

export function useAuth() {
  const user = useState<User | null>('auth-user', () => null)
  const token = useState<string | null>('auth-token', () => null)
  const loading = useState<boolean>('auth-loading', () => false)

  function getToken() {
    if (import.meta.client) {
      return localStorage.getItem('token')
    }
    return null
  }

  function getUser() {
    if (import.meta.client) {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    }
    return null
  }

  function initAuth() {
    const storedToken = getToken()
    const storedUser = getUser()
    if (storedToken) {
      token.value = storedToken
    }
    if (storedUser) {
      user.value = storedUser
    }
  }

  function setAuth(newToken: string, newUser: User) {
    token.value = newToken
    user.value = newUser
    if (import.meta.client) {
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))
    }
  }

  function clearAuth() {
    token.value = null
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  const config = useRuntimeConfig()
  const API = config.public.apiBase

  async function login(email: string, password: string) {
    loading.value = true
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Error al iniciar sesión')
      }
      const data = await res.json()
      setAuth(data.token, data.user)
      return data
    } finally {
      loading.value = false
    }
  }

  async function register(email: string, alias: string, password: string) {
    loading.value = true
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, alias, password }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Error al registrarse')
      }
      const data = await res.json()
      setAuth(data.token, data.user)
      return data
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    clearAuth()
    const router = useRouter()
    router.push('/')
  }

  async function fetchProfile() {
    const currentToken = token.value || getToken()
    if (!currentToken) return null
    loading.value = true
    try {
      const res = await fetch(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      })
      if (!res.ok) {
        clearAuth()
        return null
      }
      const data = await res.json()
      user.value = data
      if (import.meta.client) {
        localStorage.setItem('user', JSON.stringify(data))
      }
      return data
    } finally {
      loading.value = false
    }
  }

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    initAuth,
    fetchProfile,
  }
}
