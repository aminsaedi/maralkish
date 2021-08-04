import React from "react";

import { Text, View, TouchableOpacity,Platform } from "react-native";
import colors from "../../utilities/colors";

const VariantsItemText = ({ value, isSelected = false, onPress }) => {
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
          paddingVertical: Platform.OS === "ios" ? 6 : 3,
          margin: 3,
          // paddingLeft: 4,
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
        <Text
          style={{
            fontFamily: "primary",
            textAlign: "center",
            fontSize: isSelected ? 17 : 14,
          }}
        >
          {value}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VariantsItemText;
