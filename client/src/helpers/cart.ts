import { CartItemType } from "../model/cart";
import { DiscountType } from "../model/discount";
import { BulkPricingType, ProductType } from "../model/product";

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
  const originalTotalPrice = product.price * quantity;
  const totalPrice = calculateSalePrice(price, bulkPricing, quantity);
  const hasDiscount = originalTotalPrice > totalPrice;

  console.log(discount, 'discount')
  console.log(currentDate, 'currentDate')

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
