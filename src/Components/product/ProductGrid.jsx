import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onView }) {
  if (!products || products.length === 0) {
    return <p className="no-products">No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
        key={product.id} 
        product={product} 
        onView={onView} />
      ))}
    </div>
  );
}