<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Header/Navbar -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">NBA App</h1>
          <p class="text-slate-500">Welcome to your dashboard</p>
        </div>
        <UButton
          color="red"
          variant="ghost"
          @click="handleLogout"
          icon="i-heroicons-arrow-right-on-rectangle"
        >
          Sign Out
        </UButton>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div v-if="user" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- User Profile Card -->
        <UCard class="shadow-lg">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-user" class="w-5 h-5" />
              <h2 class="text-xl font-semibold">User Profile</h2>
            </div>
          </template>

          <div class="space-y-4">
            <div class="bg-slate-50 p-4 rounded-lg">
              <p class="text-slate-600 text-sm uppercase tracking-wide">Name</p>
              <p class="text-2xl font-bold text-slate-900">{{ user.name }}</p>
            </div>
            <div class="bg-slate-50 p-4 rounded-lg">
              <p class="text-slate-600 text-sm uppercase tracking-wide">Email</p>
              <p class="text-slate-900">{{ user.email }}</p>
            </div>
            <div class="bg-slate-50 p-4 rounded-lg">
              <p class="text-slate-600 text-sm uppercase tracking-wide">User ID</p>
              <p class="text-slate-900">{{ user.id }}</p>
            </div>
            <div class="bg-slate-50 p-4 rounded-lg">
              <p class="text-slate-600 text-sm uppercase tracking-wide">Member Since</p>
              <p class="text-slate-900">{{ formatDate(user.created_at) }}</p>
            </div>
          </div>
        </UCard>

        <!-- Quick Actions Card -->
        <UCard class="shadow-lg">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-sparkles" class="w-5 h-5" />
              <h2 class="text-xl font-semibold">Quick Actions</h2>
            </div>
          </template>

          <div class="space-y-3">
            <UButton
              to="/"
              color="blue"
              variant="soft"
              class="w-full justify-start"
              icon="i-heroicons-home"
            >
              Home
            </UButton>
            <UButton
              color="gray"
              variant="soft"
              class="w-full justify-start"
              icon="i-heroicons-cog-6-tooth"
            >
              Settings
            </UButton>
            <UButton
              color="gray"
              variant="soft"
              class="w-full justify-start"
              icon="i-heroicons-question-mark-circle"
            >
              Help & Support
            </UButton>
            <UDivider />
            <UButton
              color="red"
              variant="soft"
              class="w-full justify-start"
              icon="i-heroicons-arrow-right-on-rectangle"
              @click="handleLogout"
            >
              Sign Out
            </UButton>
          </div>
        </UCard>
      </div>

      <!-- Loading State -->
      <div v-else class="flex items-center justify-center h-64">
        <UCard class="w-full max-w-md">
          <div class="flex flex-col items-center gap-4">
            <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-blue-500" />
            <p class="text-slate-600">Loading your profile...</p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const auth = useAuth()
const router = useRouter()
const user = ref(null)

const handleLogout = async () => {
  await auth.logout()
  await router.push('/login')
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async () => {
  const userData = await auth.getUser()
  if (!userData) {
    await router.push('/login')
  } else {
    user.value = userData
  }
})
</script>


