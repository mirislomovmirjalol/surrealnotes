import { fontVariables } from '@/lib/fonts.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useLayoutEffect, type PropsWithChildren } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: false,
    },
  },
})

export function Providers({ children }: PropsWithChildren) {
  useLayoutEffect(() => {
    Object.entries(fontVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
} 