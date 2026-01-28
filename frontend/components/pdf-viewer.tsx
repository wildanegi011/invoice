"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>();

  return (
    <Document
      file={file}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {Array.from(new Array(numPages), (_, i) => (
        <Page key={i} pageNumber={i + 1} width={600} />
      ))}
    </Document>
  );
}
