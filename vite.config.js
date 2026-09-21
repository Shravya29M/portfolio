import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'json-summary'],
      include: ['src/**/*.{js,jsx}'],
      // main.jsx only mounts the app; the assets are static data blobs.
      exclude: ['src/main.jsx', 'src/assets/**', 'src/test/**'],
      thresholds: {
        lines: 100,
        statements: 100,
        functions: 100,
        branches: 95,
      },
    },
  },
})
