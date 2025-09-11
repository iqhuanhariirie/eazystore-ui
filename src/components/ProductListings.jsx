import ProductCard from './ProductCard'
import Tilt from 'react-parallax-tilt';
export default function ProductListings({products}) {
    return (
        <div className="product-listings-container">
            <div className="product-listings-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Tilt
                        tiltMaxAngleX={15}
                        tiltMaxAngleY={15}
                        transitionSpeed={1000}
                        >
                            <ProductCard key={product.productId} product={product} />
                        </Tilt>
                    ))
                ) : (
                    <p className="product-listings-empty">No products found</p>
                )}
            </div>
        </div>
    );
}