import React, { useState, useRef } from "react";

import { TouchableOpacity, Text, Animated, View } from "react-native";
import colors from "../utilities/colors";

const Switch = ({ onChange, value = false }) => {
  const [checked, setChecked] = useState(value);
  const [animation, setAnimation] = useState(new Animated.Value(value === false ? 4 : 22));
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
      onPress={() => {
        onChange();
        if (checked) {
          Animated.timing(animation, {
            toValue: 4,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else if (!checked) {
          Animated.timing(animation, {
            toValue: 22,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
        setChecked(!checked);
      }}
    >
      <Text style={{ fontFamily: "primary", textAlign: "right", fontSize: 15 }}>
        فقط کالاهای موجود
      </Text>

      <View
        style={{
          width: 38,
          height: 20,
          borderRadius: 15,
          borderColor: colors.black,
          borderWidth: !checked ? 2 : 0,
          display: "flex",
          justifyContent: "center",
          backgroundColor: !checked ? undefined : colors.seconadryColor,
          marginLeft: 5,
        }}
      >
        <Animated.View
          style={{
            width: 9,
            height: 9,
            borderRadius: 10,
            backgroundColor: !checked ? colors.gray : colors.white,
            // marginLeft: !checked ? 5 : 17,
            marginLeft: animation,
            // opacity : animation
          }}
        ></Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default Switch;
