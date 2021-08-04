import client from "./client";

export const apiAddNewReview = (productId, values) =>
  client.post(`/api/store/products/${productId}/reviews`, values);
export const apiGetCustomerReviews = () =>
  client.get("/api/store/profile/reviews");
export const apiGetCustomerNotReviewdProducts = () =>
  client.get("/api/store/profile/orders/not-reviewed");
export const apiDeleteReview = (productId) =>
  client.delete(`api/store/products/${productId}/review`);
