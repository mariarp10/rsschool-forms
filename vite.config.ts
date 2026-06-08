import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@icons': new URL('src/assets/icons', import.meta.url).pathname,
      '@components': new URL('src/components', import.meta.url).pathname,
      '@utils': new URL('src/utils', import.meta.url).pathname,
      '@stores': new URL('src/stores', import.meta.url).pathname,
    },
  },

  test: {
    environment: 'jsdom',
    setupFiles: '__tests__/setup.ts',
    globals: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],

      include: ['src/**/*.{tsx,ts}'],

      exclude: ['src/main.tsx', 'src/App.tsx'],

      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
});
