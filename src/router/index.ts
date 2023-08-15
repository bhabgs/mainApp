import { createRouter, createWebHashHistory } from 'vue-router';
// const Main = () => import('@/view/main');
// const Login = () => import('@/view/login');
import { setRouter } from './placeRouter';
import Main from '@/view/main';
import Login from '@/view/login';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/:afterUser(.*)',
      component: Main,
    },
  ],
});

setRouter(router);

export default router;
