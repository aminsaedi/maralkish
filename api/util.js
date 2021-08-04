import client, { baseURL } from "./client";

export const apiGetLogo = baseURL + "/logo.png";

export const apiGetCategories = (id = null) =>
  client.get(
    `/api/store/product-categories${id ? "/" + id : ""}?embed=properties`
  );

export const apiSeach = (key = "", categoryId = null) =>
  client.get("/api/store/products", {
    params: {
      categoryId,
      key,
    },
  });

export const apiGetStoreSettings = () => client.get("/api/store/settings");

export const apiGetStates = () => client.get("/api/store/states");

export const apiSendContactUsForm = (values) =>
  client.post("/api/store/messages", values);

export const apiGetServerTime = () => client.get("/api/store/time");

export const apiGetAddressWithLocation = (lng, lat) =>
  client.post("/api/store/parsimap/reverse", { lng, lat });

export const apiGetDirectAddress = (lng, lat, searchText) =>
  client.post("/api/store/parsimap/directaddress", { lng, lat, searchText });

export const apiGetBankAccounts = () => client.get("api/store/bankAccounts");

export const apiGetPaymentProviders = () =>
  client.get("/api/store/payment-providers");

export const apiSendDevideInfo = (data) =>
  client.post("/api/store/mobile/firstRun", { ...data });
