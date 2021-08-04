import { baseURL } from "../api/client";

const imageLinkGenerator = (
  image,
  format = "jpg",
  width,
  height,
  quality = 80
) => {
  // if(!image || !image.name) return ""
  // let fileName = image.name.split(".");
  if (!image) return;
  let fileName = image.name.replace(
    `.${image.name.split(".")[image.name.split(".").length - 1]}`,
    ""
  );
  if (width && height)
    return (
      baseURL +
      image.address +
      "/" +
      Math.round(width) +
      "x" +
      Math.round(height) +
      "/" +
      quality +
      "/" +
      `${fileName}.${format}`
    );
  else if (width && !height)
    return (
      baseURL +
      image.address +
      "/" +
      Math.round(width) +
      "x" +
      "/" +
      quality +
      "/" +
      `${fileName}.${format}`
    );
  if (!width && height)
    return (
      baseURL +
      image.address +
      "/" +
      "x" +
      Math.round(height) +
      "/" +
      quality +
      "/" +
      `${fileName}.${format}`
    );
  else
    return (
      baseURL + image.address + "/" + quality + "/" + `${fileName}.${format}`
    );
};

export default imageLinkGenerator;
