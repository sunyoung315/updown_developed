import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

const BASE_URL = process.env.VITE_APP_BASE_URL;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      injectRegister: 'auto',
      manifest: {
        name: 'UpDown', // 설치 배너에 표시되는 이름
        short_name: 'UpDown', // 아이콘 아래에 표시될 이름
        description: '나의 건강 관리 메이트', // 프로젝트 설명
        theme_color: '#FFFEFC', // 앱의 주 테마 색상
        background_color: '#FFFEFC', // 앱의 배경 색상
        lang: 'ko', // 앱의 기본 언어
        display: 'standalone', // 브라우저 UI 없이 표시
        start_url: '/main',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      // workbox: {
      //   // 캐시 전략 설정
      //   runtimeCaching: [
      //     {
      //       urlPattern: /^https:\/\/updown\.run\/.*$/, // API 호출 URL 패턴
      //       handler: 'NetworkFirst', // 네트워크 우선 전략
      //       options: {
      //         cacheName: 'api-cache',
      //         expiration: {
      //           maxEntries: 50, // 최대 캐시 항목 수
      //           maxAgeSeconds: 24 * 60 * 60, // 최대 캐시 시간 (1일)
      //         },
      //       },
      //     },
      //     {
      //       urlPattern: /\.(?:js|css|html|png|jpg|jpeg|svg)$/, // 정적 자원 패턴
      //       handler: 'CacheFirst', // 캐시 우선 전략
      //       options: {
      //         cacheName: 'static-resources',
      //         expiration: {
      //           maxEntries: 100, // 최대 캐시 항목 수
      //           maxAgeSeconds: 30 * 24 * 60 * 60, // 최대 캐시 시간 (30일)
      //         },
      //       },
      //     },
      //   ],
      // },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
});
