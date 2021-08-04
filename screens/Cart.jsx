import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

// Components import
import AppView from "../components/AppView/AppView";
import ProductInCartCard from "../components/ProductInCartCard";
import Line from "./../components/Line";
import AppButton from "./../components/Form/AppButton";

// utilitis import
import CartContext from "../cart/cartContext";
import colors from "../utilities/colors";
import pages from "./../navigation/routes";
import AuthContext from "./../auth/context";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { apiGetUserAddresses } from "../api/users";

const Cart = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cart, refreshCart } = useContext(CartContext);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [userAddresses, setUserAddresses] = useState();
  const { user } = useContext(AuthContext);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const userHasAddresses = async () => {
    try {
      const result = await apiGetUserAddresses();
      if (result.status === 200 && result.data.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      return true;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshCart();
    setRefreshing(false);
  };

  const handleGoToNextStep = async () => {
    setButtonLoading(true);
    await refreshCart();
    if (!user) {
      setButtonLoading(false);
      return navigation.navigate(pages.myAccount, { returnTo: pages.cart });
    } else if (user) {
      const hasAddress = await userHasAddresses();
      if (hasAddress) {
        console.log("to selectShippingMethos");
        setButtonLoading(false);
        return navigation.navigate(pages.selectShippingMethos);
      } else if (!hasAddress) {
        console.log("to addAddress");
        setButtonLoading(false);
        return navigation.navigate(pages.addAddress, {
          returnTo: pages.selectShippingMethos,
        });
      }
    }
  };

  // return (<AppView><Text>Error</Text></AppView>)

  // if (loading)
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: colors.white,
  //         alignItems: "center",
  //         justifyContent: "center",
  //         flex: 1,
  //       }}
  //     >
  //       <LottieView
  //         style={{ width: 200, height: 200 }}
  //         source={require("../assets/spinner.json")}
  //         autoPlay
  //         loop
  //       />
  //     </View>
  //   );
  if (cart && cart.items.length === 0) {
    // console.log("I'm here");
    return (
      <AppView isSAfe>
        <View
          style={{
            width: windowWidth,
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("../assets/emptyCart.json")}
            autoPlay
            loop
            style={{ width: "100%", height: "100%" }}
            autoSize
          />
        </View>
        <Text
          style={{
            fontFamily: "primaryBold",
            textAlign: "center",
            fontSize: 25,
          }}
        >
          سبد خرید شما خالی است
        </Text>
      </AppView>
    );
  } else if (cart && cart.items.length > 0)
    return (
      <AppView
        style={{
          backgroundColor: colors.white,
          paddingTop : getStatusBarHeight()
        }}
        // topSafe
      >
        <View
          style={{
            height: "90%",
            backgroundColor: colors.lightGray,
            // display: "flex",
            // alignItems: "center",
          }}
        >
          {cart && (
            <FlatList
              contentContainerStyle={{
                backgroundColor: colors.white,
              }}
              data={cart.items}
              keyExtractor={(i) => i.id.toString()}
              renderItem={({ item }) => <ProductInCartCard item={item} />}
              showsVerticalScrollIndicator={false}
              // ItemSeparatorComponent={Line}
              onRefresh={handleRefresh}
              refreshing={refreshing}
              ListFooterComponentStyle={{
                backgroundColor: colors.lightGray,
                flex: 1,
              }}
              ListFooterComponent={
                <View style={{ backgroundColor: colors.lightGray, flex: 1 }}>
                  <View
                    style={{
                      backgroundColor: colors.white,
                      marginTop: 25,
                      paddingHorizontal: 10,
                      paddingVertical: 20,
                      marginLeft: "1%",
                      width: "98%",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.23,
                      shadowRadius: 2.62,

                      elevation: 4,
                      borderRadius: 5,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "primary", color: colors.gray }}
                      >
                        {cart.items.length}کالا
                      </Text>
                      <Text style={{ fontFamily: "primaryBold", fontSize: 20 }}>
                        خلاصه سبد
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <Text style={{ fontFamily: "primaryBold" }}>
                        {cart.total
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        تومان{" "}
                      </Text>
                      <Text
                        style={{ fontFamily: "primary", color: colors.gray }}
                      >
                        قیمت کالاها
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "primaryBold",
                          color: colors.primaryColor,
                        }}
                      >
                        {(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        تومان{" "}
                      </Text>
                      <Text
                        style={{ fontFamily: "primary", color: colors.gray }}
                      >
                        تخفیف کالاها
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "primaryBold",
                          color: colors.black,
                        }}
                      >
                        {cart.total
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        تومان{" "}
                      </Text>
                      <Text
                        style={{ fontFamily: "primary", color: colors.gray }}
                      >
                        جمع سبد خرید
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 25,
                      display: "flex",
                      flexDirection: "row-reverse",
                      marginBottom: 10,
                      marginRight: "1%",
                      width: "98%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingRight: 20,
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
                    }}
                  >
                    <Ionicons
                      name="alert-circle-outline"
                      size={24}
                      color={colors.gray}
                    />
                    <Text
                      style={{
                        fontFamily: "primary",
                        color: colors.gray,
                        lineHeight: 25,
                        textAlign: "right",
                      }}
                    >
                      کالاهای موجود در سبد شما ثبت و رزرو نشده‌اند ، برای ثبت
                      سفارش مراحل بعدی را تکمیل کنید.
                    </Text>
                  </View>
                </View>
              }
            />
          )}
        </View>
        <View
          style={{
            height: "10%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.white,
          }}
        >
          <View style={{ marginLeft: "5%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.gray,
                  fontSize: 15,
                }}
              >
                مجموع
              </Text>
            </View>
            {cart && cart.total && (
              <Text style={{ fontFamily: "primaryBold", fontSize: 15 }}>
                {cart.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                تومان
              </Text>
            )}
          </View>
          <AppButton
            onPress={handleGoToNextStep}
            style={{ width: "40%", marginRight: "2.5%" }}
            value="ادامه فرآیند خرید"
            loading={buttonLoading}
          />
        </View>
      </AppView>
    );
  else
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
          loop
        />
      </View>
    );
};

export default Cart;
