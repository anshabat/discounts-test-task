import { useEffect, useState } from "react";
import { ProductType } from "../model/product";
import { fetchProducts } from "../api/products";

export function useProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts().then((products) => {
      setProducts(products);
      setLoading(false);
    });
  }, []);

  return { products, loading };
}
