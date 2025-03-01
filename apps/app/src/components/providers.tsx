import { fontVariables } from '@/lib/fonts.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useLayoutEffect, useState, type PropsWithChildren } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './theme-provider'
import { SidebarProvider } from '@workspace/ui/components/sidebar'

export function Providers({ children }: PropsWithChildren) {
  useLayoutEffect(() => {
    Object.entries(fontVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [])

  const [queryClient] = useState(new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 10 * (60 * 1000),
        gcTime: 1000 * 60 * 60,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="surreal-notes-theme">
        <SidebarProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
} 