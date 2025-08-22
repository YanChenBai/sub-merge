export interface Trojan {
  'name': string
  'type': 'trojan'
  'server': string
  'port': number
  'password': string
  'sni': string
  'skip-cert-verify': boolean
  'udp': boolean
  'tls': boolean
}

export interface Vmess {
  name: string
  type: 'vmess'
  server: string
  port: number
  uuid: string
  alterId: number
  cipher: string
  udp: boolean
  tls?: string
}

export type Proxy = Trojan | Vmess

export interface ProxyGroups {
  name: string
  proxies: string[]
}

export interface SubContent {
  'proxies': Proxy[]
  'proxy-groups': ProxyGroups[]
  'rules': string[]
}

export enum Platform {
  CLASH = 'clash',
  V2RAY = 'v2ray',
}
