"use client"

import { Invoice } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import InvoicePDFButton from "./invoice-pdf-button";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(invoice)}
                className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Invoice</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Invoice</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(invoice.id)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete Invoice</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Invoice</p>
            </TooltipContent>
          </Tooltip>

          <InvoicePDFButton invoice={invoice} />
        </div>
      )
    },
  },
]