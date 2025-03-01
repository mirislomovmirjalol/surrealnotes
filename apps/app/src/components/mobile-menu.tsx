import { useCreateNote } from "@/hooks/notes";
import { Button } from "@workspace/ui/components/button";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerOverlay } from "@workspace/ui/components/drawer";
import { Menu, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: createNote } = useCreateNote()
  const navigate = useNavigate()

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" className="fixed bottom-4 right-4 z-50 md:hidden flex justify-center items-center h-12 w-12">
          <Menu size={32} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={() => {
            createNote({ title: 'Untitled Note', content: '' }, { onSuccess: note => navigate(`/${note.id.id}`) })
            setIsOpen(false)
          }}>
            <Plus className="w-4 h-4" />
            Create Note
          </Button>
          <ThemeToggle />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}