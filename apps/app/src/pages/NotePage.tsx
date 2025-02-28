import { useParams } from 'react-router-dom'
import { useGetNote } from '@/hooks/notes'
import { NoteEditor } from '@/components/note-editor'

export default function NotePage() {
  const { ulid } = useParams()
  const { data: note, isLoading } = useGetNote(ulid as string)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center text-muted-foreground">Note not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <NoteEditor note={note} />
    </div>
  )
} 