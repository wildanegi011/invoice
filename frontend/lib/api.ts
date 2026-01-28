// frontend/lib/api.ts
const API_BASE_URL = 'http://localhost:8000/api';

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

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

const handleResponse = async <T,>(response: Response): Promise<T> => {
  const result: ApiResponse<T> = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Something went wrong');
  }
  return result.data;
};

export async function getInvoices(): Promise<Invoice[]> {
  const response = await fetch(`${API_BASE_URL}/invoice/`);
  return handleResponse<Invoice[]>(response);
}

export async function createInvoice(data: Omit<Invoice, 'id'>): Promise<Invoice> {
  const response = await fetch(`${API_BASE_URL}/invoice/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Invoice>(response);
}

export async function getInvoiceById(id: string): Promise<Invoice> {
    const response = await fetch(`${API_BASE_URL}/invoice/${id}/`);
    return handleResponse<Invoice>(response);
}

export async function updateInvoice(id: string, data: Omit<Invoice, 'id'>): Promise<Invoice> {
  const response = await fetch(`${API_BASE_URL}/invoice/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Invoice>(response);
}

export async function deleteInvoice(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/invoice/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete invoice');
  }
}