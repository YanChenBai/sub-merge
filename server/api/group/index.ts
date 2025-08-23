import { db, group } from '#server/db'

export default defineEventHandler(async () => {
  return await db.select().from(group).orderBy(group.createdAt)
})
