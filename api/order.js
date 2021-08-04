import client from "./client";

export const apiGetOrderDetail = async (trackingId) =>
  client.get(`/api/store/orders/${trackingId}`);
