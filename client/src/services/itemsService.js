import http from "./httpService";

const apiEndpoint = "/items";

export function getAllItems() {
  return http.get(apiEndpoint);
}
