import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createInvoice, deleteInvoice, getInvoices, updateInvoice } from '@/lib/api';
import { Invoice } from '@/lib/types';
import { toast } from 'sonner';

export const useInvoices = () => {
    return useQuery({
        queryKey: ['invoices'],
        queryFn: getInvoices,
    });
};

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createInvoice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
            toast.success('Invoice created successfully');
        },
        onError: () => {
            toast.error('Failed to create invoice');
        },
    });
};

export const useUpdateInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Omit<Invoice, 'id'> }) =>
            updateInvoice(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
            toast.success('Invoice updated successfully');
        },
        onError: () => {
            toast.error('Failed to update invoice');
        },
    });
};

export const useDeleteInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteInvoice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
            toast.success('Invoice deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete invoice');
        },
    });
};
