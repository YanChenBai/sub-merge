import type { Static } from '@sinclair/typebox'

export const schema = T.Object({
  token: T.String({
    minLength: 1,
  }),
})

export type Schema = Static<typeof schema>
