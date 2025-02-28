import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { db } from "../lib/db"
import type { Note, NoteDTO } from "@/types"
import { RecordId } from "surrealdb"
import { ulid } from "ulid"

export const useGetNotes = () =>
  useQuery<Note[], Error>({
    queryKey: ['notes'],
    queryFn: () => db.select<Note>('note')
  })

export const useGetNote = (id: string) =>
  useQuery({
    queryKey: ['note', id],
    queryFn: () => db.select<Note>(new RecordId("note", id))
  })

export const useCreateNote = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (note: NoteDTO) => db.create('note', {
      id: new RecordId("note", ulid()),
      ...note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).then(res => res[0] as Note),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] })
  })
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (note: Note) => db.update(new RecordId("note", note.id.id), {
      title: note.title,
      content: note.content,
      updatedAt: new Date().toISOString(),
    }),
    onSuccess: (_, note) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['note', note.id.id] })
    }
  })
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => db.delete(new RecordId("note", id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] })
  })
}