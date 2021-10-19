import "react-native-gesture-handler";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { apiCreateCart, apiGetCart } from "./api/cart";
import { getCartId, setCartId } from "./cart/cartStorage";
import { Platform, I18nManager } from "react-native";
import { useFonts } from "expo-font";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import * as Updates from "expo-updates";
import * as Device from "expo-device";
import AppLoading from "expo-app-loading";
import AuthContext from "./auth/context";
import authStorage from "./auth/storage";
import CartContext from "./cart/cartContext";
import colors from "./utilities/colors";
import Constants from "expo-constants";
import React, { useEffect, useRef, useState } from "react";
import RootNavigator from "./navigation/RootNavigator";
import { apiGetStoreSettings } from "./api/util";
import StoreSettingContext from "./utilities/storeSettingContext";
import { setNoficationToken } from "./utilities/notificationTokenStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  handleBackgroundNotification,
  handleForegroundNotifications,
} from "./utilities/notificationHandler";
import sendDeviceInfo from "./utilities/sendDeviceInfo";

export default function App() {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const navigationRef = useRef();
  const [user, setUser] = useState();
  const [cart, setCart] = useState();
  const [storeSetting, setStoreSetting] = useState("test");
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);
  const [fontsLoaded, errorFonts] = useFonts({
    primary: require("./assets/fonts/iranYekanRegular.ttf"),
    primaryBold: require("./assets/fonts/iranYekanBold.ttf"),
    primaryBlack: require("./assets/fonts/iranYekanBlack.ttf"),
  });

  const getStoreSetting = async () => {
    try {
      const result = await apiGetStoreSettings();
      if (result.status === 200) setStoreSetting(result.data);
    } catch (error) {
      return;
    }
  };

  const restoreUser = async () => {
    const decodedUser = await authStorage.getCurrentUser();
    if (decodedUser) setUser(decodedUser);
  };

  const restoreCart = async () => {
    const cartId = await getCartId();
    if (!cartId) {
      const createApiResult = await apiCreateCart();
      if (createApiResult.status === 200) {
        await setCartId(createApiResult.data.uniqueId);
        const apiGetNewCreatedCartResult = await apiGetCart(
          createApiResult.data.uniqueId
        );
        if (apiGetNewCreatedCartResult.status === 200) {
          setCart(apiGetNewCreatedCartResult.data);
          return apiGetNewCreatedCartResult.data;
        }
      }
    } else if (cartId) {
      // console.log("Restoring cart : ", cartId);
      // setCart(null);
      const getCartApiResult = await apiGetCart(cartId);
      if (getCartApiResult.status === 200) {
        setCart(getCartApiResult.data);
        return getCartApiResult.data;
      }
    }
  };

  const handleTotalItemsInCart = () => {
    let total = 0;
    if (cart) {
      cart.items.forEach((item) => (total += item.quantity));
      setTotalItemsInCart(total);
    }
  };

  const handleCheckForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        alert("نسخه جدیدی در دسترس است");
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        await Updates.reloadAsync();
      }
    } catch (e) {
      // console.log(es);
      // alert("خطا در بروزرسانی برنامه");
      // handle or log error
    }
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  const notificationListener = useRef();
  // const responseListener = useRef();
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("دریافت توکن نوتیفیکشن شکست خورد");
        return;
      }
      // token = (await Notifications.getExpoPushTokenAsync()).data;
      token = (await Notifications.getDevicePushTokenAsync()).data;
      // alert(token);
      console.log(token);
    } else {
      alert("امکان استفاده از نوتیفیکشن در این دستگاه وجود ندارد");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("orderStatus", {
        name: "تغیر وضعیت سفارش",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) AsyncStorage.setItem("notificationToken", token);
      sendDeviceInfo(token, Device);
    });

    // While app is running
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        handleForegroundNotifications(
          notification.request.content,
          navigationRef.current
        );
      });

    // this method will be called whenever a user interacts with a notification (eg. taps on it).
    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     alert("Back notif")
    //     handleBackgroundNotification(response.notification.request.content,navigationRef.current);
    //   });
    restoreUser();
    restoreCart();
    getStoreSetting();
    handleCheckForUpdates();
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      // Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    // console.log(lastNotificationResponse);
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content &&
      lastNotificationResponse.actionIdentifier ===
      Notifications.DEFAULT_ACTION_IDENTIFIER &&
      navigationRef &&
      navigationRef.current
    ) {
      // alert(
      //   JSON.stringify(lastNotificationResponse.notification.request.content)
      // );
      handleBackgroundNotification(
        lastNotificationResponse.notification.request.content,
        navigationRef.current
      );
    }
  }, [lastNotificationResponse, navigationRef.current]);

  useEffect(() => {
    handleTotalItemsInCart();
  }, [cart]);

  if (!fontsLoaded) return <AppLoading />;

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.white,
    },
  };

  const prefix = Linking.createURL("/");

  const linking = {
    prefixes: ["https://gooldshop.ir", prefix],
    // prefixes: [prefix],
    config: {
      screens: {
        TRANSLATOR: "*",
      },
    },
    // subscribe(listener) {
    //   const onReceiveURL = ({ url }) => listener(url);

    //   // Listen to incoming links from deep linking
    //   // Linking.addEventListener("url", onReceiveURL);

    //   // Listen to expo push notifications
    //   const subscription =
    //     Notifications.addNotificationResponseReceivedListener((response) => {
    //       const data = response.notification.request.content;

    //       // Any custom logic to see whether the URL needs to be handled
    //       //...
    //       navigationRef.current.navigate("MY_ACCOUNT");

    //       // Let React Navigation handle the URL
    //       listener(url);
    //     });

    //   return () => {
    //     // Clean up the event listeners
    //     // Linking.removeEventListener("url", onReceiveURL);
    //     subscription.remove();
    //   };
    // },
  };

  // console.log(storeSetting)

  try {
    I18nManager.allowRTL(false);
  } catch (error) {
    console.log(error);
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <StoreSettingContext.Provider value={storeSetting}>
        <CartContext.Provider
          value={{
            cart,
            setCart,
            refreshCart: restoreCart,
            totalItems: totalItemsInCart,
          }}
        >
          <NavigationContainer
            linking={linking}
            theme={MyTheme}
            ref={navigationRef}
          >
            {/* <Sentry.TouchEventBoundary> */}
            <RootNavigator />
            {/* </Sentry.TouchEventBoundary> */}
          </NavigationContainer>
        </CartContext.Provider>
      </StoreSettingContext.Provider>
    </AuthContext.Provider>
  );
}
