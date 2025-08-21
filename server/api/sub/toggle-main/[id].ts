import { db, sub } from '#server/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (params) => {
    return TValue.Parse(T.Object({ id: T.Number() }), params)
  })

  const [[target], [main]] = await Promise.all([
    db.select({ main: sub.main, id: sub.id }).from(sub).where(eq(sub.id, id)).limit(1),
    db.select({ main: sub.main, id: sub.id }).from(sub).where(eq(sub.main, true)).limit(1),
  ])

  if (!target) {
    return setResponseStatus(event, 404)
  }

  await db.transaction(async (tx) => {
    if (main) {
      await tx.update(sub).set({ main: false }).where(eq(sub.id, main.id))
    }

    await tx.update(sub).set({ main: !target.main }).where(eq(sub.id, target.id))
  })
})
