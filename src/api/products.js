const API_URL = import.meta.env.VITE_API_URL;

async function handleJsonResponse(res, fallbackMessage) {
    if (!res.ok) throw new Error(fallbackMessage);
    return res.json();
}

export async function fetchProducts() {
    const res = await fetch(`${API_URL}/api/products`);
    return handleJsonResponse(res, 'Failed to fetch products');
}

export async function fetchProduct(id) {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    return handleJsonResponse(res, 'Failed to load product');
}

export async function createProduct(product) {
    const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    return handleJsonResponse(res, 'Failed to save product');
}

export async function updateProduct(id, product) {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    return handleJsonResponse(res, 'Failed to update product');
}

export async function deleteProduct(id) {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
}
