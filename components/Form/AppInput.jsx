import React from "react";

import { TextInput } from "react-native";
import colors from "../../utilities/colors";

const AppInput = ({
  placeholder,
  direction = "rtl",
  textAlign = "center",
  style,
  onChangeText,
  value,
  label,
  onEndEditing,
  error,
  ...rest
}) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      label={label}
      onEndEditing={onEndEditing}
      placeholder={placeholder}
      style={[
        {
          color: "black",
          backgroundColor: colors.inputBackgroundColor,
          direction: direction === "rtl" ? "rtl" : "ltr",
          fontFamily: "primary",
          fontSize: 13,
          textAlign: textAlign,
          width: "100%",
          // height: 50,
          borderRadius: 10,
          paddingHorizontal: 10,
          minHeight : 50
        },
        style,
      ]}
      placeholderTextColor={colors.inputPlaceholderColor}
      {...rest}
    />
  );
};

export default AppInput;
