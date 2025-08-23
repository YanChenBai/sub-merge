export const createSubSchema = T.Object({
  name: T.String({
    maxLength: 10,
    minLength: 2,
  }),
  url: T.String({
    pattern: '^https?:\/\/.+$',
  }),
})

export const updateSubSchema = T.Intersect([
  createSubSchema,
  T.Object({
    id: T.Number(),
  }),
])

export const querySchema = T.Object({
  target: T.Optional(T.String()),
  filter: T.Optional(T.String()),
})

export type CreateSubSchema = TStatic<typeof createSubSchema>
export type UpdateSubSchema = TStatic<typeof updateSubSchema>
