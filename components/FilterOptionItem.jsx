import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import colors from "../utilities/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Switch from "./Switch";

const FilterOptionItem = ({
  value,
  activeItem,
  onPress,
  activeValues,
  onIsAvailableChange,
  isAvailableValue,
}) => {
  if (value === "isAvailableSelector")
    return (
      <Switch
        onChange={() => {
          onIsAvailableChange();
        }}
        value={isAvailableValue}
      />
    );
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
      onPress={onPress}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <Text
            style={{
              fontFamily: "primary",
              textAlign: "right",
              color: colors.black,
              fontSize: 15,
              direction: "rtl",
              // marginLeft : 5,
              marginRight: 5,
            }}
          >
            {value}
          </Text>
          {activeItem && (
            <MaterialCommunityIcons
              name="circle"
              color={colors.seconadryColor}
              size={8}
            />
          )}
        </View>
        <MaterialCommunityIcons
          name="chevron-left"
          color={colors.black}
          size={25}
        />
      </View>
      {activeValues && (
        <Text
          style={{
            fontFamily: "primary",
            color: colors.gray,
            textAlign: "right",
          }}
          numberOfLines={4}
        >
          {activeValues.join(" ،")}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default FilterOptionItem;
