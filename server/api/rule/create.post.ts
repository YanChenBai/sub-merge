import { db, rule } from '~~/server/db'
import { parseInsertRule } from '~~/server/utils/parse'

export default defineEventHandler(async (event) => {
  const data = parseInsertRule(await readBody(event))
  await db.insert(rule).values(data)
})
