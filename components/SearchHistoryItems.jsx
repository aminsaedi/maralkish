import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utilities/colors";

const SearchHistoryItem = ({ onPress, value }) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: colors.midleLightGray,
        borderWidth: 1,
        borderRadius : 15,
        paddingHorizontal : 5,
        paddingVertical : 5,
        marginLeft : 5
      }}
      onPress={onPress}
    >
      <Text style={{ fontFamily: "primary",fontSize : 17 }}>{value}</Text>
      <MaterialCommunityIcons
        name="chevron-left"
        size={20}
        color={colors.gray}
      />
    </TouchableOpacity>
  );
};

export default SearchHistoryItem;
