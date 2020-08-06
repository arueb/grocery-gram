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
  { _id: 9, name: "Vegetables", hexColor: "#009933" },
  { _id: 10, name: "Seafood", hexColor: "#dbcccc" },
  { _id: 11, name: "Condiments", hexColor: "#451b04" },
  { _id: 12, name: "Herbs/Spices", hexColor: "#81b14f" },
  { _id: 13, name: "Breads", hexColor: "#8faab3" },
  { _id: 14, name: "Alcohol", hexColor: "#d19c4c" },
  { _id: 15, name: "Sweetener", hexColor: "#9a6642" },
  { _id: 16, name: "Oils/Fats", hexColor: "#5d3b1a" },
  { _id: 17, name: "Sauces/Soups/Gravies", hexColor: "#25963e" },
  { _id: 18, name: "Grilling Products", hexColor: "#d57500" },
  { _id: 19, name: "Pasta", hexColor: "#bf6b59" },
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
