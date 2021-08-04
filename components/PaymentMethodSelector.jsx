import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import colors from "../utilities/colors";

const PaymentMethodSelector = ({
  method,
  selectedMethod,
  onMethodPress,
  showRadioButton = true,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onMethodPress(method)}
      style={{ display: "flex", flexDirection: "row", paddingVertical: 10 }}
      disabled={!showRadioButton}
    >
      <View style={{ flex: 1, paddingRight: !showRadioButton ? "5%" : null }}>
        <Text
          style={{
            fontFamily: "primary",
            color: colors.black,
            fontSize: 15,
            textAlign: "right",
          }}
        >
          {method.name}
        </Text>
        {method.description && (
          <Text
            style={{
              fontFamily: "primary",
              color: colors.secondaryTextColor,
              fontSize: 14,
              textAlign: "right",
              lineHeight: 20,
              marginTop: 5,
            }}
          >
            {method.description}
          </Text>
        )}
      </View>
      {showRadioButton && (
        <View style={{ width: "15%", display: "flex", alignItems: "center" }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 25 / 2,
              borderWidth: selectedMethod.id === method.id ? 3 : 2.5,
              borderColor:
                selectedMethod.id === method.id
                  ? colors.seconadryColor
                  : colors.gray,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedMethod.id === method.id && (
              <View
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 5,
                  backgroundColor: colors.seconadryColor,
                }}
              ></View>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PaymentMethodSelector;
