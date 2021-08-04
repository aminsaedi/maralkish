import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useTimer } from "react-timer-hook";
import { useNavigation } from "@react-navigation/native";

import colors from "../utilities/colors";
import CartContext from "../cart/cartContext";
import AppButton from "./Form/AppButton";

import {
  apiAddItemToCart,
  apiRemoveOneItemfromCart,
  apiUpdateItemQuantityInCart,
} from "../api/cart";

import { getCartId } from "../cart/cartStorage";
import pages from "./../navigation/routes";

const ExistsInCartButton = ({
  variantId,
  minOrderQuantity = 0,
  maxOrderQuantity = 0,
}) => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const [idInCart, setIdInCart] = useState();
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState();
  const { cart, refreshCart } = useContext(CartContext);
  const [showCartButton, setShowCartButton] = useState(false);

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 5);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => setShowCartButton(true),
  });

  const handleGetCartId = async () => {
    const cartIdResult = await getCartId();
    if (cartIdResult) setCartId(cartIdResult);
  };

  useEffect(() => {
    calculateQuantity();
    handleGetCartId();
  }, [variantId]);

  const handleIncrement = async () => {
    setLoading(true);
    if (quantity === maxOrderQuantity)
      return alert(`حداکثر خرید این محصول ${minOrderQuantity} میباشد`);
    // if (minOrderQuantity <= 0) return alert("خرید این محصول ممکن نیست");
    try {
      if (quantity === 0) {
        console.log(minOrderQuantity);
        if (minOrderQuantity > 1 && Platform.OS === "android")
          ToastAndroid.show(
            `حداقل خرید این محصول ‌${minOrderQuantity} عدد میباشد`,
            ToastAndroid.SHORT
          );
        const result = await apiAddItemToCart(
          cartId || cart.uniqueId,
          variantId,
          minOrderQuantity || 1
        );
        // console.log(result);
        if (result.status === 200) {
          setQuantity(minOrderQuantity || 1);
        }
      } else if (quantity > 0) {
        const result = await apiAddItemToCart(
          cartId || cart.uniqueId,
          variantId,
          quantity + 1
        );
        if (result.status === 200) {
          setQuantity(quantity + 1);
        }
      }
      await refreshCart();
      setLoading(false);
      const time = new Date();
      time.setSeconds(time.getSeconds() + 1.25);
      restart(time);
    } catch (error) {
      alert("امکان افزودن این محصول به سبد خرید وجود ندارد");
      setLoading(false);
    }
  };

  const handleDecrement = async () => {
    const innerIdInCart = await setIdInCartFunc();
    try {
      if (quantity === minOrderQuantity) {
        const result = await apiRemoveOneItemfromCart(
          cartId || cart.uniqueId,
          innerIdInCart || idInCart
        );
        if (result.status === 200) setQuantity(0);
      } else if (quantity > 1) {
        const result = await apiUpdateItemQuantityInCart(
          cartId || cart.uniqueId,
          innerIdInCart || idInCart,
          quantity - 1
        );
        if (result.status === 200) setQuantity(quantity - 1);
      }
      await refreshCart();
      setLoading(false);
      const time = new Date();
      time.setSeconds(time.getSeconds() + 2);
      restart(time);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("خطایی رخ داد");
    }
  };

  const setIdInCartFunc = async () => {
    setLoading(true);
    const newCart = await refreshCart();
    const contain = newCart.items.find(
      (cartItem) => cartItem.variantId === variantId
    );
    if (!contain) {
      setLoading(false);
      return setQuantity(0);
    }
    if (contain) {
      setQuantity(contain.quantity);
      setIdInCart(contain.id);
      setLoading(false);
      return contain.id;
    }
    setLoading(false);
  };

  const calculateQuantity = async () => {
    setLoading(true);
    // const newCart = await refreshCart();
    const newCart = {...cart}
    const contain = newCart.items.find(
      (cartItem) => cartItem.variantId === variantId
    );
    if (!contain) {
      setLoading(false);
      return setQuantity(0);
    }
    if (contain) {
      setQuantity(contain.quantity);
      setIdInCart(contain.id);
    }
    setLoading(false);
  };

  if (quantity === 0)
    return (
      <AppButton
        style={{ width: "50%" }}
        value={"افزودن به سبد خرید"}
        onPress={handleIncrement}
        // loading={loading}
        disabled={loading}
      />
    );
  else {
    if (!loading && showCartButton === false)
      return (
        <View style={styles.container}>
          <TouchableOpacity style={{ padding: 10 }} onPress={handleDecrement}>
            {quantity <= minOrderQuantity ? (
              <MaterialCommunityIcons
                name="trash-can-outline"
                color={colors.primaryColor}
                size={25}
              />
            ) : (
              <MaterialCommunityIcons
                name="minus"
                color={colors.primaryColor}
                size={25}
              />
            )}
          </TouchableOpacity>
          <View style={styles.flexAllCenter}>
            <Text style={styles.textStyle}>{quantity}</Text>
            {minOrderQuantity === quantity &&
              minOrderQuantity !== maxOrderQuantity && (
                <Text style={styles.quantityLimitText}>حداقل</Text>
              )}
            {maxOrderQuantity === quantity &&
              minOrderQuantity !== maxOrderQuantity && (
                <Text style={styles.quantityLimitText}>حداکثر</Text>
              )}
            {minOrderQuantity === maxOrderQuantity && (
              <Text
                style={{ fontFamily: "primary", color: colors.primaryColor }}
              >
                فقط
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={handleIncrement}
            disabled={quantity >= maxOrderQuantity}
            style={{ padding: 10 }}
          >
            <MaterialCommunityIcons
              name="plus"
              color={
                quantity >= maxOrderQuantity ? colors.gray : colors.primaryColor
              }
              size={25}
            />
          </TouchableOpacity>
        </View>
      );
    else if (!loading && showCartButton === true)
      return (
        <View
          style={{ height: 50, display: "flex", flexDirection: "row-reverse" }}
        >
          <TouchableOpacity
            onPress={() => {
              setShowCartButton(false);
              const time = new Date();
              time.setSeconds(time.getSeconds() + 1.5);
              restart(time);
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: colors.primaryColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "primary",
                color: colors.buttonTextColor,
                fontSize: 20,
              }}
            >
              {quantity}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 5 }}
            onPress={() => navigation.push(pages.app,{screen : pages.cart})}
          >
            <Text style={{ fontFamily: "primary", textAlign: "right" }}>
              در سبد شما
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                textAlign: "right",
                marginTop: 5,
              }}
            >
              مشاهده{" "}
              <Text style={{ color: colors.primaryColor }}>سبد خرید</Text>
            </Text>
          </TouchableOpacity>
        </View>
      );
    else if (loading)
      return (
        <View style={[styles.container]}>
          <LottieView
            source={require("../assets/spinner.json")}
            autoPlay
            style={{ width: 250, height: 50, flex: 1 }}
            autoSize
          />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 5,
    borderColor: colors.lightGray,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: colors.primaryColor,
    minWidth: 100,
    paddingHorizontal: 5,
  },
  textStyle: {
    fontFamily: "primary",
    fontSize: 20,
    color: colors.primaryColor,
    marginHorizontal: 40,
  },
  flexAllCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityLimitText: {
    fontFamily: "primary",
    color: colors.secondaryTextColor,
  },
});

export default ExistsInCartButton;
