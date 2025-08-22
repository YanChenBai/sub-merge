import { db, sub } from '#server/db'
import { updateSubSchema } from '#shared/schema/sub'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { id, name, url } = await readValidatedBody(event, (body) => {
    return TValue.Parse(updateSubSchema, body)
  })

  await db.update(sub)
    .set({
      name: name.trim(),
      url: url.trim(),
    })
    .where(eq(sub.id, id))
})
