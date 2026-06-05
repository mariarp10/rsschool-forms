import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',
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
