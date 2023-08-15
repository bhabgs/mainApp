import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

const additionalData = require('inl-ui/dist/theme').default;

const NODE_ENV =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
    ? 'development'
    : 'any';

export const pathResolve = (dir: string) => resolve(process.cwd(), '.', dir);

export default defineConfig({
  base: '/mtip-factory/',
  build: {},
  plugins: [vueJsx()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData,
      },
    },
  },
  resolve: {
    alias: {
      '@': pathResolve('src'),
    },
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    fs: {
      allow: ['../../../'],
    },
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/systemManager/': 'http://192.168.5.66:3503',
      '/micro-assets/': 'http://192.168.5.211',
      '/api/': {
        target: 'http://192.168.5.200',
      },
    },
  },
});
