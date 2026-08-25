import { useState, useEffect } from "react";
export function useProducts(category = "") {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchProducts() {
      setIsLoading(true);
      setError(null);
      const baseUrl = "https://fakestoreapi.com/products";
      const fetchUrl = category 
        ? `${baseUrl}/category/${encodeURIComponent(category)}`
        : baseUrl;

      try {
        const response = await fetch(fetchUrl, { signal });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products. Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "An unexpected error occurred while loading items.");
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [category]);

  return { products, isLoading, error };
}

