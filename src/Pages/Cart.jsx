import { useCart } from "../Hooks/useCart";
import { useNotification } from "../Hooks/useNotification";
import CartItem from "../Components/cart/CartItem";
import OrderSummary from "../Components/cart/OrderSummary";

export function Cart() {
  const { cart, dispatch } = useCart();
  const { addNotification } = useNotification();
  const cartItems = Array.isArray(cart) ? cart : (cart?.items || []);

  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    const currentQty = item?.quantity || 1;
    const newQty = currentQty + delta;

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: newQty }
    });
  };

  const handleRemoveItem = (id, title) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    addNotification(`Removed ${title} from your cart.`);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      dispatch({ type: "CLEAR_CART" });
      addNotification("Cleared all items from your cart.");
    }
  };

   
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal === 0 ? 0 : (subtotal > 50 ? 0 : 5.00);
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Shopping Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>Shopping Cart</h1>
        <button className="clear-cart-btn" onClick={handleClearCart}>
          Clear Cart
        </button>
      </header>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              onQuantityChange={handleQuantityChange} 
              onRemove={handleRemoveItem} 
            />
          ))}
        </div>
        <OrderSummary 
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
        onCheckout={() => addNotification("You are checking out!")}
        />
      </div>
    </div>
  );
}