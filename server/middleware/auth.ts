export default defineEventHandler(async (event) => {
  const path = event.path
  if (!path.includes('/api') || path === '/api/validate-auth' || path === '/api/auth')
    return

  const token = getCookie(event, 'token')
  const isLogin = validateToken(token)

  if (isLogin)
    return

  setResponseStatus(event, 401)
})
