import client from "./client";

export const apiCreateCart = () => client.post("/api/store/carts");

export const apiGetCart = (cartId) => client.get(`/api/store/carts/${cartId}`);

export const apiAddItemToCart = (cartId, variantId, quantity) =>
  client.post(`/api/store/carts/${cartId}/items`, { variantId, quantity });

export const apiRemoveOneItemfromCart = (cartId, idInCart) =>
  client.delete(`/api/store/carts/${cartId}/items/${idInCart}`);

export const apiUpdateItemQuantityInCart = (cartId, idInCart, quantity) =>
  client.put(`/api/store/carts/${cartId}/items/${idInCart}`, { quantity });

export const apiGetShippingMethods = (cartId, destinationCityId) =>
  client.get(`/api/store/carts/${cartId}/shipping-methods`, {
    params: { destinationCityId },
  });

export const apiGetInvoice = (cartUniqueId, shippingMethodId, address) =>
  client.post("/api/store/invoices", {
    cartUniqueId,
    shippingMethodId,
    ...address,
  });

export const apiRegisterOrder = (cartUniqueId, shippingMethodId, address,paymentMethod) =>
  client.post("/api/store/orders", {
    cartUniqueId,
    shippingMethodId,
    paymentMethod,
    ...address,
  });
