import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useUpdateNote, useDeleteNote } from '@/hooks/notes'
import { Button } from '@workspace/ui/components/button'
import type { Note } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DeleteConfirmModal } from './delete-confirm-modal'

interface NoteEditorProps {
  note: Note
}

export function NoteEditor({ note }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title)
  const { mutate: updateNote } = useUpdateNote()
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote()
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

  useEffect(() => {
    // Focus the editor if it's a new note (empty content)
    if (!note.content) {
      editor?.commands.focus()
    }
  }, [editor, note.content])

  const handleTitleChange = (e: React.FocusEvent<HTMLHeadingElement>) => {
    const newTitle = e.target.textContent ?? note.title
    setTitle(newTitle)

    if (newTitle !== note.title) {
      updateNote({
        ...note,
        title: newTitle,
        updatedAt: new Date().toISOString(),
      })
    }
  }

  const handleDelete = () => {
    deleteNote(note.id.id.toString(), {
      onSuccess: () => navigate('/')
    })
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
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <DeleteConfirmModal onDelete={handleDelete} isDeleting={isDeleting} />
        </div>
      </div>
      <div>
        <EditorContent editor={editor} className="min-h-[calc(100vh-12rem)]" />
      </div>
    </div>
  )
} 