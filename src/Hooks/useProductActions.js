import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNotification } from "../Context/NotificationContext";
import { useProducts } from "./useProducts";

export function useProductActions() {
  const { addNotification } = useNotification();
  const { products, isLoading, error } = useProducts(); 
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []); 
  const [recentlyviewed, setRecentlyviewed] = useLocalStorage("recentlyViewed", []); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  
  const categories = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];

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

  return {
    products,
    isLoading,
    error,
    wishlist,
    recentlyviewed,
    selectedCategory,
    setSelectedCategory,
    categories,
    addNotification,
    handleAddToWishlist,
    handleProductClick,
  };
}