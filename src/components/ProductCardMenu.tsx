import { useNavigate } from 'react-router-dom';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { Product } from '@/types/product';

interface ProductCardMenuProps {
  product: Product;
  onDelete: (productId: number) => void;
}

export default function ProductCardMenu({ product, onDelete }: ProductCardMenuProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/products/edit/${product.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      onDelete(product.id);
    }
  };

  return (
    <div
      className="product-card-menu"
      onClick={(e) => e.stopPropagation()}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="product-card-menu-trigger"
            aria-label="Product actions"
          >
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={handleEdit}>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={handleDelete}>
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
