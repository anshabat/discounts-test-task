export type DiscountType = {
  productId: number;
  repeat: { period: "weekly"; every: string };
  type: "bulk" | "percentage" | "bogo";
  amount: number | null;
  value: number;
};
