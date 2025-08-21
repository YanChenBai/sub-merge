import type { FormError } from '@nuxt/ui'
import type { TObject } from '@sinclair/typebox'

export function validate<S extends TObject>(schema: S, state: any) {
  const errors: FormError[] = []

  for (const item of TValue.Errors(schema, state)) {
    errors.push({
      name: item.path.substring(1),
      message: item.message,
    })
  }

  return errors
}

export function createFormValidator<S extends TObject>(schema: S) {
  return (state: any) => validate(schema, state)
}
