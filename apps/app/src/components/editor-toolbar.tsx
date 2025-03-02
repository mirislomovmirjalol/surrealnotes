import { Editor } from '@tiptap/react'
import { Button } from '@workspace/ui/components/button'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  CheckSquare,
} from 'lucide-react'
import { DeleteConfirmModal } from './delete-confirm-modal'

interface EditorToolbarProps {
  editor: Editor | null
  onDelete?: () => void
  isDeleting?: boolean
  showDeleteButton?: boolean
}

export function EditorToolbar({
  editor,
  onDelete,
  isDeleting,
  showDeleteButton = true
}: EditorToolbarProps) {
  if (!editor) return null

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-accent' : ''}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-accent' : ''}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="border-r h-6 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-accent' : ''}
          aria-label="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={editor.isActive('taskList') ? 'bg-accent' : ''}
          aria-label="Task List"
        >
          <CheckSquare className="h-4 w-4" />
        </Button>
        {showDeleteButton && onDelete && (
          <DeleteConfirmModal
            onDelete={onDelete}
            isDeleting={isDeleting || false}
          />
        )}
      </div>
    </div>
  )
} 