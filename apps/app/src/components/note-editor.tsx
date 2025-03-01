import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useUpdateNote, useDeleteNote } from '@/hooks/notes'
import type { Note } from '@/types'
import { useNavigate } from 'react-router-dom'
import { DeleteConfirmModal } from './delete-confirm-modal'

export function NoteEditor({ note }: { note: Note }) {
  const navigate = useNavigate()
  const { mutate: updateNote } = useUpdateNote()
  const { mutate: deleteNote, isPending } = useDeleteNote()

  const editor = useEditor({
    extensions: [StarterKit],
    content: note.content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[calc(100vh-5rem)] text-foreground'
      }
    },
    onUpdate: ({ editor }) => updateNote({
      ...note,
      content: editor.getHTML(),
      updatedAt: new Date().toISOString()
    }),
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-4 gap-2">
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={e => {
            const title = e.target.textContent
            if (title && title !== note.title) {
              updateNote({
                ...note,
                title,
                updatedAt: new Date().toISOString()
              })
            }
          }}
          className="text-2xl font-bold focus:outline-none border-b border-transparent focus:border-border w-full"
        >
          {note.title}
        </h1>
        <DeleteConfirmModal onDelete={() => {
          deleteNote(note.id.id.toString(), {
            onSuccess: () => navigate('/')
          })
        }}
          isDeleting={isPending}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
} 