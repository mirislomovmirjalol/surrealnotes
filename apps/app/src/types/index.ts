import type { RecordId } from "surrealdb"

export type Note = {
  id: RecordId
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export type NoteDTO = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>

