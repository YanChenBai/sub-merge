import { db, sub } from '#server/db'
import { asc, desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  return await db.select({
    id: sub.id,
    url: sub.url,
    name: sub.name,
    main: sub.main,
    updatedAt: sub.updatedAt,
    createdAt: sub.createdAt,
  }).from(sub).orderBy(desc(sub.main))
})
