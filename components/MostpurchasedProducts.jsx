import React from "react";
import { View, FlatList, Text } from "react-native";

// utilities import
import colors from "../utilities/colors";
import ProductSquareCard from "./ProductSquareCard";
import HorizentalLine from "./HorizentalLine";
import { isArray } from "lodash";

const MostpurchasedProducts = ({ mostPurchased }) => {
  if (!mostPurchased || !isArray(mostPurchased) || mostPurchased.length <= 0)
    return null

  return (
    <View style={{ backgroundColor: colors.white }}>
      <Text
        style={{
          fontFamily: "primaryBold",
          fontSize: 17,
          marginRight: 10,
          textAlign: "right",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        پرتکرار ترین خرید های شما
      </Text>
      <FlatList
        style={{ marginBottom: 20, marginTop: 10 }}
        horizontal
        data={mostPurchased}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductSquareCard product={item} />}
        ItemSeparatorComponent={HorizentalLine}
        inverted
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  //   return <View></View>;
};

export default MostpurchasedProducts;
