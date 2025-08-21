import { db, rule } from '#server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (params) => {
    return TValue.Parse(T.Object({ id: T.Number() }), params)
  })

  const { enabled } = await readValidatedBody(event, (body) => {
    return TValue.Parse(T.Object({ enabled: T.Boolean() }), body)
  })

  await db.update(rule).set({ enabled }).where(eq(rule.id, id))
})
