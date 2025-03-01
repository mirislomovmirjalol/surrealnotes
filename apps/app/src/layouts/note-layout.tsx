import { ArrowLeft } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { useNavigate } from 'react-router-dom'

interface NoteLayoutProps {
  children: React.ReactNode
  note?: {
    updatedAt: string
  }
}

export function NoteLayout({ children, note }: NoteLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col px-4">
      <header className="flex items-center justify-between gap-4 py-4 container mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {note && (
          <div className="text-sm text-muted-foreground">
            Last edited {new Date(note.updatedAt).toLocaleDateString()}
          </div>
        )}
      </header>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
} 