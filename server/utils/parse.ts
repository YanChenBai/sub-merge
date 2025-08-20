import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { createInsertSchema } from 'drizzle-typebox'
import { rule, sub } from '~~/server/db'

export const subInsertSchema = createInsertSchema(sub)
export const ruleInsertSchema = createInsertSchema(rule)
export const parseId = (value: any) => Value.Parse(Type.Number(), value)
export const parseName = (value: any) => Value.Parse(Type.String(), value)

export function parseInsertSub(value: any) {
  return Value.Parse(
    Type.Omit(subInsertSchema, ['updatedAt', 'createdAt', 'content', 'main']),
    value,
  )
}

export function parseInsertRule(value: any) {
  return Value.Parse(Type.Omit(ruleInsertSchema, ['updatedAt', 'createdAt']), value)
}
