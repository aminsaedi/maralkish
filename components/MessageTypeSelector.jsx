import React from "react";

import { Text, TouchableOpacity } from "react-native";
import colors from "../utilities/colors";
import { Ionicons } from "@expo/vector-icons";

const MessageTypeSelector = ({ item, onPress, isActive }) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: isActive ? item.activeColor : colors.gray,
        borderRadius : 30,
        marginHorizontal : 3
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontFamily: "primary",
          color: isActive ? item.activeColor : colors.secondaryTextColor,
          fontSize: 15,
          marginRight : 5
        }}
      >
        {item.name}
      </Text>
      {item.icon && (
        <Ionicons
          size={15}
          name={item.icon}
          color={isActive ? item.activeColor : colors.secondaryTextColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default MessageTypeSelector;
