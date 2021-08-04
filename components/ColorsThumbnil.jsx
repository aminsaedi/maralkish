import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

import { View, Text } from "react-native";

import appColors from "../utilities/colors";

const ColorsThumbnil = ({ colors }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {colors.length > 3 && (
        <View
          style={{
            width: 8,
            height: 8,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius :  5
          }}
        >
          <MaterialCommunityIcons name="plus" size={11} color="black" />
        </View>
      )}
      {colors.slice(0, 3).map((color) => (
        <View
          key={color.toString()}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: color.toLowerCase(),
            marginRight: 5,
            marginLeft : 3,
            borderColor : appColors.secondaryTextColor,
            borderWidth : 0.5
          }}
        ></View>
      ))}
    </View>
  );
};

export default ColorsThumbnil;
