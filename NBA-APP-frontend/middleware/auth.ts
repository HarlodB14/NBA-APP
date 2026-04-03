export default defineNuxtRouteMiddleware(async (to, from) => {
  // Check if route requires auth
  if (to.path === '/dashboard') {
    const auth = useAuth()
    
    // Try to get user from localStorage token
    const token = localStorage.getItem('auth-token')
    if (!token) {
      return navigateTo('/login')
    }
    
    // Verify token is still valid
    const user = await auth.getUser()
    if (!user) {
      return navigateTo('/login')
    }
  }
})

