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
  return useMutation<Note, Error, NoteDTO>({
    mutationFn: async (note: NoteDTO) => {
      const created = await db.create('note', {
        id: new RecordId("note", ulid()),
        ...note,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      return created[0] as Note
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ulid: string) => await db.delete(new RecordId("note", ulid)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (note: Note) => await db.update(new RecordId("note", note.id.id), {
      title: note.title,
      content: note.content,
      updatedAt: new Date().toISOString(),
    }),
    onMutate: async (newNote) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['note', newNote.id.id] })
      await queryClient.cancelQueries({ queryKey: ['notes'] })

      // Snapshot the previous value
      const previousNote = queryClient.getQueryData(['note', newNote.id.id])
      const previousNotes = queryClient.getQueryData(['notes'])

      // Optimistically update the cache
      queryClient.setQueryData(['note', newNote.id.id], newNote)
      queryClient.setQueryData(['notes'], (old: Note[] | undefined) => {
        if (!old) return [newNote]
        return old.map(note => note.id.id === newNote.id.id ? newNote : note)
      })

      // Return a context object with the snapshotted value
      return { previousNote, previousNotes }
    },
    onError: (err, newNote, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousNote) {
        queryClient.setQueryData(['note', newNote.id.id], context.previousNote)
      }
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context.previousNotes)
      }
    },
    onSuccess: (_, note) => {
      // Invalidate both the notes list and the individual note
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['note', note.id.id] })
    },
  })
}

export const useGetNote = (ulid: string) => {
  return useQuery<Note, Error>({
    queryKey: ['note', ulid],
    queryFn: async () => await db.select<Note>(new RecordId("note", ulid)),
  })
}