import { db, sub } from '#server/db'

export default defineEventHandler(async () => {
  return await db.select().from(sub)
})
