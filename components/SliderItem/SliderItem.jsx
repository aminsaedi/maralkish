import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import imageLinkGenerator from "./../../utilities/imageLinkGenerator";
import ProgressiveImage from "./../ProgressiveImage";

const SliderItem = ({ slide }) => {
  return (
    <View style={styles.container}>
      <ProgressiveImage
        source={{
          uri: imageLinkGenerator(slide, "jpg"),
        }}
        thumbnailSource={{ uri: imageLinkGenerator(slide, "jpg", 200) }}
        style={{ width: "100%", height: "100%" }}
      />
      <Text>{slide.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "dodgerblue",
    width: "100%",
    height: 180,
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default SliderItem;
