declare namespace NodeJS {
  interface ProcessEnv {
    /** PostgreSQL connection string */
    readonly DATABASE_URL?: string

    /** API token */
    readonly API_TOKEN?: string
  }
}
