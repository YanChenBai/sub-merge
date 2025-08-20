import { db, sub } from '#server/db'
import { createInsertSchema } from 'drizzle-typebox'

const subInsertSchema = createInsertSchema(sub)

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, (body) => {
    return TValue.Parse(T.Omit(subInsertSchema, ['updatedAt', 'createdAt', 'content', 'main']), body)
  })
  await db.insert(sub).values(data)
})
