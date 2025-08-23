import { Buffer } from 'node:buffer'
import YAML from 'yaml'

export function base64ToSub(str: string) {
  const content = Buffer.from(str, 'base64').toString('utf-8')
  const proxies = content.split('\n')
    .map(item => item.trim())
    .filter(Boolean)
    .map(item => URL.parse(item))
    .map((item) => {
      const type = item?.protocol.replace(':', '')

      let result: Record<string, any> = {
        'name': decodeURIComponent(item?.hash ?? '').substring(1),
        'type': type,
        'server': item?.hostname,
        'port': Number(item?.port),
        'password': item?.username,
        'skip-cert-verify': item?.searchParams.get('allowInsecure') === '1',
        'network': item?.searchParams.get('type') ?? 'tcp',
        'udp': true,
        ...Object.fromEntries((item?.searchParams.entries() ?? []).filter(item => item[0] !== 'allowInsecure')),
      }

      if (type === 'ss') {
        const [cipher, password] = Buffer.from(item?.username ?? '', 'base64').toString('utf-8').split(':')
        result = { ...result, cipher, password }
      }

      return result
    })

  return YAML.stringify({
    proxies,
  })
}
