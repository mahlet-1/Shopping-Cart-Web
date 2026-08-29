import { useState, useEffect } from "react";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchCategories() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("https://fakestoreapi.com/products/categories", { signal });
        
        if (!response.ok) {
          throw new Error("Failed to load product categories.");
        }

        const data = await response.json();
        setCategories(["All", ...data]);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "An unexpected error occurred while loading categories.");
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, []);

  return { categories, isLoading, error };
}