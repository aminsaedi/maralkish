import React from "react";
import { Text } from "react-native";
import colors from "../../utilities/colors";

const AppInputError = ({ error, style }) => {
//   if (!error) return null;
  return (
    <Text style={[style, { fontFamily: "primary", color: colors.danger,textAlign : "right" }]}>
      {error}
    </Text>
  );
};

export default AppInputError;
