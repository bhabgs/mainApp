import instance from '..';

export default {
  /**
   * 修改用户
   */
  editUserRecord: (data: any) => {
    return instance.put('/common/v1/user/updateUser', data);
  },
  /**
   * 个人设置 修改密码
   */
  changePassword: (data: any) => {
    return instance.post(`/common/v1/user/resetPassword`, data);
  },
  /**
   * 查询用户详情|个人设置页
   * userId 个人设置页 此值为null
   */
  detail: (params: any) => {
    return instance.get('/common/v1/user/detail', { params });
  },
};
