import http from "./httpService";

const apiEndpoint = "/items";

const categories = [
  { name: "Fruit", hexColor: "#ff7675" },
  { name: "Meat/Poultry", hexColor: "#e17055" },
  { name: "Grains", hexColor: "#ffeaa7" },
  { name: "Baking Products", hexColor: "##6c5ce7" },
  { name: "Confections", hexColor: "#fd79a8" },
  { name: "Dairy", hexColor: "#a29bfe" },
  { name: "Cereal", hexColor: "#fab1a0" },
  { name: "Nuts", hexColor: "#fdcb6e" },
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
