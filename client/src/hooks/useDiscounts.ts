import { useEffect, useState } from "react";
import { fetchDiscounts } from "../api";
import { DiscountType } from "../model/discount";

export function useDiscounts() {
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDiscounts().then((data) => {
      setDiscounts(data);
      setLoading(false);
    });
  }, []);

  return { discounts, loading };
}
