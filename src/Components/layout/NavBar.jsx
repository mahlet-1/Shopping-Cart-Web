import { NavLink } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";
import { useProductActions } from "../../Hooks/useProductActions";
import '../../Styles/Layout.css';


export default function NavBar() {
  const { cart } = useCart();
  const { wishlist } = useProductActions();

  const cartItems = Array.isArray(cart) ? cart : (cart?.items || []);
  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const totalWishlistItems = wishlist ? wishlist.length : 0;

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h1>ShopFav</h1>
      </div>
      
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
      </div>

      <div className="nav-actions">
        <NavLink to="/wishlist" className="wishlist-link">
          Wishlist {totalWishlistItems > 0 && <span className="cart-badge">{totalWishlistItems}</span>}
        </NavLink>

        <NavLink to="/cart" className="cart-link">
          Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </NavLink>
      </div>
    </nav>
  );
}

 