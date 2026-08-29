import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNotification } from "./useNotification";
import { useProducts } from "./useProducts";

export function useProductActions() {
  const { addNotification } = useNotification();
  const { products, isLoading, error } = useProducts(); 
  const [recentlyviewed, setRecentlyviewed] = useLocalStorage("recentlyViewed", []); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  
  const categories = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];

  const handleProductClick = (product) => {
    const filtered = recentlyviewed.filter(item => item.id !== product.id);
    const updated = [product, ...filtered].slice(0, 4);
    setRecentlyviewed(updated);
  };

  return {
    products,
    isLoading,
    error,
    recentlyviewed,
    selectedCategory,
    setSelectedCategory,
    categories,
    addNotification,
    handleProductClick,
  };
}