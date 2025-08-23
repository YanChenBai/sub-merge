import { db, group } from '#server/db'
import { updateGroupSchema } from '#shared/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { id, name } = await readValidatedBody(event, (body) => {
    return TValue.Parse(updateGroupSchema, body)
  })

  await db.update(group)
    .set({
      name: name.trim(),
    })
    .where(eq(group.id, id))
})
