import { useState, useMemo } from "react";
import { useProducts } from "../Hooks/useProducts";
import { useProductActions } from "../Hooks/useProductActions";
import SearchBar from "../shop/SearchBar";

export function Shop() {
  const { 
    products, 
    isLoading, 
    error, 
    selectedCategory, 
    setSelectedCategory, 
    categories, 
    handleAddToWishlist, 
    handleProductClick 
  } = useProductActions();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  
  if (isLoading) return <div className="loading-state">Loading store catalog...</div>;
  if (error) return <div className="error-state">Failed to load shop products.</div>;

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "title-az") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>All Products</h1>
        <p>Browse complete catalog of the products.</p>
      </header>

      <div className="shop-controls">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="default">Sort by: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="title-az">Name: A to Z</option>
        </select>
      </div>

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
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <button onClick={(e) => {
                e.stopPropagation(); // Prevents card click conflict!
                handleAddToWishlist(product);
                handleProductClick(product);
              }}>
                Add to Wishlist
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No products found matching your search.</p>
        )}
      </div>
    </div>
  );
}