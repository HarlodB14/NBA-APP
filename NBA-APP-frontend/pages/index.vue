<template>
  <div>
    <!-- Redirecting... -->
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const auth = useAuth()

onMounted(async () => {
  // Check if user has a token
  const token = localStorage.getItem('auth-token')

  if (token) {
    // Try to verify token is still valid
    const user = await auth.getUser()
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  } else {
    router.push('/login')
  }
})
</script>

