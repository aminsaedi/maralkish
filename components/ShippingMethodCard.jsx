import React from "react";

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../utilities/colors";

const ShippingMethodCard = ({ item, onPress, isActive }) => {
  return (
    <TouchableOpacity
      style={{ display: "flex", flexDirection: "row", paddingVertical: 10 }}
      onPress={onPress}
    >
      <View style={{ width: "90%", height: "100%", paddingRight: 10 }}>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text style={styles.subTitleText}>
          {item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان
        </Text>
        {item.description && (
          <Text style={styles.subTitleText}>{item.description}</Text>
        )}
      </View>
      <View style={{ height: "100%", width: "10%" }}>
        <View
          style={[
            styles.outerCircle,
            { borderColor: isActive ? colors.seconadryColor : colors.gray },
          ]}
        >
          {isActive && <View style={styles.innerCircle}></View>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    marginTop: 5,
  },
  outerCircle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    // borderColor: colors.seconadryColor,
    borderWidth: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.seconadryColor,
  },
  titleText: {
    fontFamily: "primaryBold",
    fontSize: 18,
    textAlign: "right",
  },
  subTitleText: {
    fontFamily: "primary",
    fontSize: 15,
    color: colors.secondaryTextColor,
    textAlign : "right"
  },
});

export default ShippingMethodCard;
