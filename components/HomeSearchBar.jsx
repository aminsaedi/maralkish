import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utilities/colors";
import pages from "./../navigation/routes";
import { getStatusBarHeight } from "react-native-status-bar-height";
import StoreSettingContext from "./../utilities/storeSettingContext";

const HomeSearchBar = () => {
  const navigation = useNavigation();
  const storeSetting = useContext(StoreSettingContext);

  // useEffect(() => {
  //   console.log(storeSetting);
  // }, [storeSetting]);

  // console.log(storeSetting);

  return (
    <View
      style={{
        height: "9%",
        width: "100%",
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 1,
        marginTop: getStatusBarHeight(),
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        // elevation: 4,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          marginVertical: 7,
          marginHorizontal: 10,
          backgroundColor: colors.inputBackgroundColor,
          borderRadius: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 10,
        }}
        onPress={() => navigation.navigate(pages.search)}
      >
        <Text
          style={{
            fontFamily: "primary",
            fontSize: 18,
            color: colors.inputPlaceholderColor,
            marginRight: 5,
          }}
        >
          جستجو در {storeSetting?.faName || "فروشگاه"}
        </Text>
        <MaterialCommunityIcons
          name="magnify"
          size={25}
          color={colors.inputPlaceholderColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeSearchBar;
