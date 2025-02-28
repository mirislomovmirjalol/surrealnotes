import * as React from "react"
import { GalleryVerticalEnd, Plus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@workspace/ui/components/sidebar"
import { Button } from "@workspace/ui/components/button"
import { Link, useNavigate } from "react-router-dom"
import { useCreateNote } from "@/hooks/notes"

const data = {
  navMain: [
    {
      title: "Notes",
      url: "#",
      items: [
        {
          title: "Notes",
          url: "/",
        },
        {
          title: "New Note",
          url: "/new",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { mutate: createNote, isPending } = useCreateNote()
  const navigate = useNavigate()

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              SurrealNotes
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.url === window.location.pathname}>
                          <Link to={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
