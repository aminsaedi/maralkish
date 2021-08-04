import React from "react";

import { TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utilities/colors";

const DropDownPlaceHolder = ({
  onPress,
  placeholder,
  value,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {
          width: "100%",
          height: 50,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: colors.inputBackgroundColor,
          paddingHorizontal: 10,
          borderRadius: 10,
        },
        style,
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={disabled ? "block-helper" : "chevron-down"}
        size={20}
        color={colors.black}
      />
      <Text
        style={{
          fontFamily: "primary",
          color: value ? colors.black : colors.inputPlaceholderColor,
        }}
      >
        {value || placeholder || " "}
      </Text>
    </TouchableOpacity>
  );
};

export default DropDownPlaceHolder;
