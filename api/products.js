import client from "./client";

export const apiGetProductById = (id) =>
  client.get(`/api/store/products/${id}?embed=properties`);

export const apiGetProductReviews = (id) =>
  client.get(`/api/store/products/${id}/reviews`);

export const apiGetSimilarProducts = (id, record = 20) =>
  client.get(
    `/api/store/products/${id}/similar-products${
      record === "all" ? "" : `?RecordPerPage=${record}`
    }`
  );

export const apiGetSpecialOffers = () =>
  client.get("/api/store/special-offers", {
    params: {
      sort: "end-date",
      from: new Date(Date.now()),
      to: new Date(Date.now()),
    },
  });

export const apiGetCategoryProducts = (
  categoryId,
  sort = undefined,
  minPrice = undefined,
  maxPrice = undefined,
  filters = undefined,
  available = false
) =>
  client.get(`/api/store/products`, {
    params: {
      categoryId,
      sort,
      ...(minPrice > 0 ? { minPrice } : {}),
      ...(maxPrice > 0 ? { maxPrice } : {}),
      ...filters,
      ...(available === true ? { available: true } : {}),
    },
  });

export const apiGetMostSalesProducts = (recordPerPage = 15) =>
  client.get("/api/store/products", {
    params: { recordPerPage, sort: "-sales",status : "available" },
  });
export const apiGetMostViewdProducts = (recordPerPage = 15) =>
  client.get("/api/store/products", {
    params: { recordPerPage, sort: "-views", status: "available" },
  });
export const apiGet9CategoryProduct = (categoryId, sort) =>
  client.get(`/api/store/products`, {
    params: {
      categoryId,
      sort,
      recordPerPage: 9,
    },
  });

export const apiGetInfinitProducts = (categoryId, options) =>
  client.get(`/api/store/products`, {
    params: {
      categoryId,
      ...options,
    },
  });
