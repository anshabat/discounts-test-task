import { ProductType } from "./product";

export type CartItemType = Omit<ProductType, "bulkPricing" | "price"> & {
  originalTotalPrice: number;
  totalPrice: number;
  quantity: number;
};
