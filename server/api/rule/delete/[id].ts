import { eq } from 'drizzle-orm'
import { db, rule } from '~~/server/db'

export default defineEventHandler(async (event) => {
  const id = parseId(getRouterParam(event, 'id'))
  await db.delete(rule).where(eq(rule.id, id))
})
