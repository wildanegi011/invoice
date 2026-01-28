"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import InvoiceViewer from "@/components/invoice-viewer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PDFViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
});

export default function InvoicePDFButton({ invoice }: any) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const generatePDF = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    const blob = pdf.output("blob");
    setPdfUrl(URL.createObjectURL(blob));
  };

  return (
    <>
      <button onClick={generatePDF}>Generate PDF</button>
      <div style={{ display: "none" }}>
        <InvoiceViewer   ref={invoiceRef} />
      </div>
      {pdfUrl && <PDFViewer file={pdfUrl} />}
    </>
  );
}
