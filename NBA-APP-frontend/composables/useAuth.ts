export const useAuth = () => {
  const config = useRuntimeConfig()
  const token = useState('auth.token', () => null)
  const user = useState('auth.user', () => null)

  const login = async (email: string, password: string) => {
    try {
      const data = await $fetch(`${config.public.apiBase}/login`, {
        method: 'POST',
        body: { email, password },
      })
      token.value = data.token
      user.value = data.user
      localStorage.setItem('auth-token', data.token)
      return data
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await $fetch(`${config.public.apiBase}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('auth-token')
    }
  }

  const getUser = async () => {
    if (!token.value) {
      token.value = localStorage.getItem('auth-token')
    }
    if (!token.value) return null

    try {
      const data = await $fetch(`${config.public.apiBase}/user`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      user.value = data
      return data
    } catch (error) {
      console.error('Failed to fetch user:', error)
      token.value = null
      localStorage.removeItem('auth-token')
      return null
    }
  }

  return {
    token: readonly(token),
    user: readonly(user),
    login,
    logout,
    getUser,
  }
}

