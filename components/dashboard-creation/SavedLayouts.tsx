"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Trash2, Edit } from "lucide-react"
import type { DashboardLayout } from "@/types/dashboard"

/**
 * Interface for the SavedLayouts component props
 * @interface SavedLayoutsProps
 * @property {DashboardLayout[]} layouts - Array of saved dashboard layouts
 * @property {function} onLoadLayout - Callback function to load a selected layout
 * @property {function} onDeleteLayout - Callback function to delete a layout by ID
 */
interface SavedLayoutsProps {
  layouts: DashboardLayout[]
  onLoadLayout: (layout: DashboardLayout) => void
  onDeleteLayout: (id: string) => void
}

/**
 * SavedLayouts component displays a table of saved dashboard layouts with options to load or delete them
 * @param {SavedLayoutsProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export default function SavedLayouts({ layouts, onLoadLayout, onDeleteLayout }: SavedLayoutsProps) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  /**
   * Handles the confirmation of layout deletion
   */
  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      onDeleteLayout(deleteConfirmId)
      setDeleteConfirmId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold pl-2">Saved Layouts</h2>
        <p className="text-xs text-muted-foreground pr-2">
          {layouts.length} {layouts.length === 1 ? "layout" : "layouts"} saved
        </p>
      </div>

      {layouts.length === 0 ? (
        <div className="text-center py-8 bg-muted/10 rounded-lg border border-dashed">
          <h3 className="text-lg font-medium">No saved layouts</h3>
          <p className="text-xs text-muted-foreground w-auto">
            Create and save your first dashboard layout to see it here.
          </p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Charts</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {layouts.map((layout) => (
                <TableRow key={layout.id}>
                  <TableCell className="text-left">{layout.name}</TableCell>
                  <TableCell className="text-left">{new Date(layout.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-left">{new Date(layout.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-center">{layout.items.length}</TableCell>
                  <TableCell className="">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onLoadLayout(layout)}>
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteConfirmId(layout.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this layout? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

