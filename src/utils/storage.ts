/**
 * 获取
 * @param key key
 */
export function getItem(key: string) {
  const res = sessionStorage.getItem(key);
  if (res) {
    try {
      return JSON.parse(res);
    } catch (e) {
      return res;
    }
  }
}

/**
 * 设置值
 * @param key key
 */
export function setItem(key: string, value: unknown) {
  const json: any = typeof value === 'object' ? JSON.stringify(value) : value;
  sessionStorage.setItem(key, json);
}

/**
 * 删除
 * @param key key
 */
export function removeItem(key) {
  sessionStorage.removeItem(key);
}

/**
 * 全部删除
 */
export function clear() {
  sessionStorage.clear();
}

export default {
  getItem,
  setItem,
  removeItem,
  clear,
};
