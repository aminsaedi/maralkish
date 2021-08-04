import React, { useState, useEffect } from "react";

import { apiGetHomeCategories } from "../api/slideshow";

export default () => {
  const [categories, setCategories] = useState();
  const handleGetCategories = async () => {
    try {
      const result = await apiGetHomeCategories();
      setCategories(result.data);
    } catch (error) {
      return setCategories(undefined);
    }
  };
  useEffect(() => {
    handleGetCategories();
  }, []);
  return categories;
};
