import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vitejs.dev/config /
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.clinicaltrialskorea.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
    },
  },
});
