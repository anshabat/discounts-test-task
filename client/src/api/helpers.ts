import { API_URL } from "../config";

export function apiUrl(endpoint: string) {
  return API_URL + endpoint;
}
