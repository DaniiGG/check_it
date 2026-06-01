export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, token } = useAuth()

  if (!isAuthenticated.value && !token.value) {
    return navigateTo('/login', { replace: true })
  }
})
