import { useProductActions } from "../Hooks/useProductActions";
import { useNotification } from "../Hooks/useNotification";
import ProductCard from "../Components/product/ProductCard";
import "../Styles/Wishlist.css";

export function WishList() {
  const { wishlist, handleAddToWishlist, handleAddToCart, handleProductClick } = useProductActions();
  const { addNotification } = useNotification();
  const favoriteItems = wishlist || [];

  if (favoriteItems.length === 0) {
    return (
      <div className="empty-wishlist">
        <h2>Your Wishlist is Empty</h2>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <header className="wishlist-header">
        <h1>My Wishlist</h1>
      </header>

      <div className="wishlist-content">
        <div className="product-grid">
          {favoriteItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onWishlist={handleAddToWishlist}
              onAddToCart={handleAddToCart}
              onView={handleProductClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
