<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">NBA App</h1>
        <p class="text-slate-400">Sign in to your account</p>
      </div>

      <!-- Login Card -->
      <UCard class="shadow-2xl">
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email Input -->
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="email"
              type="email"
              placeholder="your@email.com"
              icon="i-heroicons-envelope"
              required
              :disabled="loading"
            />
          </UFormGroup>

          <!-- Password Input -->
          <UFormGroup label="Password" name="password">
            <UInput
              v-model="password"
              type="password"
              placeholder="••••••••"
              icon="i-heroicons-lock-closed"
              required
              :disabled="loading"
            />
          </UFormGroup>

          <!-- Error Message -->
          <UAlert
            v-if="error"
            color="red"
            title="Login Failed"
            :description="error"
            icon="i-heroicons-exclamation-triangle"
          />

          <!-- Login Button -->
          <UButton
            type="submit"
            class="w-full"
            size="lg"
            :loading="loading"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </UButton>
        </form>
      </UCard>

      <!-- Footer -->
      <p class="text-center text-slate-400 mt-6 text-sm">
        Demo account: test@example.com / password123
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const auth = useAuth()
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    console.log('Attempting login with:', { email: email.value })
    const result = await auth.login(email.value, password.value)
    console.log('Login successful:', result)
    await router.push('/dashboard')
  } catch (err: any) {
    console.error('Full error object:', err)
    console.error('Error data:', err.data)
    console.error('Error status:', err.statusCode)
    console.error('Error message:', err.message)

    // Try to get detailed error message
    if (err.data?.message) {
      error.value = err.data.message
    } else if (err.statusCode === 401) {
      error.value = 'Invalid email or password'
    } else if (err.statusCode === 422) {
      error.value = 'Validation error: ' + (err.data?.message || 'Invalid input')
    } else if (err.statusCode >= 500) {
      error.value = 'Server error. Check console for details.'
    } else {
      error.value = 'Login failed. Please check your credentials.'
    }

    // Also log the full response for debugging
    if (err._data) {
      console.error('Response data:', err._data)
    }
  } finally {
    loading.value = false
  }
}

// Auto-redirect if already logged in
onMounted(async () => {
  const user = await auth.getUser()
  if (user) {
    await router.push('/dashboard')
  }
})
</script>


