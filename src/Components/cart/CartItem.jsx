export default function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-quantity">
        <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
        <span>{item.quantity || 1}</span>
        <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
      </div>

      <button 
        className="remove-item-btn" 
        onClick={() => onRemove(item.id, item.title)}
      >
        Remove
      </button>
    </div>
  );
}