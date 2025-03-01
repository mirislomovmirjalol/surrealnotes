import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarTrigger } from '@workspace/ui/components/sidebar'
import { Providers } from '@/components/providers'

export default function RootLayout() {
  return (
    <Providers>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        <Outlet />
      </main>
    </Providers>
  )
} 