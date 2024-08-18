import { describe, expect, it } from "vitest";
import { calculateSalePrice } from "./cart";

describe("calculateSalePrice", () => {
  it("should return regular price when bulkPricing is null", () => {
    const price = 2.0;
    const quantity = 4;
    const result = calculateSalePrice(price, null, quantity);
    expect(result).toBe(8.0);
  });

  it("should apply bulk pricing correctly for an exact bulk amount", () => {
    const price = 2.0;
    const bulkPricing = { amount: 4, totalPrice: 7.0 };
    const quantity = 4;
    const result = calculateSalePrice(price, bulkPricing, quantity);
    expect(result).toBe(7.0);
  });

  it("should calculate correctly when quantity is less than bulk amount", () => {
    const price = 2.0;
    const bulkPricing = { amount: 4, totalPrice: 7.0 };
    const quantity = 3;
    const result = calculateSalePrice(price, bulkPricing, quantity);
    expect(result).toBe(6.0); // 2 * 3 = 6
  });

  it("should apply bulk pricing correctly for a quantity that is not a multiple of the bulk amount", () => {
    const price = 2.0;
    const bulkPricing = { amount: 4, totalPrice: 7.0 };
    const quantity = 6;
    const result = calculateSalePrice(price, bulkPricing, quantity);
    expect(result).toBe(11.0); // 7 for the first 4 items + 4 for the remaining 2 items
  });

  it("should apply bulk pricing for multiple bulk amounts", () => {
    const price = 2.0;
    const bulkPricing = { amount: 4, totalPrice: 7.0 };
    const quantity = 8;
    const result = calculateSalePrice(price, bulkPricing, quantity);
    expect(result).toBe(14.0); // 7 for the first 4 items + 7 for the second 4 items
  });
});
