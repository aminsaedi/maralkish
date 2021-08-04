import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { View } from "react-native";

import colors from "../utilities/colors";

const FilterSubOption = ({ value, onPress, isChecked = false }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <BouncyCheckbox
        style={{
          flex: 1,
          flexDirection: "row-reverse",
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
        size={20}
        fillColor={colors.seconadryColor}
        unfillColor="#FFFFFF"
        text={value}
        iconStyle={{ borderColor: colors.seconadryColor, borderRadius: 5 }}
        textStyle={{ fontFamily: "primary", color: colors.gray }}
        onPress={onPress}
        bounceFriction={7}
        // disableBuiltInState
        isChecked={isChecked}
      />
    </View>
  );
};

export default FilterSubOption;
