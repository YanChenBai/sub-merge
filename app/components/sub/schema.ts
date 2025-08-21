import type { Static } from '@sinclair/typebox'

export const schema = T.Object({
  name: T.String({
    maxLength: 10,
    minLength: 2,
  }),
  url: T.String({
    pattern: '^https?:\/\/.+$',
  }),
})

export type Schema = Static<typeof schema>
