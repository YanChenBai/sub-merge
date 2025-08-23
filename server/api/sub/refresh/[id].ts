import { db, sub } from '#server/db'
import { Platform } from '#server/types'
import { eq } from 'drizzle-orm'
import { base64ToSub } from '~~/server/utils/parse-sub'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (params) => {
    return TValue.Parse(T.Object({ id: T.Number() }), params)
  })

  const rows = await db.select().from(sub).where(eq(sub.id, id)).limit(1)

  if (rows.length <= 0)
    return setResponseStatus(event, 404)

  const [data] = rows

  const url = new URL(data.url)

  const target = url.searchParams.get('target')

  const content = await fetch(data.url)
    .then(res => res.text())
    .then(res => target === Platform.V2RAY ? base64ToSub(res) : res)

  await db.update(sub).set({ content }).where(eq(sub.id, id))
})
