// frontend/lib/api.ts
import { Invoice, InvoiceItem, ApiResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Re-export types for backward compatibility if needed, using explicit export type to avoid runtime emission issues if isolatedModules is on,
// effectively redirecting standard imports. But user wanted split, so we prefer direct imports in other files.
// Ideally, we should update all consumers. 

// Interfaces moved to ./types.ts


interface FetchOptions extends RequestInit {
  // Add any custom options here if needed in the future
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `API Error: ${response.statusText}`);
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

export async function getInvoices(): Promise<Invoice[]> {
  return fetchAPI<Invoice[]>('/invoice/');
}

export async function createInvoice(data: Omit<Invoice, 'id'>): Promise<Invoice> {
  return fetchAPI<Invoice>('/invoice/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getInvoiceById(id: string): Promise<Invoice> {
  return fetchAPI<Invoice>(`/invoice/${id}/`);
}

export async function updateInvoice(id: string, data: Omit<Invoice, 'id'>): Promise<Invoice> {
  return fetchAPI<Invoice>(`/invoice/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteInvoice(id: string): Promise<void> {
  // Using a specific type for delete response if strictness is needed, 
  // currently void is fine as we don't return data.
  // Note: fetchAPI expects a JSON response. 
  // If your DELETE endpoint doesn't return JSON, this might need adjustment.
  // Assuming it returns standard ApiResponse structure.

  // Custom handling for delete if it returns empty body or different structure
  // but based on previous code it seemed to parse json error on failure.
  // We'll stick to fetchAPI expecting JSON.

  await fetchAPI<null>(`/invoice/${id}/`, {
    method: 'DELETE',
  });
}