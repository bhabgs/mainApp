/**
 * 获取随机数
 * @param max 最大
 * @param min 最小
 */
export function randomNumber(max = 100, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 随机字符串
 * @param length 长度
 */
export function ramdomString(length = 6) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/**
 * 随机颜色
 */
export function randomColor(mode = 'light') {
  const isLight = mode === 'light';

  const r = isLight ? randomNumber(255, 128) : randomNumber(128, 50);
  const g = isLight ? randomNumber(255, 128) : randomNumber(128, 50);
  const b = isLight ? randomNumber(255, 128) : randomNumber(128, 50);
  return `rgb(${r}, ${g}, ${b})`;
}

export default '';
