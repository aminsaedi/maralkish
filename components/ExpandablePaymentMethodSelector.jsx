import { isArray } from "lodash";
import React, { useState } from "react";

import { Text, TouchableOpacity, StyleSheet } from "react-native";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utilities/colors";

const ExpandablePaymentMethodSelector = ({
  methods,
  selectedMethod,
  onMethodPress,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!methods) return null;
  return (
    <React.Fragment>
      {isExpanded
        ? methods.map((item) => (
            <PaymentMethodSelector
              key={item.id}
              method={item}
              selectedMethod={selectedMethod}
              onMethodPress={() => onMethodPress(item)}
              showRadioButton={methods.length === 1 ? false : true}
            />
          ))
        : methods
            .slice(0, 2)
            .map((item) => (
              <PaymentMethodSelector
                key={item.id}
                method={item}
                selectedMethod={selectedMethod}
                onMethodPress={() => onMethodPress(item)}
                showRadioButton={methods.length === 1 ? false : true}
              />
            ))}
      {isArray(methods) && methods.length > 2 && (
        <TouchableOpacity
          style={[
            styles.flexRow,
            {
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
            },
          ]}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <MaterialCommunityIcons
            name={!isExpanded ? "chevron-down" : "chevron-up"}
            size={15}
            color={colors.seconadryColor}
          />
          <Text
            style={{
              fontFamily: "primary",
              color: colors.seconadryColor,
              fontSize: 15,
            }}
          >
            {!isExpanded
              ? `مشاهده همه ${methods.length} روش پرداخت`
              : "مشاهده کمتر"}
          </Text>
        </TouchableOpacity>
      )}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ExpandablePaymentMethodSelector;
