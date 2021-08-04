import { baseURL } from "../api/client";

const categoryImageLinkGenerator = (appImageType, appImage) => {
  if (appImageType === "productCategoryIcon") {
    console.log(baseURL + `/mobile-icon/${appImage.id}/${appImage.name}`);
    return baseURL + `/mobile-icon/${appImage.id}/${appImage.name}`;
  } else if (appImageType === "productCategoryFeatureImage") {
    console.log(
      baseURL +
        `/productcategory-featured-image/${appImage.id}/${appImage.name}`
    );
    return (
      baseURL +
      `/productcategory-featured-image/${appImage.id}/${appImage.name}`
    );
  } else if (appImageType === "productAttachmnet") {
    console.log(baseURL + `/attachments/${appImage.id}/${appImage.name}`);
    return baseURL + `/attachments/${appImage.id}/${appImage.name}`;
  } else {
    console.log("Null image",appImageType,appImage)
    return null;
  }
};

export default categoryImageLinkGenerator;
