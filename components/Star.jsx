import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../utilities/colors'

const StarContainer = ({ score, voters, style }) => {
  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // height: 17,
        },
        style,
      ]}
    >
      {/* <Star
        score={score}
        style={{ width: 90, height: 17, backgroundColor: "red" }}
      /> */}

      <MaterialCommunityIcons
        name={score >= 1 ? "star" : "star-outline"}
        size={18}
        color={score >= 1 ? colors.startFull : colors.startEmpety}
      />

      <MaterialCommunityIcons
        name={score >= 2 ? "star" : "star-outline"}
        size={18}
        color={score >= 2 ? colors.startFull : colors.startEmpety}
      />

      <MaterialCommunityIcons
        name={score >= 3 ? "star" : "star-outline"}
        size={18}
        color={score >= 3 ? colors.startFull : colors.startEmpety}
      />

      <MaterialCommunityIcons
        name={score >= 4 ? "star" : "star-outline"}
        size={18}
        color={score >= 4 ? colors.startFull : colors.startEmpety}
      />

      <MaterialCommunityIcons
        name={score == 5 ? "star" : "star-outline"}
        size={18}
        color={score == 5 ? colors.startFull : colors.startEmpety}
      />

      <Text
        style={{
          fontFamily: "primary",
          fontSize: 13,
        }}
      >
        ({voters})
      </Text>
    </View>
  );
};

export default StarContainer;
