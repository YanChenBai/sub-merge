import { db, sub } from '#server/db'
import { createSubSchema } from '#shared/schema/sub'

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, (body) => {
    return TValue.Parse(createSubSchema, body)
  })

  await db.insert(sub).values(data)
})
