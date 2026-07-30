import ProductCard from './ProductCard';
import Tilt from 'react-parallax-tilt';
import { useDeleteProduct, useProducts } from '../hooks/productQueries';

export default function ProductListings({ isAdminView }) {
    const { data: products = [], isLoading, isError, error } = useProducts();
    const deleteProduct = useDeleteProduct();

    const handleDelete = (productId) => {
        deleteProduct.mutate(productId, {
            onError: (err) => alert(err.message),
        });
    };

    if (isLoading) return <p className="product-listings-empty">Loading products...</p>;
    if (isError) return <p className="product-listings-empty">Error: {error.message}</p>;

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
                            <ProductCard
                                product={product}
                                isAdminView={isAdminView}
                                onDelete={handleDelete}
                            />
                        </Tilt>
                    ))
                ) : (
                    <p className="product-listings-empty">No products found</p>
                )}
            </div>
        </div>
    );
}
