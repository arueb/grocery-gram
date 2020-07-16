import http from "./httpService";

const apiEndpoint = "/items";

const categories = [
  { _id: 1, name: "Fruit", hexColor: "#ff7675" },
  { _id: 2, name: "Meat/Poultry", hexColor: "#e17055" },
  { _id: 3, name: "Grains", hexColor: "#ffeaa7" },
  { _id: 4, name: "Baking Products", hexColor: "#6c5ce7" },
  { _id: 5, name: "Confections", hexColor: "#fd79a8" },
  { _id: 6, name: "Dairy", hexColor: "#a29bfe" },
  { _id: 7, name: "Cereal", hexColor: "#fab1a0" },
  { _id: 8, name: "Nuts", hexColor: "#fdcb6e" },
];

// function itemUrl(id) {
//   return `${apiEndpoint}/${id}`;
// }

export function getItems() {
  //   console.log("getting items...");
  return http.get(apiEndpoint);
}

export function getColor(category) {
  const result = categories.filter((c) => c.name === category);
  //   console.log("result.colorClass", result);
  return result[0].hexColor;
}

export default {
  getItems,
  getColor,
};
