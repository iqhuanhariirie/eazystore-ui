import PageHeading from './PageHeading'
import products from '../data/products'
import ProductListings from './ProductListings'
export default function Home() {
    return (
        <div className="home-container">
            <PageHeading title="Explore Eazy Stickerz">
                Discover a wide range of stickers for all your needs. From custom designs to official merchandise, we have you covered.
            </PageHeading>
            <ProductListings products={products} />

        </div>
    );
}