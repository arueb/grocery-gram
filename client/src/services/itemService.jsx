import http from "./httpService";

const apiEndpoint = "/items";

// original (dev) color scheme
const categories0 = [
  { _id: 1, name: "Fruit", hexColor: "#ff7675" },
  { _id: 2, name: "Meat/Poultry", hexColor: "#e17055" },
  { _id: 3, name: "Grains/Cereals", hexColor: "#ffeaa7" },
  { _id: 4, name: "Baking Products", hexColor: "#6c5ce7" },
  { _id: 5, name: "Dairy", hexColor: "#a29bfe" },
  { _id: 6, name: "Nuts", hexColor: "#fdcb6e" },
  { _id: 7, name: "Vegetables", hexColor: "#009933" },
  { _id: 8, name: "Seafood", hexColor: "#dbcccc" },
  { _id: 9, name: "Condiments", hexColor: "#451b04" },
  { _id: 10, name: "Herbs/Spices", hexColor: "#81b14f" },
  { _id: 11, name: "Breads", hexColor: "#8faab3" },
  { _id: 12, name: "Alcohol", hexColor: "#d19c4c" },
  { _id: 13, name: "Oils/Fats", hexColor: "#5d3b1a" },
  { _id: 14, name: "Sauces/Soups/Gravies", hexColor: "#25963e" },
  { _id: 15, name: "Grilling Products", hexColor: "#d57500" },
  { _id: 16, name: "Pasta", hexColor: "#bf6b59" },
  { _id: 17, name: "Other", hexColor: "#fd79a8" },
];

// pantone color scheme
const categories1 = [
  { _id: 1, name: "Fruit", hexColor: "#B0C964" },
  { _id: 2, name: "Meat/Poultry", hexColor: "#EEC843" },
  { _id: 3, name: "Grains/Cereals", hexColor: "#87D9C3" },
  { _id: 4, name: "Baking Products", hexColor: "#204478" },
  { _id: 5, name: "Dairy", hexColor: "#BE9867" },
  { _id: 6, name: "Nuts", hexColor: "#A66E4B" },
  { _id: 7, name: "Vegetables", hexColor: "#477050" },
  { _id: 8, name: "Seafood", hexColor: "#A2B8C3" },
  { _id: 9, name: "Condiments", hexColor: "#45BACB" },
  { _id: 10, name: "Herbs/Spices", hexColor: "#FB7A36" },
  { _id: 11, name: "Breads", hexColor: "#D04035" },
  { _id: 12, name: "Alcohol", hexColor: "#017F7C" },
  { _id: 13, name: "Oils/Fats", hexColor: "#E27A53" },
  { _id: 14, name: "Sauces/Soups/Gravies", hexColor: "#C71859" },
  { _id: 15, name: "Grilling Products", hexColor: "#CF212B" },
  { _id: 16, name: "Pasta", hexColor: "#BA6C58" },
  { _id: 17, name: "Other", hexColor: "#7D5379" },
];






export function getItems() {
  return http.get(apiEndpoint);
}

// switch categoryies to get different color set
export function getColor(category) {
  const result = categories1.filter((c) => c.name === category);
  return result[0].hexColor;
}

export default {
  getItems,
  getColor,
};
