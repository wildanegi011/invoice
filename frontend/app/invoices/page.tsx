'use client';

import { DashboardLayout } from "@/components/dashboard-layout"
import { columns } from "@/components/invoices/columns"
import { DataTable } from "@/components/ui/data-table"
import { Invoice } from "@/lib/api"
import { useState } from "react"
import { InvoiceForm } from "@/components/invoices/invoice-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  useInvoices,
  useCreateInvoice,
  useUpdateInvoice,
  useDeleteInvoice
} from "@/hooks/use-invoices"

export default function InvoicesPage() {
  // Query Hooks
  const { data: invoices = [], isLoading, error } = useInvoices();
  const createInvoiceMutation = useCreateInvoice();
  const updateInvoiceMutation = useUpdateInvoice();
  const deleteInvoiceMutation = useDeleteInvoice();

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleCreate = async (data: Omit<Invoice, 'id'>) => {
    try {
      await createInvoiceMutation.mutateAsync(data);
      setIsFormOpen(false);
    } catch (err) {
      // Toast handled in hook
    }
  }

  const handleUpdate = async (data: Omit<Invoice, 'id'>) => {
    if (!currentInvoice) return

    try {
      await updateInvoiceMutation.mutateAsync({ id: currentInvoice.id, data });
      setCurrentInvoice(null);
      setIsFormOpen(false);
    } catch (err) {
      // Toast handled in hook
    }
  }

  const openDeleteModal = (id: string) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      await deleteInvoiceMutation.mutateAsync(deleteId);
      setIsDeleteOpen(false);
    } catch (err) {
      // Toast handled in hook
    } finally {
      setDeleteId(null);
    }
  }

  const handleEdit = (invoice: Invoice) => {
    setCurrentInvoice(invoice)
    setIsFormOpen(true)
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4 text-destructive">Error: Failed to load invoices</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
            <p className="text-muted-foreground mt-1">Manage your invoices and payments.</p>
          </div>
          <Button
            onClick={() => {
              setCurrentInvoice(null)
              setIsFormOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Invoice
          </Button>
        </div>

        <div className="border rounded-md">
          <DataTable
            columns={columns({ onEdit: handleEdit, onDelete: openDeleteModal })}
            data={invoices}
          />
        </div>

        <InvoiceForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={currentInvoice || undefined}
          onSubmit={currentInvoice ? handleUpdate : handleCreate}
        />

        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the invoice
                and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteInvoiceMutation.isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleteInvoiceMutation.isPending}>
                {deleteInvoiceMutation.isPending ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  )
}