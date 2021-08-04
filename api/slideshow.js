import client from "./client";


export const apiGetSlideShows = () => client.get("/api/store/slideshows/mobileSlideShow");

export const apiGetHomeCategories = () => client.get("/api/store/app-settings");