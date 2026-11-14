import { defineConfig } from 'vitest/config'

export default defineConfig({
  // tsconfig says `jsx: preserve` for Next, so tell the transform to compile JSX.
  oxc: { jsx: { runtime: 'automatic' } },
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
