import http from "./httpService";

const apiEndpoint = "/users";

export function getUserData(userId) {
  return http.get(`${apiEndpoint}/${userId}`);
}

// export async function getShoppingList(userId) {
//   console.log("userId", userId);
//   const user = await getUser(userId);
//   console.log("addedItems", user.addedItems);
//   return {
//     addedItems: user.addedItems,
//     removedItems: user.removedItems,
//     itemCounts: user.itemCounts
//   }
// }




// const addedItems = [
//   {
//     _id: "5f05f81f55d12d25dc0dac78",
//     name: "Apples",
//     category: "Fruit",
//     price: 2.84
//   },
//   {
//     _id: "5f05f81f55d12d25dc0dac76",
//     name: "Mangos",
//     category: "Fruit",
//     price: 3.96
//   },
//   {
//     _id: "5f05f81f55d12d25dc0dac77",
//     name: "Chicken Breasts",
//     category: "Meat/Poultry",
//     price: 10.98
//   }
// ]

// const removedItems = [
//   {
//     _id: "5f05f81f55d12d25dc0dac77",
//     name: "Bananas",
//     category: "Fruit",
//     price: 1.58
//   },
//   {
//     _id: "5f05f81f55d12d25dc0dac75",
//     name: "Oranges",
//     category: "Fruit",
//     price: 2.84
//   }
// ]

// export function getAddedItems() {
//   return addedItems.filter(i => i);
// }

// export function getRemovedItems() {
//   return removedItems.filter(i => i);
// }
