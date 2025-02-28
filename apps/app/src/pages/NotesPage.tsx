import { useGetNotes, useCreateNote } from '@/hooks/notes'
import { Button } from '@workspace/ui/components/button'
import { NoteCard } from '@/components/note-card'
import { useNavigate } from 'react-router-dom'

export default function NotesPage() {
  const navigate = useNavigate()
  const { data: notes = [] } = useGetNotes()
  const { mutate: createNote, isPending } = useCreateNote()

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notes</h1>
        <Button
          onClick={() => createNote(
            { title: 'Untitled Note', content: '' },
            { onSuccess: note => navigate(`/${note.id.id}`) }
          )}
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'New Note'}
        </Button>
      </div>

      {notes.length > 0 ? (
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