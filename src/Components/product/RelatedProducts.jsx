import { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";

export default function RelatedProducts({ productId, category }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const filtered = data
          .filter((item) => item.category === category && item.id !== Number(productId))
          .slice(0, 4);
          
        setRelated(filtered);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    }

    if (productId && category) {
      fetchRelatedProducts();
    }
  }, [productId, category]);

  if (related.length === 0) return null;

  return (
    <div className="related-products-section">
      <h3>You Might Also Like</h3>
      <ProductGrid products={related} />
    </div>
  );
}