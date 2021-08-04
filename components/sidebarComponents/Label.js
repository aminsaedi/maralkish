import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../utilities/colors";

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>
        {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 8,
    backgroundColor: colors.seconadryColor,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: "primary",
  },
});

export default memo(Label);
