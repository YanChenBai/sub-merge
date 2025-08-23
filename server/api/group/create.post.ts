import { db, group } from '#server/db'
import { createGroupSchema } from '#shared/schema'

export default defineEventHandler(async (event) => {
  const { name } = await readValidatedBody(event, (body) => {
    return TValue.Parse(createGroupSchema, body)
  })

  await db.insert(group).values({
    name: name.trim(),
  })
})
