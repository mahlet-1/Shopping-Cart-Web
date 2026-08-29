import { useState } from "react";
import { useProducts } from "../Hooks/useProducts";
import { useProductActions } from "../Hooks/useProductActions";
import ProductGrid from "../Components/product/ProductGrid";
import { Link } from "react-router-dom";
import "../Styles/HeroSection.css";
import "../Styles/Home.css";

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
        <Link 
        to="/shop" 
        className="hero-banner-btn"
        style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          Explore our shop
          </Link>
      </section>

      <section className="home-section">
        <h2>Latest Arrivals</h2>
        <ProductGrid 
          products={latestArrivals} 
          onWishlist={handleAddToWishlist} 
          onView={handleProductClick} 
        />
      </section>
      
      <section className="home-section">
        <h2>Products you might like</h2>
        <ProductGrid 
          products={featuredProducts} 
          onWishlist={handleAddToWishlist} 
          onView={handleProductClick} 
        />
      </section>

      {recentlyviewed.length > 0 && (
        <section className="recently-viewed-section" >
          <h2>Recently Viewed</h2>
          <ProductGrid 
            products={recentlyviewed} 
            onView={handleProductClick} 
            onWishlist={handleAddToWishlist} 
          />
        </section>
      )}
    </div>
  );
}