/**
 * 时间处理工具
 */
import dayjs from 'dayjs';

/**
 * 时间格式化
 * @param timeStr 时间字符串
 * @param pattern 格式化格式
 */
export function formatTime(timeStr: string, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(timeStr).format(pattern);
}

/**
 * 日期格式化
 * @param timeStr 时间字符串
 * @param pattern 格式化格式
 */
export function formatDate(timeStr: string, pattern = 'YYYY-MM-DD') {
  return dayjs(timeStr).format(pattern);
}
