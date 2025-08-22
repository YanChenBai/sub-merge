import { db, rule } from '#server/db'
import { createRuleSchema } from '#shared/schema'

export default defineEventHandler(async (event) => {
  const { value, remark } = await readValidatedBody(event, (body) => {
    return TValue.Parse(createRuleSchema, body)
  })

  await db.insert(rule).values({
    value: value.trim(),
    remark: remark?.trim(),
  })
})
