import React, { useEffect, useState } from "react";

import { Text, Image, TouchableOpacity, Touchable } from "react-native";
import * as WebBrowser from "expo-web-browser";
import AppView from "../components/AppView/AppView";
import { apiGetLogo } from "../api/util";
import LottieView from "lottie-react-native";
import colors from "../utilities/colors";
import AppButton from "../components/Form/AppButton";
import * as Linking from "expo-linking";
import pages from "./../navigation/routes";

const Translator = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const localTeranlator = async () => {
    const data = await Linking.getInitialURL();
    if (data) {
      if (data.toString() === "https://saedi.profishop.ir/myAccount") {
        setLoading(false);
        navigation.popToTop();
        return navigation.navigate(pages.app, {
          screen: pages.myAccount,
        });
      } else if (data === "https://saedi.profishop.ir/home") {
        setLoading(false);
        navigation.popToTop();
        return navigation.push(pages.app, { screen: pages.home });
      } else if (data === "https://saedi.profishop.ir/orderDetail") {
        setLoading(false);
        const trackingId = data.split("/")[data.split("/").length - 1];
        navigation.popToTop();
        return navigation.push(pages.orderDetail, {
          trackingId,
        });
      } else if (data.includes("profishop://orderDetail")) {
        const trackingId = data.split("/")[data.split("/").length - 1];
        setLoading(false);
        navigation.popToTop();
        return navigation.push(pages.orderDetail, {
          trackingId,
        });
      } else {
        setLoading(false);
        return WebBrowser.openBrowserAsync(data);
      }
    }
    // if (route && route.params) {
    //   alert(Object.keys(route.params).toString());
    // }
  };

  const internalTransformer = async (internalUrl) => {
    if (internalUrl.includes("profishop://orderDetail")) {
      const trackingId =
        internalUrl.split("/")[internalUrl.split("/").length - 1];
      setLoading(false);
      navigation.popToTop();
      return navigation.push(pages.orderDetail, {
        trackingId,
      });
    }
  };
  useEffect(() => {
    Linking.addEventListener("url", ({ url }) => {
      internalTransformer(url);
    });
    localTeranlator();
    return () => {
      Linking.removeEventListener("url", ({ url }) => {
        internalTransformer(url);
      });
    };
  }, []);
  return (
    <AppView
      isSAfe
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: colors.seconadryColor,
        justifyContent: "space-around",
      }}
    >
      <Image
        source={{ uri: apiGetLogo }}
        style={{ width: "60%", height: 100 }}
        resizeMode="contain"
      />
      <Text
        style={{ fontFamily: "primaryBold", fontSize: 30, color: colors.black }}
      >
        خوش آمدید
      </Text>
      <LottieView
        source={require("../assets/translatorLoading.json")}
        style={{
          height: 300,
        }}
        autoPlay={true}
        loop
        // autoSize
      />
      <Text
        style={{
          fontFamily: "primary",
          fontSize: 15,
          color: colors.buttonTextColor,
          textAlign: "center",
          paddingHorizontal: 20,
          lineHeight: 25,
        }}
      >
        تا لحظاتی دیگر به صفحه مورد نظر هدایت میشوید. لطفا منتظر بمانید...
      </Text>
      <AppButton
        value="بازگشت به خانه"
        style={{ width: "80%" }}
        loading={loading}
        onPress={() => navigation.push(pages.app)}
      />
      <TouchableOpacity>
        <Text style={{ fontFamily: "primary", color: colors.white }}>
          بازکردن در مرورگر
        </Text>
      </TouchableOpacity>
    </AppView>
  );
};

export default Translator;
