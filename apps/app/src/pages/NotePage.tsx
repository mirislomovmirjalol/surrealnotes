import { useParams, useNavigate } from 'react-router-dom'
import { useGetNote, useDeleteNote } from '@/hooks/notes'
import { NoteEditor } from '@/components/note-editor'
import { NoteLayout } from '@/layouts/note-layout'
import { useState } from 'react'
import { Editor } from '@tiptap/react'

export default function NotePage() {
  const { ulid } = useParams()
  const navigate = useNavigate()
  const { data: note, isLoading } = useGetNote(ulid as string)
  const { mutate: deleteNote, isPending } = useDeleteNote()
  const [editor, setEditor] = useState<Editor | null>(null)

  if (isLoading) {
    return (
      <NoteLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8" />
        </div>
      </NoteLayout>
    )
  }

  if (!note) {
    return (
      <NoteLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center text-muted-foreground">Note not found</div>
        </div>
      </NoteLayout>
    )
  }

  const handleDelete = () => {
    deleteNote(note.id.id.toString(), {
      onSuccess: () => navigate('/')
    })
  }

  return (
    <NoteLayout
      note={{
        updatedAt: note.updatedAt,
        id: { id: note.id.id.toString() }
      }}
      editor={editor}
      onDelete={handleDelete}
      isDeleting={isPending}
    >
      <div className="container mx-auto">
        <NoteEditor
          key={note.id.id.toString()}
          note={note}
          onEditorReady={setEditor}
        />
      </div>
    </NoteLayout>
  )
} 