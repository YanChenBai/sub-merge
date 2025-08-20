import { boolean, index, integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const sub = pgTable('sub', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: varchar().notNull(),
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
  value: varchar().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, table => [
  index('rule_idx').on(table.id),
])
