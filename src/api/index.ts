import { ApiInstance } from 'inl-ui/dist/utils';
import { message } from 'ant-design-vue';
import { getRouter } from '../router/placeRouter';

const apiInstance = new ApiInstance({
  timeout: 1000 * 10,
  onTokenExpired(res) {
    message.error('登录已过期，请重新登录');
    const router = getRouter();
    router.push('/login');
  },
  baseURL: '/api/',
});

const instance = apiInstance.instance;

export default instance;
