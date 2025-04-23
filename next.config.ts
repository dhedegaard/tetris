import type { NextConfig } from 'next'

export default {
  reactStrictMode: true,
  output: 'export',
  experimental: {
    reactCompiler: true,
  },
} satisfies NextConfig
