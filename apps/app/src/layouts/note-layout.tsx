import { ArrowLeft } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { useNavigate } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import { Editor } from '@tiptap/react'
import { EditorToolbar } from '@/components/editor-toolbar'
interface NoteLayoutProps {
  children: React.ReactNode
  note?: {
    updatedAt: string
    id?: { id: string }
  }
  editor?: Editor | null
  onDelete?: () => void
  isDeleting?: boolean
}

export function NoteLayout({
  children,
  note,
  editor,
  onDelete,
  isDeleting
}: NoteLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col">
      <div className="sticky top-0 bg-background/30 backdrop-blur-sm z-10 border-b border-border px-4">
        <header className="flex items-center justify-between gap-4 py-4 container mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="hidden lg:block">
            {editor && (
              <EditorToolbar editor={editor} onDelete={onDelete} isDeleting={isDeleting} />
            )}
          </div>

          {note && (
            <div className="text-sm text-muted-foreground">
              Last edited {formatDistance(new Date(note.updatedAt), new Date(), { addSuffix: true })}
            </div>
          )}
        </header>

        <div className="md:hidden">
          {editor && (
            <EditorToolbar editor={editor} onDelete={onDelete} isDeleting={isDeleting} />
          )}
        </div>
      </div>



      <div className="flex-1 overflow-auto px-4">
        {children}
      </div>
    </div>
  )
} 