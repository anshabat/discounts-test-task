export type BulkPricingType = {
  amount: number;
  totalPrice: number;
} | null;

export type ProductType = {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  bulkPricing: BulkPricingType;
};
