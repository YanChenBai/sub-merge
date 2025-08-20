import { db, sub } from '~~/server/db'
import { parseInsertSub } from '~~/server/utils/parse'

export default defineEventHandler(async (event) => {
  const data = parseInsertSub(await readBody(event))
  await db.insert(sub).values(data)
})
