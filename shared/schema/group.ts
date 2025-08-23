import type { Static } from '@sinclair/typebox'

export const createGroupSchema = T.Object({
  name: T.String({
    maxLength: 255,
    minLength: 1,
  }),
})

export const updateGroupSchema = T.Intersect([
  createGroupSchema,
  T.Object({
    id: T.Number(),
  }),
])

export type CreateGroupSchema = Static<typeof createGroupSchema>
export type UpdateGroupSchema = Static<typeof updateGroupSchema>
