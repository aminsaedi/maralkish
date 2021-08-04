import React, { useState, useEffect, useRef } from "react";
import * as Progress from "react-native-progress";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import Line from "../components/Line";
import colors from "../utilities/colors";
import ProductCardInOrderDetail from "../components/ProductCardInOrderDetail";
import moment from "jalali-moment";
import { Modalize } from "react-native-modalize";

import { apiGetOrderDetail } from "../api/order";
import { apiGetBankAccounts, apiGetPaymentProviders } from "../api/util";
import AppButton from "../components/Form/AppButton";
import BankCartSelector from "../components/BankCartSelector";
import PaymentProvidersSelector from "./../components/PaymentProvidersSelector";
import { baseURL } from "../api/client";

const OrderDetail = ({ route, navigation }) => {
  const [order, setOrder] = useState();
  const [bankAccounts, setBankaccounts] = useState();
  const [orderProgress, setOrderProgress] = useState(0.3);
  const [paymentProviders, setPaymentProviders] = useState();
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState();
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get("window").width;

  const cartModalRef = useRef();
  const bankModalRef = useRef();

  const persianStates = [
    { en: "pending", fa: "در حال پردازش" },
    { en: "ready", fa: "آماده به ارسال" },
    { en: "sent", fa: "ارسال شده" },
    { en: "rested", fa: "توزیع شده" },
    { en: "done", fa: "تکمیل شده" },
    { en: "returned", fa: "بازگشتی" },
    { en: "canceled", fa: "انصرافی" },
  ];

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

  const getOrderDetail = async () => {
    try {
      const result = await apiGetOrderDetail(route.params.trackingId);
      if (result.status === 200) {
        setOrder(result.data);
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("سفارش یافت نشد");
        navigation.goBack();
      } else {
        navigation.goBack();
        alert("خطایی رخ داد");
      }
    }
  };

  const getBankAccounts = async () => {
    try {
      const result = await apiGetBankAccounts();
      if (result.status === 200) setBankaccounts(result.data);
    } catch (error) {}
  };

  const handleOrderProgress = () => {
    if (!order) return setOrderProgress(0);
    if (order.state === "pending") return setOrderProgress(0.1);
    if (order.state === "ready") return setOrderProgress(0.4);
    if (order.state === "sent") return setOrderProgress(0.6);
    if (order.state === "rested") return setOrderProgress(0.8);
    if (order.state === "done") return setOrderProgress(1);
    else return setOrderProgress(0);
  };

  const handleOpenPayment = (item) => {
    Linking.openURL(
      `${baseURL}/api/store/orders/${order.uniqueId}/payment-requests?providerId=${item.id}&returnPath=profishop://orderDetail/${order.trackingId}`
    );
  };

  useEffect(() => {
    getOrderDetail();
    getPaymentProviders();
    getBankAccounts();
  }, []);

  useEffect(() => {
    if (order) handleOrderProgress();
  }, [order]);

  if (loading || !order) return null;

  return (
    <React.Fragment>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.sectionContainer, { marginTop: 5 }]}>
          <View style={styles.flexRowJustifyBetween}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 13,
                color: colors.black,
              }}
            >
              {persianStates.find((i) => i.en === order.state).fa}
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 13,
                color: colors.secondaryTextColor,
              }}
            >
              وضعیت سفارش:
            </Text>
          </View>
          <View style={styles.flexRowJustifyBetween}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 13,
                color: colors.black,
              }}
            >
              {order.trackingId}
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 13,
                color: colors.secondaryTextColor,
              }}
            >
              کد رهگیری:
            </Text>
          </View>
          <View style={styles.flexRowJustifyBetween}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 13,
                color: colors.black,
              }}
            >
              {order.uniqueId}
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 13,
                color: colors.secondaryTextColor,
              }}
            >
              شناسه سفارش:
            </Text>
          </View>
          <View style={styles.flexRowJustifyBetween}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 13,
                color: colors.black,
              }}
            >
              {moment(order.date, "YYYY/MM/DD")
                .locale("fa")
                .format("YYYY/MM/DD")}
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 13,
                color: colors.secondaryTextColor,
              }}
            >
              تاریخ ثبت سفارش:
            </Text>
          </View>
          <Line style={styles.lineSpace} />
          <View style={styles.flexRowJustifyBetween}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 13,
                color: colors.black,
              }}
            >
              {order.firstName + " " + order.lastName}
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 13,
                color: colors.secondaryTextColor,
              }}
            >
              تحویل گیرنده:
            </Text>
          </View>
          <View style={styles.flexRowJustifyBetween}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 13,
                color: colors.black,
              }}
            >
              {order.mobile || order.phone}
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 13,
                color: colors.secondaryTextColor,
              }}
            >
              شماره تماس:
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "primary",
              textAlign: "right",
              color: colors.secondaryTextColor,
            }}
          >
            ارسال به:
          </Text>
          <Text
            style={{
              fontFamily: "primaryBold",
              textAlign: "right",
              fontSize: 16,
              lineHeight: 27,
            }}
          >
            {order.address}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.flexRowJustifyBetween}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 13,
                color: colors.black,
              }}
            >
              {order.finalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              تومان
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 13,
                color: colors.secondaryTextColor,
              }}
            >
              مبلغ کل:
            </Text>
          </View>
          <View style={styles.flexRowJustifyBetween}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 13,
                color: colors.black,
              }}
            >
              {order.payed ? "پرداخت شده" : "پرداخت نشده"}
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 13,
                color: colors.secondaryTextColor,
              }}
            >
              وضعیت پرداخت:
            </Text>
          </View>
        </View>
        {order.state === "pending" && order.payed === false && (
          <View style={styles.sectionContainer}>
            {order.payed === false && (
              <React.Fragment>
                <Text
                  style={{
                    fontFamily: "primaryBold",
                    color: colors.danger,
                    lineHeight: 25,
                    fontSize: 16,
                    textAlign: "right",
                  }}
                >
                  مبلغ سفارش شما پرداخت نشده است.شما میتوانید با یکی از روش های
                  زیر اقدام به پرداخت هزینه سفارش کنید.
                </Text>

                <View
                  style={[
                    styles.flexRowJustifyBetween,
                    { justifyContent: "space-around", marginTop: 20 },
                  ]}
                >
                  {order.hasSettlePayment && bankAccounts && (
                    <AppButton
                      style={{ width: "45%" }}
                      value="کارت به کارت"
                      onPress={() => cartModalRef.current.open()}
                    />
                  )}
                  {order.hasOnlinePayment && paymentProviders && (
                    <AppButton
                      style={{ width: "45%" }}
                      value="پرداخت آنلاین"
                      onPress={() => {
                        if (paymentProviders.length > 1)
                          bankModalRef.current.open();
                        else if (paymentProviders.length === 1)
                          return handleOpenPayment(paymentProviders[0]);
                        else return alert("امکان پرداخت آنلاین وجود ندارد");
                      }}
                    />
                  )}
                </View>
              </React.Fragment>
            )}
          </View>
        )}
        <View style={styles.sectionContainer}>
          <Text
            style={{
              fontFamily: "primary",
              color: colors.secondaryTextColor,
              textAlign: "right",
            }}
          >
            {order.items.length} کالا
          </Text>
          <View
            style={[
              styles.progressBarContainer,
              {
                backgroundColor:
                  order.state === "returned" || order.state === "canceled"
                    ? colors.lightRed
                    : colors.lightGreen,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 20,
                color: order.state !== "returned" && order.state !== "canceled" ? colors.green : colors.danger,
                width: "100%",
                textAlign: "right",
                marginRight: "3.5%",
              }}
            >
              {persianStates.find((i) => i.en === order.state).fa}
            </Text>

            {order.state !== "returned" && order.state !== "canceled" && (
              <Progress.Bar
                width={null}
                progress={orderProgress}
                // indeterminate
                color={colors.green}
                unfilledColor={colors.midleLightGray}
                height={10}
                borderRadius={20}
                useNativeDriver={true}
                style={{ width: "100%" }}
              />
            )}
          </View>
          <View style={[styles.flexRowJustifyBetween, { marginVertical: 10 }]}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 13,
                color: colors.black,
              }}
            >
              {order.totalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              تومان
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 13,
                color: colors.secondaryTextColor,
              }}
            >
              جمع قیمت کالاهای مرسوله:
            </Text>
          </View>
          {order.items.map((item, index) => (
            <React.Fragment key={item.id.toString()}>
              <ProductCardInOrderDetail
                product={item}
                allowReview={false}
                showAddToCart={false}
              />
              {index !== order.items.length - 1 && (
                <Line style={{ marginVertical: 10 }} />
              )}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
      <Modalize ref={cartModalRef} adjustToContentHeight>
        <View
          style={{
            width: "100%",
            // height: (Dimensions.get("screen").height / 100) * 30,
            // maxHeight : "30%",
            backgroundColor: colors.white,
          }}
        >
          <BankCartSelector amount={order.finalPrice} accounts={bankAccounts} />
        </View>
      </Modalize>
      <Modalize ref={bankModalRef} adjustToContentHeight>
        <View
          style={{
            width: "100%",
            backgroundColor: colors.white,
            marginBottom : 15
          }}
        >
          <Text
            style={{
              fontFamily: "primaryBold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            درگاه مورد نظر خود را انتخاب کنید
          </Text>
          <PaymentProvidersSelector
            payments={paymentProviders}
            onPaymentPress={handleOpenPayment}
          />
        </View>
      </Modalize>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    flex: 1,
  },
  flexRowJustifyBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionContainer: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: "2.5%",
    marginBottom: 10,
    width: "97%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    borderRadius: 5,
  },
  lineSpace: {
    marginVertical: 20,
  },
  progressBarContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.superLightGray,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    // marginBottom: 20,
  },
});

export default OrderDetail;
