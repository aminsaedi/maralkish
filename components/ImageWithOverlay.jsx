import React from "react";

import { Image, View } from "react-native";
import colors from "../utilities/colors";

const ImageWithOverlay = ({ source, style, ...rest }) => {
  return (
    <View style={style}>
      <Image
        source={source}
        {...rest}
        style={{ width: "100%", height: "100%" }}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: colors.productOverlay,
        }}
      ></View>
    </View>
  );
};

export default ImageWithOverlay;
