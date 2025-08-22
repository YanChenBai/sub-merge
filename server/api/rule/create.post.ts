import type { CreateRuleSchema } from '#shared/schema'
import { db, rule } from '#server/db'
import { createInsertSchema } from 'drizzle-typebox'

const ruleInsertSchema = createInsertSchema(rule)

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, (body) => {
    return TValue.Parse(T.Omit(ruleInsertSchema, ['updatedAt', 'createdAt', 'enabled']), body)
  })

  await db.insert(rule).values(data)
})
