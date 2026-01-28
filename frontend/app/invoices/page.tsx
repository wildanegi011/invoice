'use client';

import { DashboardLayout } from "@/components/dashboard-layout"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getInvoices, createInvoice, updateInvoice, deleteInvoice, Invoice } from "@/lib/api"
import { useEffect, useState } from "react"
import { InvoiceForm } from "@/components/invoice-form"
import { toast } from "sonner";
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

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const fetchInvoices = async () => {
    try {
      const data = await getInvoices()
      setInvoices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to fetch invoices')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  const handleCreate = async (data: Omit<Invoice, 'id'>) => {
    try {
      await createInvoice(data)
      await fetchInvoices()
      setIsFormOpen(false)
      toast.success('Invoice created successfully')
    } catch (err) {
      toast.error('Failed to create invoice')
    }
  }

  const handleUpdate = async (data: Omit<Invoice, 'id'>) => {
    if (!currentInvoice) return

    try {
      await updateInvoice(currentInvoice.id, data)
      await fetchInvoices()
      setCurrentInvoice(null)
      setIsFormOpen(false) // Close form here
      toast.success('Invoice updated successfully')
    } catch (err) {
      toast.error('Failed to update invoice')
    }
  }

  const openDeleteModal = (id: string) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      await deleteInvoice(deleteId)
      await fetchInvoices()
      toast.success('Invoice deleted successfully')
    } catch (err) {
      toast.error('Failed to delete invoice')
    } finally {
      setIsDeleteOpen(false)
      setDeleteId(null)
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
        <div className="p-4 text-destructive">Error: {error}</div>
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
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  )
}