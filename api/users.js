import client from "./client";

export const apiIsUserExists = (username) =>
  client.get(`/api/store/customers/${username}`);

export const apiSendOtp = (values) =>
  client.post("/api/store/customers/otp", values);

export const apiOtpLogin = (values) =>
  client.post("/api/store/customers/otp-login", values);

export const apiPasswordLogin = (values) =>
  client.post("/api/store/customers/login", values);

export const apiRegisterUser = (values) =>
  client.post("/api/store/customers", values);

export const apiGetUserProfile = () => client.get("/api/store/profile");
export const apiGetUserAddresses = () => client.get("/api/store/addresses");
export const apiDeleteUserAddress = (addressId) =>
  client.delete("/api/store/addresses", { params: { id: addressId } });
export const apiAddNewAddress = (values) =>
  client.post("/api/store/addresses", values);
export const apiUpdateAddress = (addressId, values) =>
  client.put(`/api/store/addresses/${addressId}`, values);
export const apiGetFullUserProfile = () =>
  client.get("/api/store/profile", {
    params: {
      embed: "addresses",
    },
  });
export const apiChangeName = (firstName, lastName, mobile, email) =>
  client.put("/api/store/profile", { firstName, lastName, mobile, email });
export const apiChangePassword = (values) =>
  client.patch("/api/store/customers/change-password", values);

export const apiGetMostPurchasedProducts = () =>
  client.get("/api/store/profile/most-purchased");

export const apiGetOrderHistory = () => client.get("/api/store/profile/orders");
