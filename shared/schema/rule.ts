import type { Static } from '@sinclair/typebox'

export const createRuleSchema = T.Object({
  value: T.String({
    maxLength: 255,
    minLength: 1,
  }),
})

export const updateRuleSchema = createRuleSchema

export type CreateRuleSchema = Static<typeof createRuleSchema>
export type UpdateRuleSchema = Static<typeof updateRuleSchema>
