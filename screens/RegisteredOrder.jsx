import React, { useState, useEffect, useCallback } from "react";
import * as Clipboard from "expo-clipboard";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  BackHandler,
} from "react-native";
import LottieView from "lottie-react-native";
import colors from "../utilities/colors";
import AppButton from "./../components/Form/AppButton";
import pages from "./../navigation/routes";
import { useFocusEffect } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { FontAwesome5 } from "@expo/vector-icons";

const RegisteredOrder = ({ navigation, route }) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(pages.home);
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  // ...

  const availablePaymentMethods = [
    {
      id: 1,
      name: "پرداخت در محل",
      action: "navigateToHomeScreen",
      buttonValue: "پراداخت در محل",
      icon: "money-bill",
    },
    {
      id: 2,
      name: "پرداخت آنلاین",
      action: "openBrowser",
      buttonValue: "پرداخت آنلاین",
      icon: "shipping-fast",
    },
    {
      id: 3,
      name: "کارت به کارت",
      action: "showCartNumber",
      buttonValue: `مبلغ ${route.params?.totalPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان \n \n نمایش شماره کارت`,
      icon: "credit-card",
    },
  ];

  const calculateAvailablePaymentMethods = () => {
    console.log(
      route.params.hasCashOnDeliveryPayment,
      route.params.hasOnlinePayment,
      route.params.hasSettlePayment
    );
    if (
      route.params.hasCashOnDeliveryPayment &&
      route.params.hasOnlinePayment &&
      route.params.hasSettlePayment
    ) {
      setActiveMethod(availablePaymentMethods[1]);
      setMethods([...availablePaymentMethods]);
    } else if (
      route.params.hasCashOnDeliveryPayment &&
      route.params.hasOnlinePayment &&
      !route.params.hasSettlePayment
    ) {
      setActiveMethod(availablePaymentMethods[1]);
      setMethods([availablePaymentMethods[0], availablePaymentMethods[1]]);
    } else if (
      route.params.hasCashOnDeliveryPayment &&
      !route.params.hasOnlinePayment &&
      route.params.hasSettlePayment
    ) {
      setActiveMethod(availablePaymentMethods[0]);
      setMethods([availablePaymentMethods[0], availablePaymentMethods[2]]);
    } else if (
      !route.params.hasCashOnDeliveryPayment &&
      route.params.hasOnlinePayment &&
      route.params.hasSettlePayment
    ) {
      setActiveMethod(availablePaymentMethods[1]);
      setMethods([availablePaymentMethods[1], availablePaymentMethods[2]]);
    }
  };

  const [methods, setMethods] = useState();
  const [activeMethod, setActiveMethod] = useState();

  useEffect(() => {
    calculateAvailablePaymentMethods();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const handlePressButton = async () => {
    // console.log(activeMethod)
    if (activeMethod.id === 3) {
      Alert.alert(
        `مبلغ ${route.params?.totalPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`,
        "لطفا هزینه سفارش خود را به شماره کارت 432423 به نام امین ساعدی واریز کنید. \n \n شماره کارت در کلیپ بورد کپی شود؟",
        [
          {
            text: "کپی شماره کارت",
            style: "default",
            onPress: () => {
              // Clipboard.default.setString("6104337649737374");
              Clipboard.setString("6104337649737374");
            },
          },
          {
            text: "بیخیال",
            style: "cancel",
          },
        ]
      );
    } else if (activeMethod.id === 2) {
      return Linking.openURL("https://gooldshop.ir");
    } else if (activeMethod.id === 1) return navigation.navigate(pages.home);
  };

  return (
    <View style={{ width: "100%", height: "100%", paddingHorizontal: 15 }}>
      <Text
        style={{ fontFamily: "primary", textAlign: "center", marginTop: "5%" }}
      >
        کد رهگیری سفارش : {route.params.uniqueId}
      </Text>
      <View
        style={{
          width: "100%",
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottieView
          source={require("../assets/doneTick.json")}
          autoPlay
          loop={false}
          style={{ height: 150 }}
          autoSize
        />
      </View>
      <Text
        style={{
          fontFamily: "primaryBold",
          textAlign: "right",
          fontSize: 17,
          color: colors.green,
        }}
      >
        سفارش شما با موفقیت ثبت گریدید
      </Text>
      <Text
        style={{ fontFamily: "primary", textAlign: "right", marginTop: 10 }}
      >
        شما میتوانید با یکی از روش های زیر هزینه سفارش خود را پرداخت کنید
      </Text>
      <View style={{ width: "100%", height: 100, marginTop: 20 }}>
        <FlatList
          data={methods}
          keyExtractor={(i) => i.id.toString()}
          horizontal
          inverted
          centerContent
          contentContainerStyle={{ flex: 1, justifyContent: "center" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                marginLeft: 10,
                borderRadius: 10,
                borderColor:
                  item.id === activeMethod.id
                    ? colors.seconadryColor
                    : colors.gray,
                borderWidth: item.id === activeMethod.id ? 5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setActiveMethod(item)}
            >
              <FontAwesome5
                color={colors.primaryColor}
                size={40}
                name={item.icon}
              />
              <Text style={{ fontFamily: "primary", textAlign: "center" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <AppButton
        value={activeMethod?.buttonValue}
        style={{ marginTop: 20, height: 100 }}
        onPress={handlePressButton}
        fontSize={20}
      />
      <AppButton
        value="بازگشت به خانه"
        onPress={() => navigation.navigate(pages.home)}
        style={{ marginTop: 20 }}
        outline
      />
    </View>
  );
};

export default RegisteredOrder;
