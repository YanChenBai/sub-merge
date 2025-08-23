import { db, rule } from '#server/db'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  return await db.select().from(rule).orderBy(desc(rule.createdAt))
})
