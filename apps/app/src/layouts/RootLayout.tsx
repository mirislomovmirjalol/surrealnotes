import { Outlet } from 'react-router-dom'
import { Providers } from '../components/providers'
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar"
import { AppSidebar } from '../components/app-sidebar'

export default function RootLayout() {
  return (
    <Providers>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </Providers>
  )
} 