import { useGetNotes, useCreateNote } from '@/hooks/notes'
import { Button } from '@workspace/ui/components/button'
import { NoteCard } from '@/components/note-card'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from '@workspace/ui/components/skeleton'
export default function NotesPage() {
  const navigate = useNavigate()
  const { data: notes, isLoading } = useGetNotes()
  const { mutate: createNote, isPending } = useCreateNote()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notes</h1>
      </div>

      {notes && notes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
          {notes.map(note => <NoteCard key={note.id.toString()} note={note} />)}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          No notes yet. Create one to get started!
        </div>
      )}
    </div>
  )
} 