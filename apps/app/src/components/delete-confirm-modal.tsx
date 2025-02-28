import { Button } from "@workspace/ui/components/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@workspace/ui/components/dialog";
import { Dialog } from "@workspace/ui/components/dialog";
import { Trash2 } from "lucide-react";
export function DeleteConfirmModal({ onDelete, isDeleting }: { onDelete: () => void, isDeleting: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isDeleting}>
          {isDeleting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-border" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Note</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this note?
        </DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={onDelete}>Delete</Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}