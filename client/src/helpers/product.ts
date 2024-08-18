import { BulkPricingType } from "../model/product";

export function calculateBulkPrice(
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
