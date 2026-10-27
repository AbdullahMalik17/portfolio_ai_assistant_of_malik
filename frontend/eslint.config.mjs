import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'next-env.d.ts',
      'node_modules/**',
      'out/**',
      'public/sw.js',
      'scripts/**',
    ],
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
]

export default eslintConfig
