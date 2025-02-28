// We're using @fontsource packages instead of next/font since we're using Vite
import '@fontsource-variable/inter'
import '@fontsource/jetbrains-mono'

// Export font class names
export const fontSans = 'font-sans'
export const fontMono = 'font-mono'

// CSS variables for the fonts
export const fontVariables = {
  '--font-sans': 'Inter Variable, system-ui, sans-serif',
  '--font-mono': 'JetBrains Mono, monospace',
} 