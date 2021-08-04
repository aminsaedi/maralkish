import React from "react";
import { View } from "react-native";
import colors from "../utilities/colors";

const HorizentalLine = ({
  color = colors.lightGray,
  height = "90%",
  marginVertical = "5%",
  style,
}) => {
  return (
    <View
      style={[
        {
          width: 1,
          height: height,
          backgroundColor: color,
          marginVertical: marginVertical,
        },
        style,
      ]}
    ></View>
  );
};

export default HorizentalLine;
