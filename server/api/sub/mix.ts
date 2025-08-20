import { db, sub } from '#server/db'

export default defineEventHandler(async () => {
  const rows = await db.select().from(sub)

  return rows
})
