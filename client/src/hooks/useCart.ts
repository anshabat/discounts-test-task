import { useCallback, useMemo, useState } from "react";
import { ProductType } from "../model/product";
import { DiscountType } from "../model/discount";
import { createCartItem } from "../helpers/cart";

type ProductQuantities = { productId: number; quantity: number }[];
export type UpdateCartItem = (productId: number, quantity: number) => void;
export type DeleteCartItem = (productId: number) => void;

export function useCart(
  products: ProductType[],
  discounts: DiscountType[],
  dateObj: Date
) {
  const [productQuantities, setProductQuantities] = useState<ProductQuantities>(
    () => getInitialProductQuantities(products)
  );

  /**
   * Update the quantity of a product in the cart
   */
  const updateItem = useCallback((productId: number, quantity: number) => {
    setProductQuantities((prev) =>
      prev.map((p) => (p.productId === productId ? { ...p, quantity } : p))
    );
  }, []);

  const deleteItem = useCallback((productId: number) => {
    setProductQuantities((prev) =>
      prev.filter((p) => p.productId !== productId)
    );
  }, []);

  /**
   * Create derived cart items for rendering
   */
  const cartItems = useMemo(() => {
    return productQuantities.map((productQuantity) => {
      const productData = products.find(
        (p) => p.id === productQuantity.productId
      );
      const quantity = productQuantity.quantity;
      if (!productData) {
        // TODO: wrap Cart component with ErrorBoundary component
        throw new Error("Product not found");
      }

      const discount = discounts.find((d) => d.productId === productData.id);

      return createCartItem({
        product: productData,
        quantity,
        discount,
        currentDate: dateObj,
      });
    });
  }, [products, productQuantities, discounts, dateObj]);

  return { cartItems, updateItem, deleteItem };
}

function getInitialProductQuantities(
  products: ProductType[]
): ProductQuantities {
  return products.map((product) => ({
    productId: product.id,
    quantity: 1,
  }));
}
