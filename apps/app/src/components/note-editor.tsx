import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useUpdateNote } from '@/hooks/notes'
import type { Note } from '@/types'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { useEffect } from 'react'

interface NoteEditorProps {
  note: Note
  onEditorReady?: (editor: ReturnType<typeof useEditor>) => void
}

export function NoteEditor({ note, onEditorReady }: NoteEditorProps) {
  const { mutate: updateNote } = useUpdateNote()

  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList.configure({
        HTMLAttributes: {
          class: 'task-list',
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'task-item',
        },
      }),
    ],
    content: note.content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[calc(100vh-12rem)] text-foreground typography'
      }
    },
    onUpdate: ({ editor }) => updateNote({
      ...note,
      content: editor.getHTML(),
      updatedAt: new Date().toISOString()
    }),
  })

  // this effect is to update the editor content when the note changes. tiptap is not updating the content when the note changes.
  useEffect(() => {
    if (editor && note.content !== editor.getHTML()) {
      editor.commands.setContent(note.content)
    }
  }, [editor, note.id, note.content])

  // Notify parent when editor is ready
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor)
    }
  }, [editor, onEditorReady])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-4 gap-2">
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
          className="text-2xl font-medium focus:outline-none border-b border-transparent focus:border-border w-full"
        >
          {note.title}
        </h1>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
} 