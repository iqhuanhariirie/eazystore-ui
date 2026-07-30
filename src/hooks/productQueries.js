import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createProduct,
    deleteProduct,
    fetchProduct,
    fetchProducts,
    updateProduct,
} from '../api/products';

export const productKeys = {
    all: ['products'],
    detail: (id) => ['products', id],
};

export function useProducts() {
    return useQuery({
        queryKey: productKeys.all,
        queryFn: fetchProducts,
    });
}

export function useProduct(id) {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => fetchProduct(id),
        enabled: Boolean(id),
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, product }) => updateProduct(id, product),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
            queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
        },
    });
}
