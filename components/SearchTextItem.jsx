import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utilities/colors";

const SearchTextItem = ({ value, onPress, isActive }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      {isActive && (
        <MaterialCommunityIcons
          name="check"
          size={17}
          color={colors.primaryColor}
        />
      )}
      <Text style={{ fontFamily: "primary", textAlign: "right", flex: 1 }}>
        {value.name}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchTextItem;
