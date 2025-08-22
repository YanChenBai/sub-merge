import dayjs from 'dayjs'

export const formatDay = (date: dayjs.ConfigType) => dayjs(date).format('YY/MM/DD HH:mm:ss')
