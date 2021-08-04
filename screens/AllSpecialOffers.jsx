import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import AppView from "../components/AppView/AppView";
import LottieView from "lottie-react-native";


import { apiGetSpecialOffers } from "../api/products";
import SpecialProductSquareCard from "./../components/SpecialProductSquareCard";
import colors from "../utilities/colors";

const AllSpecialOffers = ({ navigation }) => {
  const [products, setProducts] = useState();

  const getProducts = async () => {
    const result = await apiGetSpecialOffers();
    if (result.status === 200) setProducts(result.data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  if (!products) {
    return (
      <View
        style={{
          backgroundColor: colors.white,
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
  }

  return (
    <AppView>
      <FlatList
        data={products}
        keyExtractor={(i) => i.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SpecialProductSquareCard product={item} />}
      />
    </AppView>
  );
};

export default AllSpecialOffers;
