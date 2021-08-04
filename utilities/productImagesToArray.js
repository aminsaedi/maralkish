import { baseURL } from "../api/client";


const productImagesToArray = (productImages, width, height) => {
  const result = [];

  productImages.forEach((image) => {
    if (width && height)
      result.push(`${baseURL}${image.address}/${Math.ceil(width)}x${Math.ceil(height)}/${
        image.name
      }`);
    else if (!width && !height)
      result.push(`${baseURL}${image.address}/${image.name}`);
    else if (!height)
      result.push(
        `${baseURL}${image.address}/${Math.ceil(width)}x/70/${image.name}`
      );
    else if (!width)
      result.push(
        `${baseURL}${image.address}/x${Math.ceil(height)}/${image.name}`
      );
  });
  return result;
};

export default productImagesToArray;
