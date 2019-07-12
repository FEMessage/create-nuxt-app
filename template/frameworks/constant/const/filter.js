import dayjs from 'dayjs'

export function formatDate(time, format = 'YYYY-MM-DD') {
  if (!time && time !== 0) {
    return ''
  }
  return dayjs(time).format(format)
}
