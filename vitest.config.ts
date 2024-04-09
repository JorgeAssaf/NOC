import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./setupTest.ts'],
  },
})
