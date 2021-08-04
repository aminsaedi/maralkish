import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

import ProgressiveImage from "./ProgressiveImage";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";
import colors from "../utilities/colors";
import { useNavigation } from "@react-navigation/native";
import pages from "./../navigation/routes";

const ProductInCartHorizentalCard = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: 100,
        height: 100,
        marginRight: 5,
      }}
      onPress={() =>
        navigation.push(pages.product, { productId: product.productId })
      }
    >
      {product.image ? (
        <ProgressiveImage
          source={{ uri: imageLinkGenerator(product.image, "jpg", 200, 200) }}
          thumbnailSource={{
            uri: imageLinkGenerator(product.image, "jpg", 100, 100),
          }}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={require("../assets/default.jpg")}
          style={{ width: "100%", height: "100%", borderRadius: 15 }}
          resizeMode="contain"
        />
      )}
      {/* <Text style={{ fontFamily: "primary", textAlign: "center" }}  >
        {product.options.map(i => i.value).join(" ")}
      </Text> */}
      <Text
        style={{
          position: "absolute",
          left: 10,
          bottom: 5,
          fontFamily: "primary",
          color: colors.black,
        }}
      >
        {product.quantity}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductInCartHorizentalCard;
