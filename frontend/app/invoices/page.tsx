'use client';

import { DashboardLayout } from "@/components/dashboard-layout"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getInvoices, createInvoice, updateInvoice, deleteInvoice, Invoice } from "@/lib/api"
import { useEffect, useState } from "react"
import { InvoiceForm } from "@/components/invoice-form"
import { toast } from "sonner";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)

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
      toast.success('Invoice updated successfully')
    } catch (err) {
      toast.error('Failed to update invoice')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return
    
    try {
      await deleteInvoice(id)
      await fetchInvoices()
      toast.success('Invoice deleted successfully')
    } catch (err) {
      toast.error('Failed to delete invoice')
    }
  }

  const handleEdit = (invoice: Invoice) => {    
    setCurrentInvoice(invoice)
    setIsFormOpen(true)
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-4">Loading invoices...</div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4 text-red-500">Error: {error}</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <button
            onClick={() => {
              setCurrentInvoice(null)
              setIsFormOpen(true)
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Invoice
          </button>
        </div>
        
        <DataTable 
          columns={columns({ onEdit: handleEdit, onDelete: handleDelete })} 
          data={invoices} 
        />

        <InvoiceForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={currentInvoice || undefined}
          onSubmit={currentInvoice ? handleUpdate : handleCreate}
        />
      </div>
    </DashboardLayout>
  )
}