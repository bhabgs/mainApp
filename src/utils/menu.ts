/**
 * 菜单工具函数
 */
import { IMenuItem, MenuList } from '@/view/main';

/**
 * 根据key路径查找菜单
 * @param menuList 菜单树结构
 * @param keyPath id路径
 * @param keyProp key
 */
export function getMenuByKeyPath(
  menuList: MenuList,
  keyPath: string[],
  keyProp = 'id',
) {
  function getMenuByKey(list: MenuList, key: string) {
    return list.find((item) => item[keyProp] && item[keyProp] === key);
  }

  let list = menuList;

  for (let i = 0; i < keyPath.length; i++) {
    const menu = getMenuByKey(list, keyPath[i]);
    if (!menu) return;
    if (i === keyPath.length - 1) {
      return menu;
    }
    list = menu.subList;
  }
}

/**
 * 展平菜单结构
 * @param menuList 菜单列表
 */
export function flattenMenu(menuList: MenuList) {
  const res: MenuList = [];

  for (const menu of menuList) {
    res.push(menu);
    res.push(...menu.subList);
  }

  return res;
}

/**
 * 根据菜单属性查找菜单
 * @param menuList 菜单列表
 * @param key 唯一标识
 * @param propName 唯一标识的key
 */
export function getMenuByKey(menuList: MenuList, key: string, propName = 'id') {
  const flattenMenuList = flattenMenu(menuList);
  return flattenMenuList.find(
    (item) => item[propName] && item[propName] === key,
  );
}

/**
 * 根据子菜单的key获取最顶层菜单(顶部导航栏菜单)
 * @param navList 导航菜单列表
 * @param key 唯一标识
 * @param propName 唯一标识的key
 */
export function getNavByChildKey(
  navList: MenuList,
  key: string,
  propName = 'id',
) {
  for (const nav of navList) {
    const menu = getMenuByKey(nav.subList, key, propName);
    if (menu) {
      return nav;
    }
  }
}
