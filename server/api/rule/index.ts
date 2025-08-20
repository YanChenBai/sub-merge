import { db, rule } from '~~/server/db'

export default defineEventHandler(async () => {
  return await db.select().from(rule)
})
