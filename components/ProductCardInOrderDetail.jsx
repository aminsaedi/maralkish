import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import colors from "../utilities/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { baseURL } from "../api/client";
import pages from "./../navigation/routes";
import { useNavigation } from "@react-navigation/native";

const ProductCardInOrderDetail = ({
  isAvailable = true,
  allowReview = false,
  showAddToCart = true,
  product,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.detailSection}>
          <Text style={styles.productName}>{product.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.imageSection}
          onPress={() =>
            navigation.push(pages.product, { productId: product.productId })
          }
        >
          {showAddToCart && (
            <TouchableOpacity
              style={{
                width: 55,
                height: 30,
                //   backgroundColor: "red",
                position: "absolute",
                right: 10,
                bottom: 10,
                borderColor: isAvailable ? colors.primaryColor : colors.gray,
                borderWidth: 1,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
              disabled={!isAvailable}
            >
              <MaterialCommunityIcons
                name="cart-plus"
                size={20}
                color={isAvailable ? colors.primaryColor : colors.gray}
              />
            </TouchableOpacity>
          )}
          {product.quantity && (
            <View
              style={{
                // width: 55,
                // height: 30,
                //   backgroundColor: "red",
                position: "absolute",
                left: 10,
                bottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <Text style={{ fontFamily: "primary", color: colors.black }}>
                {product.quantity}
              </Text>
            </View>
          )}
          {product.imageAddress ? (
            <Image
              source={{ uri: baseURL + product.imageAddress }}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image
              source={require("../assets/default.jpg")}
              style={{ width: "100%", height: "100%", borderRadius: 15 }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontFamily: "primaryBold",
          textAlign: "left",
          fontSize: 17,
          marginLeft: 15,
        }}
      >
        {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        <Text style={{ fontSize: 12 }}>تومان</Text>
      </Text>
      {allowReview && (
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "primary",
              textAlign: "left",
              color: colors.seconadryColor,
              marginRight: 5,
            }}
          >
            ثبت نظر در مورد این کالا
          </Text>
          <MaterialCommunityIcons
            name="message-text-outline"
            size={15}
            color={colors.seconadryColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 125,
  },
  detailSection: {
    width: "70%",
    height: "100%",
    paddingHorizontal: 10,
  },
  imageSection: {
    width: "30%",
    height: "100%",
    // backgroundColor: "green",
    // position  :""
  },
  productName: {
    fontFamily: "primaryBold",
    textAlign: "right",
    fontSize: 17,
    lineHeight: 25,
  },
});

export default ProductCardInOrderDetail;
