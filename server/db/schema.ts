import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { boolean, index, integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const sub = pgTable('sub', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: varchar().unique().notNull(),
  name: varchar().unique().notNull(),
  content: text(),
  main: boolean().default(false),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, table => [
  index('sub_idx').on(table.id),
  index('sub_name_idx').on(table.name),
])

export const rule = pgTable('rule', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  value: varchar().unique().notNull(),
  enabled: boolean().notNull().default(true),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, table => [
  index('rule_idx').on(table.id),
])

export type Sub = InferSelectModel<typeof sub>
export type Rule = InferSelectModel<typeof rule>
