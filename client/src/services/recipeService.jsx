import http from "./httpService";

const apiEndpoint = "/recipes";

function recipeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecipe(recipeId) {
  return http.get(recipeUrl(recipeId));
}
