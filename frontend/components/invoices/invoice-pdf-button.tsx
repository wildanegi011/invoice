"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import InvoiceDocument from "./invoice-document";
import { Invoice } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PDFViewer = dynamic(() => import("@/components/shared/pdf-viewer"), {
  ssr: false,
});

export default function InvoicePDFButton({ invoice }: { invoice: Invoice }) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const generatePDF = async () => {
    if (pdfUrl) return;

    try {
      const blob = await pdf(<InvoiceDocument invoice={invoice} />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={generatePDF}
              className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
            >
              <FileText className="h-4 w-4" />
              <span className="sr-only">View Invoice PDF</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>View Invoice PDF</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="h-[90vh] overflow-y-auto w-full sm:max-w-7xl">
        <DialogHeader>
          <DialogTitle>Invoice Preview</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center bg-zinc-100 dark:bg-zinc-900 p-4 rounded-md min-h-[500px]">
          {pdfUrl ? (
            <PDFViewer file={pdfUrl} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Generating PDF...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
