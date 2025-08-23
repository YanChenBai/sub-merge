import { db, group } from '#server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (params) => {
    return TValue.Parse(T.Object({ id: T.Number() }), params)
  })

  const { enabled } = await readValidatedBody(event, (body) => {
    return TValue.Parse(T.Object({ enabled: T.Boolean() }), body)
  })

  await db.update(group).set({ enabled }).where(eq(group.id, id))
})
