import React from "react";

import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utilities/colors";

const LocationDirectAddressItem = ({ onPress, title, subtitle }) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 15,
        paddingVertical: 5,
      }}
      onPress={onPress}
    >
      <View style={{ marginRight: 15 }}>
        <Text
          style={{
            fontFamily: "primary",
            color: colors.black,
            textAlign: "right",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "primary",
            color: colors.secondaryTextColor,
            fontSize: 15,
            textAlign: "right",
            marginTop : 5
          }}
          numberOfLines={1}
        >
          {subtitle}
        </Text>
      </View>
      <Ionicons
        name="ios-location-sharp"
        size={25}
        color={colors.secondaryTextColor}
      />
    </TouchableOpacity>
  );
};

export default LocationDirectAddressItem;
