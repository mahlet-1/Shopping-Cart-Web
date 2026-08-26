import { useState } from "react";
import { useNotification } from "../Context/NotificationContext";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { useProducts } from "../Hooks/useProducts";

export function Home() {
  const { addNotification } = useNotification();
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []); 
  const [recentlyviewed, setRecentlyviewed] = useLocalStorage("recentlyViewed", []); 
  const { products, isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const categories = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];

  if (isLoading) return <div className="loading-state">Loading items...</div>;
  if (error) return <div className="error-state">Failed to load products.</div>;

  const filteredProducts = selectedCategory === "All" 
    ? products.slice(0, 8) 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (!exists) {
      setWishlist([...wishlist, product]);
      addNotification(`Added ${product.title} to your wishlist!`);
    } else {
      addNotification(`${product.title} is already in your wishlist!`);
    }
  };

  const handleProductClick = (product) => {
    const filtered = recentlyviewed.filter(item => item.id !== product.id);
    const updated = [product, ...filtered].slice(0, 4);
    setRecentlyviewed(updated);
  };

  return (
    <div className="home-container">
      <section className="hero-banner">
        <h1>Discover what you need.</h1>
        <p>Explore materials you need to elevate your space, style, and routine.</p>
        <button onClick={() => addNotification("Welcome! Explore our latest arrivals.")}>
          Explore Catalog
        </button>
      </section>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => handleProductClick(product)}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={(e) => {
              handleAddToWishlist(product);
              handleProductClick(product);
            }}>
              Add to Wishlist
            </button>
          </div>
        ))}
      </div>

      {recentlyviewed.length > 0 && (
        <section className="recently-viewed-section" >
          <h2>Recently Viewed</h2>
          <div className="product-grid">
            {recentlyviewed.map((product) => (
              <div 
                key={`recent-${product.id}`} 
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <p>${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}