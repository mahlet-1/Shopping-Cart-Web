import { useCart } from "../Hooks/useCart";
import { useNotification } from "../Context/NotificationContext";

export function Cart() {
  const { cart, dispatch } = useCart();
  const { addNotification } = useNotification();

  const handleQuantityChange = (id, delta) => {
    const item = cart.find(i => i.id === id);
    const currentQty = item.quantity || 1;
    const newQty = currentQty + delta;

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: newQty }
    });
  };

  const handleRemoveItem = (id, title) => {
    dispatch({ type: "REMOVING", payload: id });
    addNotification(`Removed ${title} from your cart.`);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      dispatch({ type: "CLEAR" });
      addNotification("Cleared all items from your cart.");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal === 0 ? 0 : (subtotal > 50 ? 0 : 5.00);
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
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
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-quantity">
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity || 1}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>

              <button 
                className="remove-item-btn" 
                onClick={() => handleRemoveItem(item.id, item.title)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Tax (15%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            className="checkout-btn" 
            onClick={() => addNotification("You are checked out!")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}