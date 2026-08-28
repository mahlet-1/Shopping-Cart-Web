import { useState } from "react";
import { useProducts } from "../Hooks/useProducts";
import { useProductActions } from "../Hooks/useProductActions";

export function Home() {
  const { 
    products, 
    isLoading, 
    error, 
    recentlyviewed, 
    addNotification, 
    handleAddToWishlist, 
    handleProductClick
  } = useProductActions();

  if (isLoading) return <div className="loading-state">Loading items...</div>;
  if (error) return <div className="error-state">Failed to load products.</div>;

  const latestArrivals = products.slice(-8); 
  const featuredProducts = products.slice(0, 4); 

  return (
    <div className="home-container">
      <section className="hero-banner">
        <h1>Discover what you need.</h1>
        <p>Explore materials you need to elevate your space, style, and routine.</p>
        <button onClick={() => addNotification("Welcome! Explore our latest arrivals.")}>
          Explore Catalog
        </button>
      </section>

      <section className="home-section">
        <h2>Latest Arrivals</h2>
        <div className="product-grid">
          {latestArrivals.map((product) => (
            <div key={`latest-${product.id}`} className="product-card" onClick={() => handleProductClick(product)}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button onClick={(e) => { e.stopPropagation(); handleAddToWishlist(product); }}>
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      </section>
      
      <section className="home-section">
        <h2>Products you might like</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={`featured-${product.id}`} className="product-card" onClick={() => handleProductClick(product)}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button onClick={(e) => { e.stopPropagation(); handleAddToWishlist(product); }}>
                Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      </section>

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