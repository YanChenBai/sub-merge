import process from 'node:process'

export function validateToken(token: string | undefined | null) {
  const API_TOKEN = process.env?.API_TOKEN
  return Boolean(token) && Boolean(API_TOKEN) && token === API_TOKEN
}
