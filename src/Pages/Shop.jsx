import { useState, useMemo } from "react";
import { useProducts } from "../Hooks/useProducts";
import { useProductActions } from "../Hooks/useProductActions";
import SearchBar from "../Components/shop/SearchBar";
import CategoryFilter from "../Components/shop/CategoryFilter";
import ProductGrid from "../Components/product/ProductGrid";
import SkeletonCard from "../Components/product/SkeletonCard";
import "../Styles/ShopPage.css";

const getCategoryCount = (categoryName, allProducts) => {
  return allProducts.filter((p) => p.category === categoryName).length;
};

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

 const filteredAndSortedProducts = useMemo(() => {
    let result = products || [];

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
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  if (isLoading) {
    return (
      <div className="shop-container">
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Failed to load shop products.</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>All Products</h1>
        <p>Browse complete catalog of the products.</p>
      </header>

      <div className="shop-controls">
        <SearchBar
        searchTerm={searchQuery} 
        onSearchChange={setSearchQuery} 
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
          <option value="rating">Rating (High to Low)</option>
        </select>
      </div>

      <CategoryFilter 
      categories={categories.map(category => ({
      name: category,
      count: category === "All" ? products.length : getCategoryCount(category, products)
       }))} 
       selectedCategory={selectedCategory} 
       onSelectCategory={setSelectedCategory} 
       />
       {filteredAndSortedProducts.length > 0 ? (
        <ProductGrid 
        products={filteredAndSortedProducts} 
        onView={handleProductClick}
        onWishlist={handleAddToWishlist}
        />
      ) : (
      <p className="no-results">No products found matching your search.</p>
      )}
    </div>
  );
}