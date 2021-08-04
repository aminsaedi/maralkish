import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import ProgressiveImage from "./ProgressiveImage";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";
import colors from "../utilities/colors";
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import pages from "./../navigation/routes";

const ProductCardForAddNewReview = ({
  product,
  productId,
  onAddNewReview,
  onProductPress,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <TouchableOpacity
          style={styles.addReviewContainer}
          onPress={() =>
            navigation.navigate(pages.newReview, {
              productId: product.productId,
            })
          }
        >
          <MaterialCommunityIcons
            name="chevron-left"
            color={colors.seconadryColor}
            size={15}
          />
          <Text style={styles.addReviewText}>ثبت دیدگاه</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() =>
          navigation.navigate(pages.product, { productId: product.id })
        }
      >
        {product.image ? (
          <ProgressiveImage
            source={{
              uri: imageLinkGenerator(product.image, "jpg", 300, 300),
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../assets/default.jpg")}
            resizeMode="contain"
            style={{ width: "100%", height: "90%", borderRadius: 25 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 115,
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
  },
  detailContainer: {
    width: "70%",
    height: "100%",
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: "30%",
    height: "100%",
  },
  productName: {
    fontFamily: "primary",
    lineHeight: 27,
    fontSize: 16,
    maxHeight: "70%",
    height: "70%",
  },
  addReviewContainer: {
    height: "30%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  addReviewText: {
    fontFamily: "primary",
    color: colors.seconadryColor,
  },
});

export default ProductCardForAddNewReview;
