import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import pages
import Product from "./../screens/Product";
import pages from "./routes";

const Stack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen  name={pages.product} component={Product} />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
