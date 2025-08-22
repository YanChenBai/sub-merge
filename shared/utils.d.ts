import type { Static } from '@sinclair/typebox'
import type { SerializeObject } from 'nitropack'
import type { ShallowRef } from 'vue'

import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

export {}

declare global {
  type ResultFlatten<T> = T extends Array<SerializeObject<infer R>>
    ? Array<R>
    : T extends SerializeObject<infer R> ? R : T

  type RefFlatten<T>
  = T extends ShallowRef<infer U>
    ? Exclude<U, never[]>
    : T

  type TStatic<Type extends TSchema> = Static<Type>

  const T = Type
  const TValue = Value
}
