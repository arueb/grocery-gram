import http from "./httpService";

const apiEndpoint = "/recipes";

function recipeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecipe(recipeId) {
  return http.get(recipeUrl(recipeId));
}

export function newRecipe(recipe) {
  return http.post(apiEndpoint, recipe);/* {
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
