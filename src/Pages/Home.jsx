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
    handleProductClick
  } = useProductActions();

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
        >
          Explore our shop
          </Link>
      </section>

      {isLoading ? (
        <div className="loading-state">Loading items...</div>
      ) : error ? (
        <div className="error-state">Failed to load products.</div>
      ) : (
        <>

      <section className="home-section">
        <h2>Latest Arrivals</h2>
        <ProductGrid 
          products={latestArrivals} 
          onView={handleProductClick} 
        />
      </section>
      
      <section className="home-section">
        <h2>Products you might like</h2>
        <ProductGrid 
          products={featuredProducts} 
          onView={handleProductClick} 
        />
      </section>

      {recentlyviewed.length > 0 && (
        <section className="recently-viewed-section" >
          <h2>Recently Viewed</h2>
          <ProductGrid 
            products={recentlyviewed} 
            onView={handleProductClick} 
          />
        </section>
      )}
    </>
      )}
    </div>
  );
}