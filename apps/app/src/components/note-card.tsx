import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card'
import type { Note } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const navigate = useNavigate()
  const preview = note.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .slice(0, 150) // Get first 150 characters
    .trim()

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={() => navigate(`/${note.id.id}`)}
    >
      <CardHeader className="">
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>Updated {formatDistanceToNow(new Date(note.updatedAt))} ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{preview}</p>
      </CardContent>
    </Card>
  )
} 