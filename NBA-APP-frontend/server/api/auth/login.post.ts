export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const loginData = await readBody(event)

  try {
    const response = await $fetch(`${config.public.apiBase}/login`, {
      method: 'POST',
      body: loginData,
    })
    return response
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
})

