import { eq } from 'drizzle-orm'
import { db, sub } from '~~/server/db'
import { parseName } from '~~/server/utils/parse'

export default defineEventHandler(async (event) => {
  const name = parseName(getRouterParam(event, 'name'))

  const rows = await db.select({ content: sub.content })
    .from(sub)
    .where(eq(sub.name, name))
    .limit(1)

  if (rows.length <= 0)
    return setResponseStatus(event, 404)

  const [{ content }] = rows

  return content
})
