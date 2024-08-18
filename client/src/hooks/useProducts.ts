import { useEffect, useState } from "react";
import { ProductType } from "../model/product";
import { fetchProducts } from "../api";

export function useProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, loading };
}
