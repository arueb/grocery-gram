import http from "./httpService";

const apiEndpoint = "/items";

function itemUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getItems() {
  //   console.log("getting items...");
  return http.get(apiEndpoint);
}

export function getColor(category) {
  let color;
  switch (category) {
    case "Fruit":
      color = "fruit";
      break;
    case "Meat/Poultry":
      color = "meat";
      break;
    case "Cereal":
      color = "cereal";
      break;
    default:
      color = "I have never heard of that fruit...";
  }
  return color;
}

export default {
  getItems,
  getColor,
};
