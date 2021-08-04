import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { TouchableOpacity, Text } from "react-native";

import colors from "../utilities/colors";

const ListItem = ({
  lable,
  onPress,
  leftIconName = "chevron-left",
  rightIconName,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 15,
        paddingVertical: 15,
      }}
    >
      {rightIconName && (
        <MaterialCommunityIcons
          name={rightIconName}
          size={30}
          color={colors.gray}
        />
      )}
      <Text
        style={{
          fontFamily: "primary",
          textAlign: "right",
          width: "80%",
          fontSize: 17,
        }}
      >
        {lable}
      </Text>
      {leftIconName && (
        <MaterialCommunityIcons
          name="chevron-left"
          size={30}
          color={colors.gray}
        />
      )}
    </TouchableOpacity>
  );
};

export default ListItem;
