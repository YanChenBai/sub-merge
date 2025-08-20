import { eq } from 'drizzle-orm'
import { db, sub } from '~~/server/db'

export default defineEventHandler(async (event) => {
  const id = parseId(getRouterParam(event, 'id'))
  await db.delete(sub).where(eq(sub.id, id))
})
