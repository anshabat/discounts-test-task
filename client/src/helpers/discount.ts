import { DiscountType } from "../model/discount";

export function checkDiscountAvailability(
  date: Date,
  { repeat }: DiscountType
) {
  if (repeat.period === "weekly") {
    const dayOfWeek = Number(repeat.every);
    return date.getDay() === dayOfWeek;
  } else if (repeat.period === "yearly") {
    const [day, month] = repeat.every.split("-").map(Number);
    return date.getDate() === day && date.getMonth() + 1 === month;
  } else {
    throw new Error("Unknown period type");
  }
}

type CalculateDiscountPriceParams = {
  price: number;
  discount: DiscountType | undefined;
  currentDate: Date;
  quantity: number;
};
export function calculateDiscountPrice({
  price,
  quantity,
  discount,
  currentDate,
}: CalculateDiscountPriceParams) {
  const originalPrice = price * quantity;
  if (!discount) return originalPrice;

  const isDiscountAvailable = checkDiscountAvailability(currentDate, discount);
  if (!isDiscountAvailable) return originalPrice;

  switch (discount.type) {
    case "bulk":
      return calculateBulkDiscountPrice(price, quantity, discount);
    case "percentage":
      return calculatePercentageDiscountPrice(price, quantity, discount);
    case "bogo":
      return calculateBogoDiscountPrice(price, quantity, discount);
    default:
      throw new Error("Unknown discount type");
  }
}

function calculateBulkDiscountPrice(
  price: number,
  quantity: number,
  discount: DiscountType
): number {
  const { amount, value } = discount;

  if (!amount) return price * quantity;

  const bulkQuantity = Math.floor(quantity / amount);
  const remainingQuantity = quantity % amount;

  return bulkQuantity * value + remainingQuantity * price;
}

function calculatePercentageDiscountPrice(
  price: number,
  quantity: number,
  discount: DiscountType
): number {
  const discountPercentage = discount.value;
  const totalPrice = price * quantity;
  const discountAmount = totalPrice * (discountPercentage / 100);
  return totalPrice - discountAmount;
}

function calculateBogoDiscountPrice(
  price: number,
  quantity: number,
  discount: DiscountType
): number {
  const multiplier = discount.value;
  const fullPaidSets = Math.floor(quantity / multiplier);
  const remainingItems = quantity % multiplier;
  const totalPaidItems = fullPaidSets + remainingItems;
  return totalPaidItems * price;
}
