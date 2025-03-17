"use client"

import { useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle } from 'lucide-react'

interface CommentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  comment: string
  onCommentChange: (comment: string) => void
  onSave: () => void
  chartTitle: string
}

export default function CommentDialog({
  open,
  onOpenChange,
  comment,
  onCommentChange,
  onSave,
  chartTitle,
}: CommentDialogProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Focus the textarea when the dialog opens
  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
    }
  }, [open])

  const handleSave = () => {
    onSave()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add Comment to
            <DialogDescription>{chartTitle}</DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            ref={textareaRef}
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Add your insight about this chart..."
            className="resize-none w-full focus-visible:ring-0"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!comment.trim()}>
            Save Comment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}