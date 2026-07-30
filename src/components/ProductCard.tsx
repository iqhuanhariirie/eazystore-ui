import Price from './Price';
import { Button } from './ui/button';
import ProductCardMenu from './ProductCardMenu';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  isAdminView: boolean;
  onDelete: (productId: number) => void;
}

export default function ProductCard({ product, isAdminView, onDelete }: ProductCardProps) {
  return (
    <div className="product-card">
      {isAdminView && (
        <ProductCardMenu product={product} onDelete={onDelete} />
      )}
      <div className="product-card-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
        />
      </div>
      <div className="product-card-details">
        <h2 className="product-card-title">{product.name}</h2>
        <p className="product-card-description">{product.description}</p>
        <div className="product-card-footer">
          <span className="product-card-price">
            <Price currency="RM" price={product.price} />
          </span>
          <Button variant="pill">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
