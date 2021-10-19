import client from "./client";

export const apiGetOneBanner = () =>
  client.get("/api/store/slideshows/AppHomeSlideShow1");

export const apiGetFourBanner = () =>
  client.get("/api/store/slideshows/AppHomeSlideShow2");
