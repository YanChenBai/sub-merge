import { db, rule, sub } from '#server/db'
import { desc, eq } from 'drizzle-orm'
import YAML from 'yaml'

interface Proxies {
  name: string
}

interface ProxyGroups {
  name: string
  proxies: string[]
}

interface SubContent {
  'proxies': Proxies[]
  'proxy-groups': ProxyGroups[]
  'rules': string[]
}

const SELECT_POINT = '🚀 节点选择'
const DIRECT_POINT = 'DIRECT'
const EMPTY_SUB = 'proxies:'

// 获取所有规则
async function getCustomRules() {
  const rows = await db.select({ value: rule.value }).from(rule).where(eq(rule.enabled, true))
  return rows.map(({ value }) => value)
}

export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, 'token')

  if (!validateToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  // 数据库查询
  const rows = await db
    .select({ id: sub.id, content: sub.content, main: sub.main, name: sub.name })
    .from(sub)
    .orderBy(desc(sub.main))

  if (rows.length === 0)
    return EMPTY_SUB

  const subscriptions = rows.map((row) => {
    const parseContent = row.content ? (YAML.parse(row.content) as SubContent) : null
    const proxies = parseContent?.proxies.map((item) => {
      return {
        ...item,
        name: `${row.name} | ${item.name}`,
      }
    })
    return {
      ...row,
      content: {
        ...parseContent,
        proxies,
      },
    }
  })

  // 主订阅（优先 main，否则取第一个）
  const primarySubs = subscriptions.find(s => s.main) ?? subscriptions[0]

  // 合并所有 proxies
  const allProxies = subscriptions.reduce((pre, cur) => {
    const proxies = cur.content.proxies
    return proxies ? pre.concat(proxies) : pre
  }, [] as Proxies[])

  // 所有节点名称
  const allNodeNames = allProxies.map(item => item.name)
    // 过滤特殊节点
    .filter(item => item !== SELECT_POINT && item !== DIRECT_POINT)

  if (!primarySubs.content)
    return EMPTY_SUB

  // 加载自定义规则
  const additionalRules = await getCustomRules()

  // 合并规则
  primarySubs.content.rules?.unshift(...additionalRules)

  primarySubs.content.proxies = allProxies

  primarySubs.content['proxy-groups'] = primarySubs.content['proxy-groups']
    ?.map((item) => {
      item.proxies = item.name.includes('节点选择')
        ? [DIRECT_POINT, ...allNodeNames]
        : [DIRECT_POINT, SELECT_POINT, ...allNodeNames]
      return item
    })

  setHeaders(event, {
    'Content-Type': ' text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  })

  return YAML.stringify(primarySubs.content)
})
