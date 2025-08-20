import { eq } from 'drizzle-orm'
import { db, sub } from '~~/server/db'

export default defineEventHandler(async (event) => {
  const id = parseId(getRouterParam(event, 'id'))
  const rows = await db.select().from(sub).where(eq(sub.id, id)).limit(1)

  if (rows.length <= 0)
    return setResponseStatus(event, 404)

  const [data] = rows

  const content = await fetch(data.url).then(res => res.text())

  await db.update(sub).set({ content }).where(eq(sub.id, id))
})
