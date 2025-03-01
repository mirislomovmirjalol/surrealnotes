import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import { Providers } from '@/components/providers'
import { MobileMenu } from '@/components/mobile-menu'

export default function RootLayout() {
  return (
    <Providers>
      <AppSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <MobileMenu />
    </Providers>
  )
} 