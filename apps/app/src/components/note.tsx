import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useUpdateNote, useDeleteNote } from '@/hooks/notes'
import { Button } from '@workspace/ui/components/button'
import type { Note as NoteType } from '@/types'
import { useNavigate } from 'react-router-dom'

interface NoteProps {
  note: NoteType
}

export function Note({ note }: NoteProps) {
  const { mutate: updateNote } = useUpdateNote()
  const { mutate: deleteNote } = useDeleteNote()
  const navigate = useNavigate()
  const editor = useEditor({
    extensions: [StarterKit],
    content: note.content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      updateNote({
        ...note,
        content: editor.getHTML(),
        updatedAt: new Date().toISOString(),
      })
    },
  })

  const handleTitleChange = (e: React.FocusEvent<HTMLHeadingElement>) => {
    const newTitle = e.target.textContent
    if (newTitle && newTitle !== note.title) {
      updateNote({
        ...note,
        title: newTitle,
        updatedAt: new Date().toISOString(),
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
          className="text-2xl font-bold focus:outline-none border-b border-transparent focus:border-border"
        >
          {note.title}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              deleteNote(note.id.id.toString())
              navigate('/')
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <div>
        <EditorContent editor={editor} className="min-h-[calc(100vh-12rem)]" />
      </div>
    </div>
  )
} 