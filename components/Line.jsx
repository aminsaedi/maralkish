import React from "react";
import { View } from "react-native";
import colors from "../utilities/colors";

const Line = ({
  color = colors.lightGray,
  width = "90%",
  marginHorizontal = "5%",
  style,
}) => {
  return (
    <View
      style={[
        {
          height: 1,
          width: width,
          backgroundColor: color,
          marginHorizontal: marginHorizontal,
        },
        style,
      ]}
    ></View>
  );
};

export default Line;
