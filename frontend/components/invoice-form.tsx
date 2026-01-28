'use client';

import { useState, useEffect } from 'react';
import { Invoice, InvoiceItem } from '@/lib/api';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface InvoiceFormProps {
  initialData?: Partial<Invoice>;
  onSubmit: (data: Omit<Invoice, 'id'>) => Promise<void>; // Async
  onClose: () => void;
  isOpen: boolean;
}

export function InvoiceForm({ initialData, onSubmit, onClose, isOpen }: InvoiceFormProps) {
  const [formData, setFormData] = useState<Omit<Invoice, 'id'>>({
    invoice_number: '',
    tax_rate: 0.11,
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
  });

  const [currentItem, setCurrentItem] = useState<Omit<InvoiceItem, 'id'>>({
    name: '',
    qty: 1,
    rate: 0,
  });

  const [loading, setLoading] = useState(false);

useEffect(() => {
    if (initialData) {
        setFormData({
            invoice_number: initialData.invoice_number || '',
            tax_rate: initialData.tax_rate ?? 0.11,
            items: initialData.items || [],
            subtotal: initialData.subtotal || 0,
            tax: initialData.tax || 0,
            total: initialData.total || 0,
        });
    } else if (isOpen) {
        setFormData({
            invoice_number: '',
            tax_rate: 0.11,
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0,
        });
        setCurrentItem({ name: '', qty: 1, rate: 0 });
    }
    }, [initialData, isOpen]);


  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentItem.name || currentItem.rate <= 0) return;

    const newItems = [...formData.items, currentItem];
    const subtotal = newItems.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const tax = subtotal * formData.tax_rate;

    setFormData({
      ...formData,
      items: newItems,
      subtotal,
      tax,
      total: subtotal + tax,
    });

    setCurrentItem({ name: '', qty: 1, rate: 0 });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    const subtotal = newItems.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const tax = subtotal * formData.tax_rate;

    setFormData({
      ...formData,
      items: newItems,
      subtotal,
      tax,
      total: subtotal + tax,
    });
  };

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tax_rate = parseFloat(e.target.value) || 0;
    const tax = formData.subtotal * tax_rate;

    setFormData({
      ...formData,
      tax_rate,
      tax,
      total: formData.subtotal + tax,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.items.length === 0) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{initialData?.invoice_number ? 'Edit Invoice' : 'Add New Invoice'}</CardTitle>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            ✕
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Invoice Number & Tax Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoice_number">Invoice Number</Label>
                <Input
                  id="invoice_number"
                  value={formData.invoice_number}
                  onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="tax_rate">Tax Rate</Label>
                <div className="relative">
                  <Input
                    id="tax_rate"
                    type="number"
                    step={0.01}
                    min={0}
                    max={1}
                    value={formData.tax_rate}
                    onChange={handleTaxRateChange}
                    required
                    disabled={loading}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
            </div>

            {/* Items */}
            <CardTitle className="text-lg mb-2">Items</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
              <div>
                <Label htmlFor="item_name">Item Name</Label>
                <Input
                  id="item_name"
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="qty">Quantity</Label>
                <Input
                  id="qty"
                  type="number"
                  min={1}
                  value={currentItem.qty}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, qty: parseInt(e.target.value) || 1 })
                  }
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="rate">Rate</Label>
                <Input
                  id="rate"
                  type="number"
                  step={0.01}
                  min={0}
                  value={currentItem.rate}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, rate: parseFloat(e.target.value) || 0 })
                  }
                  disabled={loading}
                />
              </div>
              <Button type="button" onClick={handleAddItem} className="h-10 mt-5" disabled={loading}>
                Add Item
              </Button>
            </div>

            {/* Items Table */}
            {formData.items.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.qty}</TableCell>
                      <TableCell className="text-right">${item.rate.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${(item.qty * item.rate).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveItem(index)}
                          disabled={loading}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Totals */}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">
                      Subtotal:
                    </TableCell>
                    <TableCell className="text-right">${formData.subtotal.toFixed(2)}</TableCell>
                    <TableCell />
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">
                      Tax ({(formData.tax_rate * 100).toFixed(0)}%):
                    </TableCell>
                    <TableCell className="text-right">${formData.tax.toFixed(2)}</TableCell>
                    <TableCell />
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-semibold">
                      Total:
                    </TableCell>
                    <TableCell className="text-right font-semibold">${formData.total.toFixed(2)}</TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={formData.items.length === 0 || loading}>
                {loading && (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                )}
                {initialData ? 'Update' : 'Create'} Invoice
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
