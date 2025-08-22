const apps = [
  {
    name: 'SubMerge',
    script: '.output/server/index.mjs',
    interpreter: 'bun',
    env: {
      NITRO_PORT: 8124,
    },
  },
]

module.exports = {
  apps,
}
