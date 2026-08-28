import { NavLink } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";


export default function NavBar() {
  const { cart } = useCart();
  const cartItems = Array.isArray(cart) ? cart : (cart?.items || []);
  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h1>ShopFav</h1>
      </div>
      
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
      </div>

      <div className="nav-cart">
        <NavLink to="/cart" className="cart-link">
          Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </NavLink>
      </div>
    </nav>
  );
}