import { db, sub } from '#server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { name } = await getValidatedRouterParams(event, (params) => {
    return TValue.Parse(T.Object({ name: T.String() }), params)
  })

  const rows = await db.select({ content: sub.content })
    .from(sub)
    .where(eq(sub.name, name))
    .limit(1)

  if (rows.length <= 0)
    return setResponseStatus(event, 404)

  const [{ content }] = rows

  return content
})
