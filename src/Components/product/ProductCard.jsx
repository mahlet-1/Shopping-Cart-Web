import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onView }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onView) onView(product);
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button 
          className="product-btn" 
          onClick={handleClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
}