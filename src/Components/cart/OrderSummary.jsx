export default function OrderSummary({ subtotal, shipping, tax, total, onCheckout }) {
  return (
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
        onClick={onCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}