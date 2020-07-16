import http from "./httpService";

const apiEndpoint = "/users";

function itemUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUserData(userId) {
  return http.get(`${apiEndpoint}/${userId}`);
}

export function updateShoppingList(userId, addedItems, removedItems) {
  return http.patch(itemUrl(userId), { addedItems, removedItems });
}