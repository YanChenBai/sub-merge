import type { Proxy, Trojan, Vmess } from '#server/types'
import { Buffer } from 'node:buffer'

export function trojanToUri(node: Trojan) {
  const params = new URLSearchParams()

  params.set('sni', node.sni)
  params.set('allowInsecure', node['skip-cert-verify'] ? '1' : '0')

  return `trojan://${node.password}@${node.server}:${node.port}?${params.toString()}#${encodeURIComponent(node.name)}`
}

export function vmessToUri(node: Vmess) {
  const obj = {
    v: '2',
    ps: node.name,
    add: node.server,
    port: `${node.port}`,
    id: node.uuid,
    aid: node.alterId,
    tls: node.tls || '',
    scy: node.cipher,
    type: '',
    net: '',
  }

  return `vmess://${Buffer.from(JSON.stringify(obj)).toString('base64')}`
}

export function transformToUri(node: Proxy) {
  if (node.type === 'vmess') {
    return vmessToUri(node)
  }
  else if (node.type === 'trojan') {
    return trojanToUri(node)
  }
  else {
    return null
  }
}

export function transformToV2ray(proxies: Proxy[]) {
  const content = proxies.map(transformToUri).filter(Boolean).join('\n')
  return Buffer.from(content, 'utf8').toString('base64')
}
