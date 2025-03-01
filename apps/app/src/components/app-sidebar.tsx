import * as React from "react"
import { GalleryVerticalEnd, Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@workspace/ui/components/sidebar"
import { Button } from "@workspace/ui/components/button"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useCreateNote, useGetNotes } from "@/hooks/notes"
import { ThemeToggle } from "./theme-toggle"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { mutate: createNote, isPending } = useCreateNote()
  const navigate = useNavigate()
  const { data: notes, isLoading } = useGetNotes()
  const { id } = useParams()

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/" className="text-xl font-bold">
                  Surreal Notes
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
        <Button
          size="sm"
          onClick={() => createNote(
            { title: 'Untitled Note', content: '' },
            { onSuccess: note => navigate(`/${note.id.id}`) }
          )}
          disabled={isPending}>
          <Plus />
          Create Note
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {isLoading ? (
              // Show skeletons while loading
              Array.from({ length: 5 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton />
                </SidebarMenuItem>
              ))
            ) : notes?.length ? (
              // Show notes
              notes.map((note) => (
                <SidebarMenuItem key={note.id.toString()}>
                  <SidebarMenuButton
                    asChild
                    isActive={id === note.id.toString()}
                    tooltip={note.title}
                  >
                    <Link to={`/${note.id.id}`}>
                      {note.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            ) : (
              // Show empty state
              <SidebarMenuItem>
                <SidebarMenuButton disabled>
                  No notes yet
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
