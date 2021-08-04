import React from "react";
import { View, Text, TouchableOpacity,Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BoxShadow } from "react-native-shadow";

import colors from "../../utilities/colors";
import persianColors from "../../utilities/persianColors";

const VariantsColorItem = ({ value, isSelected = false, onPress }) => {
  const shadowOpt = {
    width: 100,
    height: 38,
    color: "#f21202",
    border: 2,
    radius: 3,
    opacity: 0.2,
    x: 0,
    y: 3,
    style: { marginVertical: 5 },
  };
  return (
    <View
      style={{
        shadowColor: isSelected
          ? colors.seconadryColor
          : colors.secondaryTextColor,
        backgroundColor: "#0000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          position: "relative",
          borderColor: isSelected
            ? colors.seconadryColor
            : colors.secondaryTextColor,
          borderWidth: Platform.OS !== "ios" ? 1 : 0,
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 6,
          margin: 3,
          paddingLeft: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row-reverse",
          backgroundColor: colors.white,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: value.toLowerCase(),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderColor: value === "White" ? colors.gray : "white",
            borderWidth: 0.5,
          }}
        >
          {isSelected && (
            <MaterialCommunityIcons
              name="check"
              size={15}
              color={value !== "White" ? colors.white : colors.black}
            />
          )}
        </View>
        <Text
          style={{
            fontFamily: "primary",
            textAlign: "center",
            fontSize: isSelected ? 15 : 14,
            marginRight: 5,
          }}
        >
          {persianColors.find((color) => color.color === value).name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VariantsColorItem;
