import { db, rule } from '#server/db'
import { updateRuleSchema } from '#shared/schema/rule'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { id, value, remark } = await readValidatedBody(event, (body) => {
    return TValue.Parse(updateRuleSchema, body)
  })

  await db.update(rule)
    .set({ value, remark })
    .where(eq(rule.id, id))
})
