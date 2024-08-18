import { CartItemType } from "../model/cart";
import { DiscountType } from "../model/discount";
import { ProductType } from "../model/product";
import { calculateDiscountPrice } from "./discount";
import { calculateBulkPrice } from "./product";

type CreateCartItemParams = {
  product: ProductType;
  quantity: number;
  currentDate: Date;
  discount?: DiscountType;
};
export function createCartItem({
  product,
  quantity,
  currentDate,
  discount,
}: CreateCartItemParams): CartItemType {
  const { id, name, price, bulkPricing, imageURL } = product;
  // TODO: I'm using product.price * quantity logic in multiple places. Consider moving it
  const originalTotalPrice = product.price * quantity;
  const bulkPrice = calculateBulkPrice(price, bulkPricing, quantity);
  const discountPrice = calculateDiscountPrice({
    price,
    quantity,
    discount,
    currentDate,
  });
  const totalPrice = Math.min(discountPrice, bulkPrice);
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
