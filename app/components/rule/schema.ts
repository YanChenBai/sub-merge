import type { Static } from '@sinclair/typebox'

export const schema = T.Object({
  value: T.String({
    maxLength: 255,
    minLength: 1,
  }),
})

export type Schema = Static<typeof schema>
