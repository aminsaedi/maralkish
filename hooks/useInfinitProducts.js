import React, { useState, useEffect, useCallback } from "react";
import loadInfinitProducts from "./../utilities/loadInfinitProducts";

const useInfinitProducts = (
  categoryId,
  currentCategory,
  sort,
  userMinPrice,
  userMaxPrice,
  selectedFilters
) => {
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [infinitProducts, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [filtersUpdated, setFiltersUpdated] = useState(false);

  // return this function for Flatlist to call onEndReached
  const fetchMore = useCallback(() => {
    setShouldFetch(true);
    setShouldFetch(true);
  }, []);
  const reloadProducts = useCallback(() => {
    setFiltersUpdated(true);
    setShouldFetch(true);
  }, []);
  useEffect(
    () => {
      // prevent fetching for other state changes
      if (!shouldFetch) {
        return;
      }

      const fetch = async () => {
        // console.log("Re render", sort);
        // setLowLoading(true);
        if (infinitProducts > 1 && infinitProducts.length >= totalItems) return;
        // console.log("Page : ", page);
        let newProducts;
        if (filtersUpdated) {
          console.log("Filters updated!!");
          setPage(1);
          const filterObj = {};
          selectedFilters &&
            selectedFilters.forEach((filter) => {
              const filterId = filter.split("=")[0];
              const filterValue = filter.split("=")[1];
              // console.log("Filter id:",filterId)
              // console.log(filterId in filterObj);
              if (filterId in filterObj) {
                filterObj[filterId].push(filterValue);
              } else if (!(filterId in filterObj)) {
                filterObj[filterId] = [filterValue];
              }
            });
          for (const key in filterObj) {
            if (
              typeof filterObj[key] !== "string" &&
              filterObj[key].length === 1
            ) {
              filterObj[key] = filterObj[key][0];
            }
            // if (Object.hasOwnProperty.call(filterObj, key)) {
            // const element = filterObj[key];
            // console.log(element)
            // }
          }
          console.log(filterObj);
          // console.log(filterObj);
          newProducts = await loadInfinitProducts(
            categoryId,
            1,
            25,
            sort,
            {
              ...(currentCategory
                ? currentCategory.minProductPrice === userMinPrice
                  ? {}
                  : { minPrice: userMinPrice }
                : {}),
              ...(currentCategory
                ? currentCategory.maxProductPrice === userMaxPrice
                  ? {}
                  : { maxPrice: userMaxPrice }
                : {}),
                ...(selectedFilters && selectedFilters.length > 0 ? {...filterObj} : {})
              // ...(selectedFilters.length > 0
              //   ? selectedFilters.length === 1
              //     ? { filters: selectedFilters[0] }
              //     : { filters: selectedFilters }
              //   : {}),
            }
            // options,
            // selectedFilters
          );
          setProducts(newProducts.data);
          // TODO: fire scroll to top
        } else if (!filtersUpdated) {
          console.log("Folters Nottt updated");
          newProducts = await loadInfinitProducts(
            categoryId,
            page,
            25,
            sort,
            {
              ...(currentCategory
                ? currentCategory.minProductPrice === userMinPrice
                ? {}
                : { minPrice: userMinPrice }
                : {}),
                ...(currentCategory
                  ? currentCategory.maxProductPrice === userMaxPrice
                  ? {}
                  : { maxPrice: userMaxPrice }
                  : {}),
                }
                // options,
                // selectedFilters
                );
                setProducts((oldProducts) => [...oldProducts, ...newProducts.data]);
              }
              // setLowLoading(false);
              
              // set the should fetch call to false to prevent fetching
              // on page number update
              setShouldFetch(false);
              
              setFiltersUpdated(false);
              if (page === 1) setTotalItems(newProducts.headers["x-total-records"]);
              
        //increment page for the next call
        setPage(page + 1);
      };

      fetch();
    },
    // prevent fetching for other state changes
    [page, shouldFetch]
  );

  return [infinitProducts, fetchMore, totalItems, reloadProducts];
};

export default useInfinitProducts;
