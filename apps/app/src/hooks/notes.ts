import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { db } from "../lib/db"
import type { Note, NoteDTO } from "@/types"
import { RecordId } from "surrealdb"
import { ulid } from "ulid"

export const useGetNotes = () => {
  return useQuery<Note[], Error>({
    queryKey: ['notes'],
    queryFn: async () => await db.select<Note>('note')
  })
}

export const useCreateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (note: NoteDTO) => await db.create('note', {
      id: new RecordId("note", ulid()),
      ...note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: RecordId) => await db.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (note: Note) => await db.update(note.id, {
      title: note.title + ' (updated)',
      content: note.content,
      updatedAt: new Date().toISOString(),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}