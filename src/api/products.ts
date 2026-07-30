import type { Product, ProductPayload } from '@/types/product';

const API_URL = import.meta.env.VITE_API_URL;

async function handleJsonResponse<T>(res: Response, fallbackMessage: string): Promise<T> {
  if (!res.ok) throw new Error(fallbackMessage);
  return res.json() as Promise<T>;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`);
  return handleJsonResponse<Product[]>(res, 'Failed to fetch products');
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  return handleJsonResponse<Product>(res, 'Failed to load product');
}

export async function createProduct(product: ProductPayload): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return handleJsonResponse<Product>(res, 'Failed to save product');
}

export async function updateProduct(id: string, product: ProductPayload): Promise<Product> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return handleJsonResponse<Product>(res, 'Failed to update product');
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete product');
}
