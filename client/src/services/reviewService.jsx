import http from "./httpService";

const apiEndpoint = "/reviews";

function reviewsUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function deleteReview(recipeId) {
    return http.delete(reviewsUrl(recipeId));
}

export function newReview(review) {
    return http.post(
        apiEndpoint,
        review
    );
}