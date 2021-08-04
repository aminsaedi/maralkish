import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import colors from "../utilities/colors";

const OrderStausIcon = ({ item, badge, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 100,
        height: 100,
        // backgroundColor: "lightgray",
        borderRadius: 19,
        marginLeft: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
      }}
      onPress={onPress}
    >
      {/* <Ionicons name="cart-outline" size={50} color={"green"} /> */}
      <Image
        source={item.icon}
        style={{ width: 100, height: 80 }}
        resizeMode="contain"
      />
      {badge !== -1 && (
        <View
          style={{
            width: 25,
            height: 25,
            position: "absolute",
            bottom: 25,
            left: 5,
            borderRadius:10,
            backgroundColor: colors.primaryColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontFamily: "primary", color: colors.buttonTextColor, fontSize: 20 }}
          >
            {badge}
          </Text>
        </View>
      )}
      <Text style={{ fontFamily: "primary", textAlign: "center" }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default OrderStausIcon;
