import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import persianColors from "../utilities/persianColors";
import colors from "../utilities/colors";

const ProductOptionsForCart = ({ options }) => {
  return (
    <View>
      {options.map((i) => {
        if (i.name.includes("رنگ")) {
          // some logic to render color
          return (
            <View
              key={i.productOptionId}
              style={[styles.flexRow, { justifyContent: "flex-end" }]}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  direction: "rtl",
                  textAlign: "right",
                  color : colors.secondaryTextColor
                }}
              >
                {i.name}:
                <Text>
                  {persianColors.find((c) => c.color === i.value)?.name}
                </Text>
              </Text>
              <View
                style={{
                  width: 17,
                  height: 17,
                  borderRadius: 10,
                  backgroundColor: i.value.toLowerCase(),
                  marginLeft : 5,
                  borderColor : colors.black,
                  borderWidth : 0.5
                }}
              ></View>
              {/* <Ionicons name="color-palette-outline" size={20} /> */}
            </View>
          );
        } else if (i.name.includes("سایز")) {
          return (
            <View
              key={i.productOptionId}
              style={[styles.flexRow, { justifyContent: "flex-end" }]}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.secondaryTextColor,
                }}
              >
                {i.name}: {i.value}
              </Text>
              <Ionicons name="resize-outline" size={20} />
            </View>
          );
        } else {
          return (
            <View
              key={i.productOptionId}
              style={[styles.flexRow, { justifyContent: "flex-end" }]}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.secondaryTextColor,
                }}
              >
                {i.name}: {i.value}
              </Text>
              <Ionicons name="arrow-undo-sharp" size={20} />
            </View>
          );
        }
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
});

export default ProductOptionsForCart;
