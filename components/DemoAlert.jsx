import React from "react";
import { Text, View } from "react-native";

import config from "../config.json";
import colors from "../utilities/colors";

const DemoAlert = () => {
  if (config.isDemoStore)
    return (
      <View style={{ marginVertical: 20 }}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "primaryBold",
            fontSize: 20,
            color: colors.danger,
            paddingHorizontal: 15,
            lineHeight: 30,
          }}
        >
          این یک فروشگاه آزمایشی جهت نمایش امکانات سیستم فروشگاه ساز پروفی شاپ
          می‌باشد
        </Text>
      </View>
    );
  else return null;
};

export default DemoAlert;
