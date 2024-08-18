import { useState } from "react";
import { BulkPricingType, ProductType } from "../model/product";
import { CartItemType } from "../model/cart";

export function useCart(products: ProductType[]) {
  const initialQuantity = 1;
  const initialCart: CartItemType[] = products.map((product) => {
    const { id, name, price, bulkPricing, imageURL } = product;
    return {
      id,
      name,
      imageURL,
      originalTotalPrice: price * initialQuantity,
      totalPrice: calculateSalePrice(price, bulkPricing, initialQuantity),
      quantity: initialQuantity,
    };
  });

  const [cartItems] = useState<CartItemType[]>(initialCart);

  return { cartItems };
}

export function calculateSalePrice(
  price: number,
  bulkPricing: BulkPricingType,
  quantity: number
) {
  if (!bulkPricing) return price * quantity;

  const { amount, totalPrice: bulkPrice } = bulkPricing;
  const bulkQuantity = Math.floor(quantity / amount);
  const remainingQuantity = quantity % amount;

  return bulkQuantity * bulkPrice + remainingQuantity * price;
}
