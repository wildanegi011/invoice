"use client"

import InvoiceViewer from "@/components/invoice-viewer";
import PDFViewer from "@/components/pdf-viewer";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/lib/api"
import { ColumnDef } from "@tanstack/react-table"
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import InvoicePDFButton from "@/components/invoice-pdf-button";

    interface ColumnsProps {
        onEdit: (invoice: Invoice) => void;
        onDelete: (id: string) => void;
    }


export const columns = ({ onEdit, onDelete }: ColumnsProps): ColumnDef<Invoice>[] => [
  {
    accessorKey: "invoice_number",
    header: "Invoice Number",
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("subtotal"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "tax",
    header: "Tax %",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original

      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(invoice)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(invoice.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
          <InvoicePDFButton invoice={invoice} />
        </div>
      )
    },
  },
]