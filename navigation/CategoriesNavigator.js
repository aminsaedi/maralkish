import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import pages from "./routes";
import MainCategories from "./../screens/Categories/MainCategories";
import colors from "../utilities/colors";
import SubCategories from "./../screens/Categories/SubCategories";

const Stack = createStackNavigator();

const CategoriesNavigator = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name={pages.mainCategories}
        component={MainCategories}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: colors.inputBackgroundColor,
                  height: "80%",
                  width: "95%",
                  // marginRight: "2.5%",
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingLeft: 6,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(pages.search)}
                >
                  <MaterialCommunityIcons
                    name="magnify"
                    size={25}
                    color={colors.gray}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: "80%", marginRight: 15 }}
                  onPress={() => navigation.navigate(pages.search)}
                >
                  <Text
                    style={{
                      fontFamily: "primary",
                      fontSize: 17,
                      color: colors.inputPlaceholderColor,
                      textAlign: "right",
                    }}
                  >
                    جستجو در فروشگاه
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ),
          headerTitle: false,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name={pages.subCategories}
        component={SubCategories}
        options={({ navigation, route }) => ({
          headerShown: route.params ? route.params.headerShown : undefined,
        })}
      />
    </Stack.Navigator>
  );
};

export default CategoriesNavigator;
