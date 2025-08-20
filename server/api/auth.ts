export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as { token?: string }
  const token = body?.token

  if (!token || !validateToken(token)) {
    setResponseStatus(event, 404)
    return
  }

  setCookie(event, 'token', token, { httpOnly: true, sameSite: 'strict' })
})
