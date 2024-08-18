import { API_URL } from "../config";

export function apiUrl(endpoint: string) {
  console.log(API_URL, "import.meta.env.VITE_API_URL");
  return API_URL + endpoint;
}
