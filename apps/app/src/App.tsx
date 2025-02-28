import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@workspace/ui/components/button'
import '@/lib/fonts'
import { Providers } from './components/providers'
import { useCreateNote, useDeleteNote, useGetNotes, useUpdateNote } from './hooks/notes'
import { jsonify } from 'surrealdb'
import { db } from './lib/db'

function App() {
  return (
    <Providers>
      <div className="min-h-screen bg-background p-4 font-sans">
        <h1 className="text-4xl font-bold text-foreground mb-4">SurrealNotes</h1>
        <Notes />
      </div>
    </Providers>
  )
}

export default App


const Notes = () => {
  const { data } = useGetNotes()
  const deleteNote = useDeleteNote()
  const updateNote = useUpdateNote()
  return (
    <div>
      {data?.map((note, index) => (
        <div key={index}>
          <h4>{jsonify(note.id)}</h4>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <Button onClick={() => deleteNote.mutate(note.id)}>Delete</Button>
          <Button onClick={() => updateNote.mutate(note)}>Update</Button>
        </div>
      ))}
      <CreateNoteButton />
      <DeleteNoteButton />
    </div>
  )
}

const CreateNoteButton = () => {
  const queryClient = useQueryClient()
  const createNote = useCreateNote()

  return (
    <Button onClick={() => createNote.mutate({ title: 'New Note', content: 'This is a new note' })}>Create Note</Button>
  )
}

const DeleteNoteButton = () => {
  const queryClient = useQueryClient()
  const deleteNote = async () => {
    await db.delete('note')
    queryClient.invalidateQueries({ queryKey: ['notes'] })
  }

  return <Button onClick={deleteNote}>Delete Note</Button>
}
