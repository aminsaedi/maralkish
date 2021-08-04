import React from "react";

import { TouchableOpacity, Text } from "react-native";

import colors from "../../utilities/colors";
import LottieView from "lottie-react-native";

const AppButton = ({
  onPress,
  onLongPress,
  value,
  style,
  disabled = false,
  loading = false,
  fontSize = 18,
  outline = false,
}) => {
  if (!outline)
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: disabled
              ? colors.midleLightGray
              : colors.primaryColor,
            width: "100%",
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            borderColor: colors.gray,
            borderWidth: disabled ? 0.5 : 0,
          },
          style,
        ]}
        onPress={() => {
          if (!disabled) onPress();
        }}
        onLongPress={onLongPress}
      >
        {!loading && (
          <Text
            style={{
              color: disabled ? colors.gray : colors.buttonTextColor,
              textAlign: "center",
              fontFamily: "primary",
              fontSize: fontSize,
            }}
          >
            {value}
          </Text>
        )}
        {loading && (
          <LottieView
            autoPlay
            loop
            source={require("../../assets/buttonLoading.json")}
            style={{ height: 100, width: "100%" }}
            colorFilters={[
              {
                keypath: "形状图层 2",
                color: colors.seconadryColor,
              },
              {
                keypath: "形状图层 1",
                color: colors.seconadryColor,
              },
            ]}
          />
        )}
      </TouchableOpacity>
    );
  else if (outline)
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: disabled ? colors.midleLightGray : null,
            width: "100%",
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            borderColor: colors.primaryColor,
            borderWidth: disabled ? 0.5 : 1,
          },
          style,
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {!loading && (
          <Text
            style={{
              color: disabled ? colors.gray : colors.primaryColor,
              textAlign: "center",
              fontFamily: "primary",
              fontSize: fontSize,
            }}
          >
            {value}
          </Text>
        )}
        {loading && (
          <LottieView
            autoPlay
            loop
            source={require("../../assets/buttonLoading.json")}
            style={{ height: 200, width: "100%" }}
            colorFilters={[
              {
                keypath: "形状图层 2",
                color: colors.seconadryColor,
              },
              {
                keypath: "形状图层 1",
                color: colors.seconadryColor,
              },
            ]}
          />
        )}
      </TouchableOpacity>
    );
};

export default AppButton;
