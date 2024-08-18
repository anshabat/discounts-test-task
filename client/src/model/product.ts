type BulkPricing = {
  amount: number;
  totalPrice: number;
} | null;

export type Product = {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  bulkPricing: BulkPricing;
};
