import { ShoppingBasket03Icon, Tag02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <a href="/" className="link">
                    <HugeiconsIcon icon={Tag02Icon} className="hg-icon" />
                    <span className="brand-title">EazyStickerz</span>
                </a>
                <nav className="nav">
                <ul>
                    <li>
                        <a href="/" className="nav-link">Home</a>
                    </li>
                    <li>
                        <a href="/about" className="nav-link">About</a>
                    </li>
                    <li>
                        <a href="/contact" className="nav-link">Contact</a>
                    </li>
                    <li>
                        <a href="/login" className="nav-link">Login</a>
                    </li>
                    <li>
                        <a href="/cart" className="nav-link">
                            <HugeiconsIcon icon={ShoppingBasket03Icon} className="hg-icon" /></a>
                    </li>
                </ul>
                </nav>
            </div>


        </header>
    );
}
export default Header;