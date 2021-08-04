import React from "react";

import { TouchableOpacity, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../utilities/colors";
import { color } from "jimp";

const PersoanlInfoCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      disabled={!item.editable}
      onPress={onPress}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {item.isVerified && (
            <View
              style={{
                backgroundColor: colors.green,
                borderRadius: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 5,
                paddingVertical: 1,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.white,
                  fontSize: 13,
                }}
              >
                تایید شده
              </Text>
            </View>
          )}
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 15,
              color: colors.gray,
              textAlign: "right",
            }}
          >
            {item.title}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "primary",
            fontSize: 16,
            color: colors.black,
            textAlign: "right",
            marginTop : 5
          }}
        >
          {item.type === "password" && "....."}
          {item.type === "text" && (item.subTitle || "تعریف نشده")}
        </Text>
      </View>
      {item.editable && <MaterialCommunityIcons
        name="chevron-left"
        size={25}
        color={colors.gray}
      />}
    </TouchableOpacity>
  );
};

export default PersoanlInfoCard;
