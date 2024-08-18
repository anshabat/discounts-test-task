import { useCallback, useMemo, useState } from "react";
import { BulkPricingType, ProductType } from "../model/product";
import { CartItemType } from "../model/cart";

type ProductQuantities = { productId: number; quantity: number }[];
export type UpdateProductQuantity = (
  productId: number,
  quantity: number
) => void;

export function useCart(products: ProductType[]) {
  const initialQuantities = products.map((product) => ({
    productId: product.id,
    quantity: 1,
  }));

  const [productQuantities, setProductQuantities] =
    useState<ProductQuantities>(initialQuantities);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setProductQuantities((prev) =>
      prev.map((p) => (p.productId === productId ? { ...p, quantity } : p))
    );
  }, []);

  const cartItems: CartItemType[] = useMemo(() => {
    return productQuantities.map((productQuantity) => {
      const productData = products.find(
        (p) => p.id === productQuantity.productId
      );
      const quantity = productQuantity.quantity;
      if (!productData) {
        // TODO: wrap Cart component with ErrorBoundary component
        throw new Error("Product not found");
      }

      return createCartItem(productData, quantity);
    });
  }, [products, productQuantities]);

  return { cartItems, updateQuantity };
}

function createCartItem(product: ProductType, quantity: number): CartItemType {
  const { id, name, price, bulkPricing, imageURL } = product;
  const originalTotalPrice = product.price * quantity;
  const totalPrice = calculateSalePrice(price, bulkPricing, quantity);
  const hasDiscount = originalTotalPrice > totalPrice;

  return {
    id,
    name,
    imageURL,
    originalTotalPrice,
    totalPrice,
    quantity: quantity,
    hasDiscount,
  };
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
