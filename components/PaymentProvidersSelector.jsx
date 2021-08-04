import React from "react";

import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import colors from "../utilities/colors";
import { baseURL } from "../api/client";

const PaymentProvidersSelector = ({
  payments,
  selectedPayment,
  onPaymentPress,
}) => {
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        inverted
        centerContent
        data={payments}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPaymentPress(item)}
            style={{
              backgroundColor: colors.white,
              width: 150,
              height: 100,
              borderColor: colors.gray,
              borderWidth: 1,
              borderRadius: 10,
              marginHorizontal: 5,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <View style={{ height: 50 }}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: `${baseURL}/common/img/banks/png/${item.type}.png`,
                }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                fontFamily: "primary",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              درگاه {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PaymentProvidersSelector;
