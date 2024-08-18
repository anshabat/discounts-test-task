export type DiscountType = {
  productId: number;
  repeat: { period: "weekly" | "yearly"; every: string };
  type: "bulk" | "percentage" | "bogo";
  amount: number | null;
  value: number;
};
