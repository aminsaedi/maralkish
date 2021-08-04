import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import colors from "../utilities/colors";
import ProgressiveImage from "./ProgressiveImage";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import pages from "../navigation/routes";
import {
  apiRemoveOneItemfromCart,
  apiUpdateItemQuantityInCart,
  apiAddItemToCart,
} from "../api/cart";
import { getCartId } from "../cart/cartStorage";
import CartContext from "../cart/cartContext";
import ProductOptionsForCart from "./ProductOptionsForCart";

const ProductInCartCard = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [internalQuantity, setInteralQuantity] = useState(item.quantity);
  const [minOrderQuantity, setMinOrderQuantuty] = useState(1);
  const [cartId, setCartId] = useState();

  const { cart, refreshCart } = useContext(CartContext);

  const getCartIdFromStorage = () => getCartId();
  // if (cartIdResult) setCartId(cartIdResult);

  const navigation = useNavigation();

  const handleIncrement = async () => {
    setLoading(true);
    try {
      const result = await apiAddItemToCart(
        cartId || cart.uniqueId,
        item.variantId,
        internalQuantity + 1
      );
      if (result.status === 200) {
        await refreshCart();
        // item.quantity += 1;
        setInteralQuantity(internalQuantity + 1);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("خطا در افزودن محصول به سبد خرید");
    }
  };
  const handleDecrement = async () => {
    try {
      if (internalQuantity === minOrderQuantity) {
        const result = await apiRemoveOneItemfromCart(
          cartId || cart.uniqueId,
          item.id
        );
        if (result.status === 200) {
          // item.quantity -= 1;
          // item.quantity = item.quantity - 1;
          await refreshCart();
          setInteralQuantity(internalQuantity - 1);
          setLoading(false);
        }
      } else if (internalQuantity > 1) {
        const result = await apiUpdateItemQuantityInCart(
          cartId || cart.uniqueId,
          item.id,
          internalQuantity - 1
        );
        if (result.status === 200) {
          await refreshCart();
          // item.quantity = item.quantity-1 ;
          setInteralQuantity(internalQuantity - 1);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("خطایی رخ داد");
    }
  };

  useEffect(() => {
    // console.log(item.minOrderQuantity,item.maxOrderQuantity)

    if (item.minOrderQuantity > 0) setMinOrderQuantuty(item.minOrderQuantity);
    let isMounted = true;
    getCartIdFromStorage().then((data) => {
      if (isMounted) setCartId(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setInteralQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <View style={styles.container}>
      {item.price !== item.regularPrice && (
        <View style={styles.rowOne}>
          <View
            style={{
              height: "60%",
              width: 3,
              backgroundColor: colors.primaryColor,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          ></View>
          <Text
            style={{
              fontFamily: "primaryBold",
              color: colors.primaryColor,
              marginRight: 20,
            }}
          >
            {item.hasDiscount ? "فروش ویژه" : "پیشنهاد شگفت انگیز"}
          </Text>
        </View>
      )}
      <View style={styles.rowTwo}>
        <View style={styles.detailContainer}>
          <Text style={styles.titleText}>{item.name}</Text>
          {/* {item.options.map((i) => (
            <Text
              style={{ fontFamily: "primary", textAlign: "right" }}
              key={i.productOptionId}
            >
             {i.name} : {i.value}
            </Text>
          ))} */}
          <ProductOptionsForCart options={item.options} />
        </View>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            navigation.push(pages.product, { productId: item.productId })
          }
        >
          {item.image ? (
            <ProgressiveImage
              source={{ uri: imageLinkGenerator(item.image) }}
              style={styles.image}
              resizeMode="contain"
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
      <View style={styles.rowThree}>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            onPress={handleIncrement}
            disabled={internalQuantity >= item.maxOrderQuantity}
          >
            <MaterialCommunityIcons
              name="plus"
              size={25}
              color={
                internalQuantity >= item.maxOrderQuantity
                  ? colors.gray
                  : colors.primaryColor
              }
            />
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[styles.quantityText]}>{internalQuantity}</Text>
            {internalQuantity >= item.maxOrderQuantity &&
              minOrderQuantity !== item.maxOrderQuantity && (
                <Text
                  style={{ fontFamily: "primary", color: colors.primaryColor }}
                >
                  حداکثر
                </Text>
              )}
            {internalQuantity === minOrderQuantity &&
              minOrderQuantity !== item.maxOrderQuantity && (
                <Text
                  style={{ fontFamily: "primary", color: colors.primaryColor }}
                >
                  حداقل
                </Text>
              )}
            {minOrderQuantity === item.maxOrderQuantity && (
              <Text
                style={{ fontFamily: "primary", color: colors.primaryColor }}
              >
                فقط
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={handleDecrement}>
            <MaterialCommunityIcons
              name={
                internalQuantity === minOrderQuantity
                  ? "trash-can-outline"
                  : "minus"
              }
              size={25}
              color={
                internalQuantity === minOrderQuantity
                  ? colors.danger
                  : colors.primaryColor
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          {item.price !== item.regularPrice && (
            <Text style={styles.priceText}>
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              تخفیف
            </Text>
          )}
          <Text style={styles.regularPriceText}>
            {item.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            <Text style={styles.tomanText}>تومان</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "98%",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingRight: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: colors.white,
    marginLeft: "1%",
    marginVertical: 5,
  },
  rowOne: {
    display: "flex",
    height: 45,
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowTwo: {
    height: 180,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowThree: {
    height: 75,
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    height: "100%",
    width: "35%",
  },
  detailContainer: {
    height: "100%",
    width: "65%",
    paddingRight: 10,
  },
  titleText: {
    fontFamily: "primaryBold",
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 15,
    textAlign: "right",
    lineHeight: 25,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  counterContainer: {
    borderColor: colors.gray,
    borderWidth: 1,
    height: "60%",
    width: "30%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2.5,
  },
  quantityText: {
    fontFamily: "primaryBold",
    fontSize: 18,
    color: colors.primaryColor,
  },
  priceContainer: {
    width: "65%",
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  regularPriceText: {
    fontFamily: "primaryBold",
    fontSize: 18,
    textAlign: "right",
  },
  priceText: {
    fontFamily: "primary",
    color: colors.primaryColor,
    fontSize: 14,
    textAlign: "right",
  },
  tomanText: {
    fontSize: 14,
  },
});

export default ProductInCartCard;
