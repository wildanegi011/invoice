export interface InvoiceItem {
    name: string;
    qty: number;
    rate: number;
}

export interface Invoice {
    id: string;
    invoice_number: string;
    tax_rate: number;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
}

export interface CreateInvoiceDto {
    invoice_number: string;
    tax_rate: number;
    items: Omit<InvoiceItem, 'id'>[];
}
