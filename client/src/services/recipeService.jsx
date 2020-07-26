import http from "./httpService";

const apiEndpoint = "/recipes";

function recipeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecipe(recipeId) {
  return http.get(recipeUrl(recipeId));
}
export function updateRecipe(recipeId, recipe) {
  return http.patch(recipeUrl(recipeId), recipe);
}

export function getRecipes() {
  return http.get(apiEndpoint);
}

export function getPublishedRecipes() {
  return http.get(apiEndpoint)
}

export function deleteRecipe(recipeId) {
  return http.delete(recipeUrl(recipeId));
}

export function newRecipe(recipe) {
  return http.post(
    apiEndpoint,
    recipe
  ); /* {
    title: recipe.title,
    author: recipe.author,
    avgRating: recipe.avgRating,
    numReviews: recipe.numReviews,
    category: recipe.category,
    images: recipe.images,
    isPublished: recipe.isPublished,
    instructions: recipe.instructions,
    ingredients: recipe.ingredients,
  });
  */
}
