import { db, rule } from '#server/db'

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, (body) => {
    return TValue.Parse(T.Array(T.String()), body)
  })

  for (const value of data)
    await db.insert(rule).values({ value })
})
