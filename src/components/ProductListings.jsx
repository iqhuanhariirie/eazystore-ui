import ProductCard from './ProductCard'
import Tilt from 'react-parallax-tilt';
import parallax from 'react-parallax-tilt';
export default function ProductListings({products}) {
    return (
        <div className="product-listings-container">
            <div className="product-listings-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Tilt
                        key={product.productId}
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