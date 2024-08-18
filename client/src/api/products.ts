import { ProductType } from "../model/product";
import { apiUrl } from "./helpers";

async function fetchProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch(apiUrl("products"));
    const data = await res.json();

    //TODO: this type assertion is not safe, we can use zod to validate the data
    const products = data?.treats as ProductType[];
    if (!products) throw new Error();

    return products;
  } catch {
    return [];
  }
}

export { fetchProducts };
