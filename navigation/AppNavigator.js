import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Scrrens
import pages from "./routes";
import Home from "./../screens/Home";
import Catagories from "./../screens/Catagories";
import Cart from "./../screens/Cart";
import Account from "./../screens/Account";
import CartContext from "../cart/cartContext";

import CatagoriesNavigator from "./CategoriesNavigator";

// Import Icons
import { Ionicons } from "@expo/vector-icons";

import colors from "./../utilities/colors";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { cart, totalItems } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === pages.home) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === pages.catagories) {
            iconName = focused ? "apps" : "apps-outline";
          } else if (route.name === pages.cart) {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === pages.myAccount) {
            iconName = focused ? "person" : "person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarVisible: () => {
          let routeName =
            navigation.state.routes[navigation.state.index].routeName;
          if (routeName === pages.productDetails) {
            return false;
          } else return true;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.navigatorActiveColor,
        inactiveTintColor: colors.navigatorInactiveColor,
        labelStyle: {
          fontFamily: "primary",
          fontSize: 12,
        },
      }}
      initialRouteName={pages.home}
    >
      <Tab.Screen
        options={{ tabBarLabel: "اکانت من" }}
        name={pages.myAccount}
        component={Account}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "سبد خرید",
          tabBarBadge: totalItems > 0 ? totalItems : null,
          tabBarBadgeStyle: {
            fontFamily: "primary",
            backgroundColor: colors.primaryColor,
            color: colors.buttonTextColor,
            paddingTop: 2,
          },
        }}
        name={pages.cart}
        component={Cart}
      />
      <Tab.Screen
        options={{ tabBarLabel: "دسته‌بندی‌ها" }}
        name={pages.catagories}
        component={CatagoriesNavigator}
        // listeners={({ navigation, route }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     navigation.push(pages.app, {
        //       screen: pages.catagories,
        //     });
        //   },
        // })}
      />
      <Tab.Screen
        options={{ tabBarLabel: "خانه" }}
        name={pages.home}
        component={Home}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
