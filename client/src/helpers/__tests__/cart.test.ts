import { describe, expect, it } from "vitest";
import { ProductType } from "../../model/product";
import { createCartItem } from "../cart";
import { DiscountType } from "../../model/discount";

describe("createCartItem", () => {
  describe("No Discounts", () => {
    it("should calculate the total price correctly without any bulk pricing or calendar discounts", () => {
      // Arrange
      const product = {
        id: 2,
        name: "Product",
        price: 8,
        imageURL: "",
        bulkPricing: null,
      } satisfies ProductType;

      // Act
      const cartItem = createCartItem({
        product,
        quantity: 3,
        currentDate: new Date(),
        discount: undefined,
      });

      // Assert
      expect(cartItem.originalTotalPrice).toBe(24);
      expect(cartItem.totalPrice).toBe(24);
      expect(cartItem.hasDiscount).toBe(false);
    });
  });

  describe("Bulk pricing discount", () => {
    it("should calculate the total price correctly with bulk pricing applied", () => {
      const product = {
        id: 1,
        name: "Product",
        price: 2,
        imageURL: "",
        bulkPricing: {
          amount: 4,
          totalPrice: 7,
        },
      } satisfies ProductType;

      const cartItem = createCartItem({
        product,
        quantity: 5,
        currentDate: new Date(),
        discount: undefined,
      });

      // Assert
      expect(cartItem.originalTotalPrice).toBe(10); // 5 * $2
      expect(cartItem.totalPrice).toBe(9); // 4 for $7.00 + 1 for $2
      expect(cartItem.hasDiscount).toBe(true);
    });
  });

  describe("Calendar discount", () => {
    it("should calculate the total price correctly with a bulk discount", () => {
      const product = {
        id: 3,
        name: "Product",
        price: 2,
        imageURL: "",
        bulkPricing: null,
      } satisfies ProductType;

      const discount = {
        productId: 3,
        repeat: {
          period: "weekly",
          every: "5",
        },
        type: "bulk",
        amount: 6,
        value: 10,
      } satisfies DiscountType;

      const cartItem = createCartItem({
        product,
        quantity: 6,
        currentDate: new Date("2024-08-16"), // Friday, 5th day of the month
        discount,
      });

      expect(cartItem.originalTotalPrice).toBe(12); // 6 * $1.25
      expect(cartItem.totalPrice).toBe(10); // 6 items for $8
      expect(cartItem.hasDiscount).toBe(true);
    });

    it("should calculate the total price correctly with a percentage discount", () => {
      const product = {
        id: 6,
        name: "Product",
        price: 5,
        imageURL: "",
        bulkPricing: null,
      } satisfies ProductType;

      const discount = {
        productId: 6,
        repeat: {
          period: "yearly",
          every: "1-10", // October 1st
        },
        type: "percentage",
        amount: null,
        value: 25, // 25% off
      } satisfies DiscountType;

      const cartItem = createCartItem({
        product,
        quantity: 4,
        currentDate: new Date("2024-10-01"), // October 1st
        discount,
      });

      expect(cartItem.originalTotalPrice).toBe(20); // 4 * 5$
      expect(cartItem.totalPrice).toBe(15); // 25% discount: 20$ - 5$ = 15$
      expect(cartItem.hasDiscount).toBe(true);
    });

    it("should calculate the total price correctly with a calendar BOGO discount", () => {
      // Arrange
      const product = {
        id: 4,
        name: "Mini Gingerbread Donut",
        price: 1,
        imageURL: "",
        bulkPricing: null, // No product bulk pricing
      } satisfies ProductType;

      const discount = {
        productId: 4,
        repeat: {
          period: "weekly",
          every: "2",
        },
        type: "bogo",
        amount: null,
        value: 2,
      } satisfies DiscountType;

      // Act
      const cartItem = createCartItem({
        product,
        quantity: 5,
        currentDate: new Date("2024-08-13"), // Tuesday, 2th day of the month
        discount,
      });

      // Assert
      expect(cartItem.originalTotalPrice).toBe(5); // 5 * $1
      expect(cartItem.totalPrice).toBe(3); // Pay for 3, get 2 free
      expect(cartItem.hasDiscount).toBe(true);
    });
  });

  describe("Multiple discounts", () => {
    it("should apply the bulk pricing over discount", () => {
      // Arrange
      const product = {
        id: 7,
        name: "Chocolate Brownie",
        price: 4,
        imageURL: "",
        bulkPricing: {
          amount: 4,
          totalPrice: 12,
        },
      } satisfies ProductType;

      const discount = {
        productId: 7,
        repeat: {
          period: "weekly",
          every: "5", // Friday
        },
        type: "percentage",
        amount: null,
        value: 20, // 20% off
      } satisfies DiscountType;

      // Act
      const cartItem = createCartItem({
        product,
        quantity: 4,
        currentDate: new Date("2024-08-16"), // Friday
        discount,
      });

      // Assert
      expect(cartItem.originalTotalPrice).toBe(16); // 4 * $4
      expect(cartItem.totalPrice).toBe(12); // Bulk pricing is better: 4 for $12 vs. 20% off of $16 ($12.80)
      expect(cartItem.hasDiscount).toBe(true);
    });

    it("should apply the discount over bulk pricing", () => {
      // Arrange
      const product = {
        id: 7,
        name: "Chocolate Brownie",
        price: 4,
        imageURL: "",
        bulkPricing: {
          amount: 4,
          totalPrice: 13,
        },
      } satisfies ProductType;

      const discount = {
        productId: 7,
        repeat: {
          period: "weekly",
          every: "5", // Friday
        },
        type: "percentage",
        amount: null,
        value: 20, // 20% off
      } satisfies DiscountType;

      // Act
      const cartItem = createCartItem({
        product,
        quantity: 4,
        currentDate: new Date("2024-08-16"), // Friday
        discount,
      });

      // Assert
      expect(cartItem.originalTotalPrice).toBe(16); // 4 * $4
      expect(cartItem.totalPrice).toBe(12.8); // Discount is better: 4 for $13 vs. 20% off of $16 ($12.8)
      expect(cartItem.hasDiscount).toBe(true);
    });
  });
});
