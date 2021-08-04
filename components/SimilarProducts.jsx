import React from "react";
import { View, FlatList, Text } from "react-native";
import LottieView from "lottie-react-native";

// utilities import
import colors from "../utilities/colors";
import ProductSquareCard from "./ProductSquareCard";
import HorizentalLine from "./HorizentalLine";

const SimilarProducts = ({ similars }) => {
  if (!similars)
    return (
      <View
        style={{
          backgroundColor: colors.lightGray,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <LottieView
          style={{ width: 200, height: 200 }}
          source={require("../assets/spinner.json")}
          autoPlay
        />
      </View>
    );

  return (
    <View style={{ backgroundColor: colors.white }}>
      <Text
        style={{
          fontFamily: "primaryBold",
          fontSize: 17,
          marginRight: 10,
          textAlign: "right",
          marginTop: 20,
          marginBottom : 10
        }}
      >
        محصولات مشابه
      </Text>
      <FlatList
        style={{ marginBottom: 20, marginTop: 10 }}
        horizontal
        data={similars}
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

export default SimilarProducts;
