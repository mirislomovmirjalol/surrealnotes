import baseConfig from '@workspace/ui/tailwind.config'

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
} 