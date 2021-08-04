import React from "react";
import { useNavigation } from "@react-navigation/native";

import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import ProgressiveImage from "./ProgressiveImage";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";
import colors from "../utilities/colors";
import pages from "./../navigation/routes";

const ProductSquareCard = ({ product }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        height: 250,
        width: 175,
        display: "flex",
      }}
      onPress={() => {
        navigation.push(pages.product, { productId: product.id });
        // console.log(product.id)
      }}
    >
      <View style={{ width: "100%", height: "50%" }}>
        {product.image ? (
          <ProgressiveImage
            source={{
              uri: imageLinkGenerator(
                product.image,
                "webp",
                windowWidth - 50,
                windowHeight,
                80
              ),
            }}
            thumbnailSource={{
              uri: imageLinkGenerator(product.image, "webp", 200, 200, 30),
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMethod="auto"
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../assets/default.jpg")}
            style={{ width: "100%", height: "100%", borderRadius: 15 }}
            resizeMode="contain"
          />
        )}
      </View>
      <View
        style={{
          width: "100%",
          height: "20%",
          paddingHorizontal: 15,
          paddingTop: 5,
        }}
      >
        <Text
          numberOfLines={2}
          style={{ textAlign: "center", fontFamily: "primary", lineHeight: 19 }}
        >
          {product.name}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "30%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {product.price === 0 && (
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 17,
                textAlign: "center",
                color: colors.secondaryTextColor,
                width: "100%",
              }}
            >
              ناموجود
            </Text>
          )}
          {product.price > 0 && (
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 17,
                textAlign: "left",
                marginLeft: 10,
              }}
            >
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <Text style={{ fontSize: 11 }}>تومان</Text>
            </Text>
          )}
          {product.price !== product.regularPrice && (
            <View
              style={{
                backgroundColor: colors.primaryColor,
                borderRadius: 15,
                // paddingHorizontal: 5,
                paddingVertical: 5,
                width: "25%",
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  textAlign: "center",
                  color: colors.buttonTextColor,
                  fontSize: 12,
                  marginHorizontal: 10,
                }}
              >
                {Math.round(
                  ((product.regularPrice - product.price) /
                    product.regularPrice) *
                    100
                )}
                %
              </Text>
            </View>
          )}
        </View>
        {product.price !== product.regularPrice && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "primary",
                textAlign: "left",
                fontSize: 12,
                marginLeft: "20%",
                color: colors.gray,
                textDecorationLine: "line-through",
              }}
            >
              {product.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductSquareCard;
