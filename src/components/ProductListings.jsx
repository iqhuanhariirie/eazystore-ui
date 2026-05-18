import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Tilt from 'react-parallax-tilt';

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductListings() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch products');
                return res.json();
            })
            .then((data) => setProducts(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="product-listings-empty">Loading products...</p>;
    if (error) return <p className="product-listings-empty">Error: {error}</p>;

    return (
        <div className="product-listings-container">
            <div className="product-listings-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Tilt
                            key={product.id}
                            tiltMaxAngleX={7}
                            tiltMaxAngleY={7}
                            transitionSpeed={500}>
                            <ProductCard product={product} />
                        </Tilt>
                    ))
                ) : (
                    <p className="product-listings-empty">No products found</p>
                )}
            </div>
        </div>
    );
}