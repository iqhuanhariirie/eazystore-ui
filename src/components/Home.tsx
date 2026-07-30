import { useState } from 'react';
import PageHeading from './PageHeading.tsx';
import ProductListings from './ProductListings.tsx';
import { Button } from './ui/button.tsx';

export default function Home() {
  const [isAdminView, setIsAdminView] = useState(true);

  return (
    <div className="home-container">
      <div className="home-top-bar">
        <Button
          type="button"
          variant="outline"
          className="admin-view-toggle"
          onClick={() => setIsAdminView((prev) => !prev)}
        >
          {isAdminView ? 'View as Customer' : 'View as Admin'}
        </Button>
      </div>
      <PageHeading title="Explore Eazy Stickerz">
        Discover a wide range of stickers for all your needs. From custom designs to official merchandise, we have you covered.
      </PageHeading>
      <ProductListings isAdminView={isAdminView} />
    </div>
  );
}
