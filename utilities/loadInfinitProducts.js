import { apiGetInfinitProducts } from "../api/products";

const loadInfinitProducts = async (categoryId, page, limit = 20,sort,options) => {
  try {
    const productResult = await apiGetInfinitProducts(categoryId, {
      pageNumber: page,
      recordPerPage: limit,
      sort : ["-available", sort.value],
      ...options
    });
    // console.log(productResult.config.params);
    return productResult;
  } catch (error) {
    return [];
  }
};

export default loadInfinitProducts;
