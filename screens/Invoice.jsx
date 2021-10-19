import React, { useState, useEffect, useContext, useRef } from "react";

import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Linking,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { isArray } from "lodash";
import config from "../config.json";

import { baseURL } from "../api/client";
import { apiGetInvoice, apiRegisterOrder } from "../api/cart";
import { apiGetPaymentProviders } from "../api/util";
import colors from "../utilities/colors";
import ProductCardInOrderDetail from "./../components/ProductCardInOrderDetail";
import Line from "../components/Line";
import AppInput from "./../components/Form/AppInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "./../components/Form/AppButton";
import LottieView from "lottie-react-native";
import CartContext from "./../cart/cartContext";
import pages from "./../navigation/routes";
import authStorage from "../auth/storage";
import client from "../api/client";

const Invoice = ({ navigation, route }) => {
  const [invoice, setInvoice] = useState();
  const [discountCode, setDiscountCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState();
  const [discount, setDiscount] = useState();
  const [loading, setLoading] = useState(true);
  const [paymentProviders, setPaymentProviders] = useState();
  const [orderButtonString, setOrderButtonString] = useState("ثبت سفارش");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationMessage, setAnomationMessage] = useState("سفارش شما ثبت شد!");
  const [trackingId, setTrackingId] = useState();
  const cartModalRef = useRef();

  const { refreshCart } = useContext(CartContext);

  const getInvoice = async () => {
    setLoading(true);
    try {
      const result = await apiGetInvoice(
        route.params.cartUniqueId,
        route.params.shippingMethodId,
        route.params.address
      );
      if (result.status === 200) setInvoice(result.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // alert("خطایی رخ داد");
    }
  };

  const handleOrderButtonString = () => {
    if (route.params?.paymentMethod) {
      if (route.params.paymentMethod.key === "cashOnDelivery")
        return setOrderButtonString("ثبت سفارش");
      else if (route.params.paymentMethod.key === "online")
        return setOrderButtonString("پرداخت آنلاین");
      else if (route.params.paymentMethod.key === "settle")
        return setOrderButtonString("ثبت سفارش");
    }
  };

  const handleDiscountCode = async () => {
    Keyboard.dismiss();
    if (discountCode === "aminsaedi") {
      setDiscountMessage("مبلغ ۳,۰۰۰ تومان از سفارش شما کسر شد");
      setDiscount(3000);
    } else if (discountCode.length === 0) {
      setDiscountMessage("کد تخفیف خود را وارد کنید");
    } else setDiscountMessage("کد تخفیف معتبر نیست");
  };

  const handleRegisterOrder = async () => {
    setButtonLoading(true);
    try {
      const refreshToken = await authStorage.getRefreshToken();
      const updatedToken = await client.post(
        "/api/store/customers/refresh-token",
        {
          token: refreshToken,
        }
      );
      await authStorage.setToken(updatedToken.data.accessToken);
      await authStorage.setRefreshToken(updatedToken.data.refreshToken);
      const result = await apiRegisterOrder(
        route.params.cartUniqueId,
        route.params.shippingMethodId,
        route.params.address,
        route.params.paymentMethod.key
      );
      console.log(result.data);
      if (result.status === 200) {
        await refreshCart();
        setShowAnimation(true);
        if (route.params.paymentMethod.key === "settle") {
          setTrackingId(result.data.trackingId);
          setButtonLoading(false);
        } else if (route.params.paymentMethod.key === "cashOnDelivery") {
          setTrackingId(result.data.trackingId);
          setButtonLoading(false);
        } else if (route.params.paymentMethod.key === "online") {
          setTrackingId(result.data.trackingId);
          setButtonLoading(false);
          if (!isArray(paymentProviders))
            return alert("امکان پرداخت آنلاین وجود ندارد");
          if (isArray(paymentProviders) && paymentProviders.length <= 0)
            return alert("هیچ درگاهی برای این فروشگاه ثبت نشده است");
          return Linking.openURL(
            `${baseURL}/api/store/orders/${result.data.uniqueId}/payment-requests?providerId=${paymentProviders[0].id}&returnPath=profishop://orderDetail/${result.data.trackingId}`
          );
        }

        //   TODO: navigate user to order registered page and clear cart
      }
    } catch (error) {
      setButtonLoading(false);
      console.log(error);
      alert("خطا در ثبت سفارش");
    }
  };

  const getPaymentProviders = async () => {
    try {
      const result = await apiGetPaymentProviders();
      if (result.status === 200) {
        return setPaymentProviders(result.data);
      }
    } catch (error) {
      setPaymentProviders(undefined);
    }
  };

  useEffect(() => {
    getInvoice();
    handleOrderButtonString();
    getPaymentProviders();
  }, []);

  if (showAnimation)
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
          source={require("../assets/doneAnimation.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            setShowAnimation(false);
            navigation.popToTop();
            navigation.navigate(pages.orderDetail, { trackingId });
          }}
        />
        {animationMessage && (
          <Text
            style={{ fontFamily: "primary", fontSize: 25, color: "#25F39E" }}
          >
            {animationMessage}
          </Text>
        )}
      </View>
    );

  if (!invoice || loading)
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

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <FlatList
            data={invoice.items}
            keyExtractor={(i) => i.sku.toString()}
            renderItem={({ item }) => (
              <ProductCardInOrderDetail showAddToCart={false} product={item} />
            )}
            ListHeaderComponent={
              <React.Fragment>
                <View
                  style={{
                    backgroundColor: colors.white,
                    paddingVertical: 10,
                    marginBottom: 10,
                    paddingHorizontal: 15,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "primary",
                      fontSize: 16,
                      lineHeight: 22,
                      textAlign: "right",
                    }}
                  >
                    سفارش شما به آدرس{" "}
                    {route.params?.address?.address?.toString()} ارسال خواهد شد.
                  </Text>
                  <Text
                    style={{
                      fontFamily: "primary",
                      fontSize: 16,
                      lineHeight: 22,
                      textAlign: "right",
                    }}
                  >
                    شیوه پرداخت انتخاب شده شما {route.params.paymentMethod.name}{" "}
                    می باشد.
                  </Text>
                  <Text
                    style={{
                      fontFamily: "primary",
                      fontSize: 16,
                      lineHeight: 22,
                      marginTop: 5,
                      color: colors.secondaryTextColor,
                      textAlign: "right",
                    }}
                  >
                    همچنین شما میتوانید با {/* <TouchableOpacity> */}
                    <Text
                      style={{
                        fontFamily: "primary",
                        fontSize: 16,
                        lineHeight: 22,
                        color: colors.seconadryColor,
                      }}
                      onPress={() => navigation.goBack()}
                    >
                      بازگشت به مرحله قبل
                    </Text>
                    {/* </TouchableOpacity> */} روش پرداخت و یا آدرس دریافت
                    سفارش خود را تغیر دهید
                  </Text>
                </View>
              </React.Fragment>
            }
            ListFooterComponent={
              <React.Fragment>
                <View
                  style={{
                    paddingHorizontal: 15,
                    marginTop: 15,
                    backgroundColor: colors.white,
                    paddingVertical: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "primaryBold",
                      fontSize: 15,
                      textAlign: "right",
                    }}
                  >
                    کد تخفیف
                  </Text>
                  <View
                    style={[
                      styles.flexRowBetween,
                      {
                        backgroundColor: colors.inputBackgroundColor,
                        paddingVertical: 5,
                        borderRadius: 10,
                        marginTop: 5,
                      },
                    ]}
                  >
                    <TouchableOpacity onPress={handleDiscountCode}>
                      <MaterialCommunityIcons
                        name="plus"
                        color={colors.inputPlaceholderColor}
                        size={25}
                      />
                    </TouchableOpacity>
                    <TextInput
                      style={{
                        flex: 1,
                        textAlign: "center",
                        direction: "ltr",
                        fontFamily: "primary",
                      }}
                      placeholder="کد تخفیف دارید ؟"
                      placeholderTextColor={colors.inputPlaceholderColor}
                      value={discountCode}
                      onChangeText={(t) => setDiscountCode(t)}
                      onEndEditing={handleDiscountCode}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "primary",
                      color: colors.seconadryColor,
                      textAlign: "center",
                      marginTop: 5,
                    }}
                  >
                    {discountMessage}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 15,
                    marginTop: 15,
                    backgroundColor: colors.white,
                    paddingVertical: 10,
                  }}
                >
                  <View style={styles.flexRowBetween}>
                    <Text
                      style={{
                        fontFamily: "primary",
                        fontSize: 15,
                        color: colors.secondaryTextColor,
                      }}
                    >
                      {invoice.items.length} کالا
                    </Text>
                    <Text style={{ fontFamily: "primaryBold", fontSize: 16 }}>
                      جزییات قیمت
                    </Text>
                  </View>
                  <View style={[styles.flexRowBetween, { marginTop: 10 }]}>
                    <Text
                      style={{ fontFamily: "primaryBold", color: colors.black }}
                    >
                      {invoice.totalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      تومان
                    </Text>
                    <Text
                      style={{
                        fontFamily: "primary",
                        color: colors.secondaryTextColor,
                      }}
                    >
                      قیمت کالا‌ها
                    </Text>
                  </View>
                  <View style={[styles.flexRowBetween, { marginTop: 10 }]}>
                    <Text
                      style={{ fontFamily: "primaryBold", color: colors.black }}
                    >
                      {invoice.totalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      تومان
                    </Text>
                    <Text
                      style={{
                        fontFamily: "primary",
                        color: colors.secondaryTextColor,
                      }}
                    >
                      جمع سبد خرید
                    </Text>
                  </View>
                  <Line style={{ marginVertical: 20 }} />
                  <View style={[styles.flexRowBetween, { marginTop: 10 }]}>
                    <Text
                      style={{ fontFamily: "primaryBold", color: colors.black }}
                    >
                      {invoice.shippingCost
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      تومان
                    </Text>
                    <Text
                      style={{
                        fontFamily: "primary",
                        color: colors.secondaryTextColor,
                      }}
                    >
                      هزینه ارسال
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "primary",
                      color: colors.secondaryTextColor,
                      textAlign: "right",
                      marginTop: 10,
                    }}
                  >
                    محاسبه شده بر اساس نحوه ارسال مرسوله
                  </Text>
                  {discount && (
                    <View style={[styles.flexRowBetween, { marginTop: 10 }]}>
                      <Text
                        style={{
                          fontFamily: "primaryBold",
                          color: colors.primaryColor,
                        }}
                      >
                        {discount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        تومان
                      </Text>
                      <Text
                        style={{
                          fontFamily: "primary",
                          color: colors.primaryColor,
                          textAlign: "right",
                        }}
                      >
                        کد تخفیف
                      </Text>
                    </View>
                  )}
                  <View style={[styles.flexRowBetween, { marginTop: 10 }]}>
                    <Text
                      style={{ fontFamily: "primaryBold", color: colors.black }}
                    >
                      {invoice.finalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      تومان
                    </Text>
                    <Text
                      style={{
                        fontFamily: "primary",
                        color: colors.secondaryTextColor,
                      }}
                    >
                      مبلغ قابل پرداخت
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            }
          />
        </View>
        <View
          style={[
            styles.bottomContainer,
            styles.flexRowBetween,
            { paddingHorizontal: 15 },
          ]}
        >
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "primary",
                color: colors.secondaryTextColor,
              }}
            >
              مجموع
            </Text>
            <Text
              style={{
                fontFamily: "primaryBold",
                color: colors.black,
                fontSize: 16,
              }}
            >
              {invoice.finalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              تومان
            </Text>
          </View>
          <AppButton
            value={config.isDemoStore ? "غیر فعال" : orderButtonString}
            style={{ width: "40%" }}
            onPress={handleRegisterOrder}
            loading={buttonLoading}
            disabled={config.isDemoStore}
          />
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  topContainer: {
    width: "100%",
    height: "90%",
    backgroundColor: colors.lightGray,
  },
  flexRowBetween: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomContainer: {
    width: "100%",
    height: "10%",
  },
});

export default Invoice;
