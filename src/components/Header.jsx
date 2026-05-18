import { ShoppingBasket03Icon, Tag02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="link">
                    <HugeiconsIcon icon={Tag02Icon} className="hg-icon" />
                    <span className="brand-title">EazyStickerz</span>
                </Link>
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li>
                            <Link to="/products/add" className="nav-link">Add Product</Link>
                        </li>
                        <li>
                            <a href="/about" className="nav-link">About</a>
                        </li>
                        <li>
                            <a href="/login" className="nav-link">Login</a>
                        </li>
                        <li>
                            <a href="/cart" className="nav-link">
                                <HugeiconsIcon icon={ShoppingBasket03Icon} className="hg-icon" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
export default Header;