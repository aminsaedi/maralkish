import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

// utilities import
import colors from "../utilities/colors";

// apis import
import { apiGetSpecialOffers } from "../api/products";
import SpecialProductCard from "./SpecialProductCard";
import pages from "./../navigation/routes";

const SpecialOffers = ({ style }) => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const getProducts = async () => {
    setLoading(true);
    try {
      const result = await apiGetSpecialOffers();
      setLoading(false);
      if (result.status === 200) {
        const prod = [{ id: "firstItem" }];
        prod.push(...result.data.slice(0, 5));
        // prod.push(...result.data);
        if (result.data.length > 5) prod.push({ id: "lastItem" });
        setProducts(prod);
      }
    } catch (error) {
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);


  if (loading)
    return (
      <View
        style={[{
          width: "100%",
          height: 350,
          backgroundColor: colors.primaryColor,
        },style]}
      ></View>
    );
  else if (!products || products.length < 2) return null;

  return (
    <View
      style={[
        {
          backgroundColor: colors.primaryColor,
          height: 350,
          // paddingVertical: 20,
        },
        style,
      ]}
    >
      {products ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          inverted
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
          renderItem={({ item, index }) => {
            if (item.id === "firstItem")
              return (
                <View
                  style={{
                    width: 175,
                    height: "100%",
                    // display : "flex"
                  }}
                >
                  <View style={{ height: "75%" }}>
                    <Image
                      source={require("../assets/specialOffersFirstItem.png")}
                      resizeMode="contain"
                      style={{
                        height: "100%",
                        width: "100%",
                        overflow: "hidden",
                        //   flexGrow : 4
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      height: "25%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      paddingTop: 20,
                      paddingRight: 10,
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                    onPress={() => navigation.push(pages.specialOffers)}
                  >
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={24}
                      color={colors.buttonTextColor}
                    />
                    <Text
                      style={{ fontFamily: "primary", color: colors.buttonTextColor }}
                    >
                      مشاهده همه
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            else if (item.id === "lastItem")
              return (
                <View
                  style={{
                    backgroundColor: colors.white,
                    height: "100%",
                    width: 150,
                    borderRadius: 10,
                    marginLeft: 10,
                    display: "flex",
                    overflow: "hidden",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate(pages.specialOffers)}
                  >
                    <MaterialCommunityIcons
                      name="arrow-left-circle-outline"
                      size={50}
                      color={colors.primaryColor}
                    />
                    <Text style={{ fontFamily: "primary" }}>مشاهده همه</Text>
                  </TouchableOpacity>
                </View>
              );
            else return <SpecialProductCard product={item} />;
          }}
        />
      ) : (
        <SkeletonPlaceholder>
          <View style={{ height: 350, width: "100%" }}></View>
        </SkeletonPlaceholder>
      )}
    </View>
  );
};

export default SpecialOffers;
