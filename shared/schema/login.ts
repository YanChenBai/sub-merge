import type { Static } from '@sinclair/typebox'

export const loginSchema = T.Object({
  token: T.String({
    minLength: 1,
  }),
})

export type LoginSchema = Static<typeof loginSchema>
