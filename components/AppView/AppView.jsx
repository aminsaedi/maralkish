import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatusBarHeight } from "react-native-status-bar-height";
import colors from "../../utilities/colors";

const AppView = ({
  style,
  children,
  isSAfe = false,
  topSafe = false,
  skipAndroid = false,
}) => {
  if (!isSAfe)
    return (
      <View
        style={[
          {
            backgroundColor: colors.white,
            height: "100%",
            paddingTop: topSafe ? getStatusBarHeight(skipAndroid) : null,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  else if (isSAfe)
    return (
      <SafeAreaView
        style={[{ backgroundColor: colors.white, height: "100%" }, style]}
      >
        {children}
      </SafeAreaView>
    );
};

export default AppView;
