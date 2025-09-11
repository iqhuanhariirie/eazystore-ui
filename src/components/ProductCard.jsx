import Price from './Price';
export default function ProductCard({ product }) {
    return (
        <div className="product-card">
            <div className="product-card-image-container">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-card-image" />
            </div>
            <div className="product-card-details">
                <h2 className="product-card-title">{product.name}</h2>
                <p className="product-card-description">{product.description}</p>
                <div className="product-card-footer">
                    <span className="product-card-price"><Price currency="RM" price={product.price} /></span>
                    <button className="product-card-button">Add to Cart</button>
                </div>

            </div>
        </div>
    );
}