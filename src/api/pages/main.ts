import instance from '..';

/**
 * 获取用户菜单权限树
 */
export const getUserMenu = () => instance.get('/common/v1/menu/tree');

/**
 * 获取网站logo
 */
export const getWebLogo = (imgType, editImg): any =>
  instance.get(
    `/common/v1/sysconfig/searchImage?imgType=${imgType}&editImg=${editImg}&clientType=web`,
    {
      responseType: 'blob',
      headers: {
        'Content-Disposition': 'attachment',
        'Content-Type': 'text/html;charset=UTF-8',
      },
    },
  );

/**
 * 获取未读消息条数
 */
export const getUnreadMessageCount = () =>
  instance.get('/common/v1/message/existUnreadMsg', {
    headers: { noAlert: true },
  });
