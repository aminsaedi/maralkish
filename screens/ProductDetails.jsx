import React from "react";
import { FlatList, Text, View } from "react-native";
import colors from "../utilities/colors";

import Line from "../components/Line";
const ProductDetails = ({route}) => {
  return (
    <FlatList
      style={{ paddingHorizontal: 10, marginTop: 25 }}
      data={route.params.propertyGroups}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <React.Fragment>
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 20,
              // marginRight: 20,
              textAlign: "right",
              marginBottom: 20,
            }}
          >
            {item.name}
          </Text>
          {item.properties.map((subItem) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                width: "100%",
                marginBottom: 20,
              }}
              key={subItem.id}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  width: "40%",
                  color: colors.secondaryTextColor,
                  textAlign: "right",
                }}
              >
                {subItem.name}
              </Text>
              <View style={{ width: "60%" }}>
                <Text
                  style={{
                    fontFamily: "primary",
                    textAlign: "right",
                    marginBottom: 2,
                    lineHeight : 24
                  }}
                >
                  {subItem.values.join(" ")}
                </Text>
                <Line marginHorizontal="0%" width="100%" />
              </View>
            </View>
          ))}
          {/* <Line /> */}
        </React.Fragment>
      )}
    />
  );
};

export default ProductDetails;
