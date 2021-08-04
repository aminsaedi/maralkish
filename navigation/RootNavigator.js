import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import pages from "./routes";
import AppNavigator from "./AppNavigator";
import ProductsNavigator from "./ProductsNavigator";
import Product from "../screens/Product";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import Images from "./../screens/Images";
import Reviews from "./../screens/Reviews";
import NewReview from "./../screens/NewReview";
import ProductDetails from "./../screens/ProductDetails";
import Search from "./../screens/Search";
import SpecialOffers from "./../components/SpecialOffers";
import AllSpecialOffers from "./../screens/AllSpecialOffers";
import colors from "../utilities/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Settings from "./../screens/Settings";
import Address from "../screens/Address";
import AddAddress from "./../screens/AddAddress";
import EditAddRess from "./../screens/EditAddress";
import PersoanlInfo from "./../screens/PersonalInfo";
import CartContext from "../cart/cartContext";
import SelectShippingAddress from "./../screens/SelectShippingAddress";
import ResetPassword from "./../screens/ResetPasswod";
import Messages from "./../screens/Messages";
import OrderDetail from "./../screens/OrderDetail";
import Invoice from "./../screens/Invoice";
import RegisteredOrder from "./../screens/RegisteredOrder";
import CustomerReviews from "./../screens/CustomerReviews";
import ContactUs from "./../screens/ContactUs";
import SudoMode from "./../screens/SudoMode";
import Translator from "../screens/Translator";
import OrderHistory from "./../screens/OrderHistory";
import Privacy from "./../screens/Privacy";
import TermOfUse from './../screens/TermOfUse';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { totalItems } = useContext(CartContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={pages.app}
        component={AppNavigator}
      />
      <Stack.Screen name={pages.sudoMode} component={SudoMode} />
      <Stack.Screen
        options={({ navigation, route }) => ({
          // gestureEnabled: true,
          headerTitle: null,
          headerLeft: (props) => (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                // position: "absolute",
              }}
              onPress={() => {
                navigation.navigate(pages.cart);
              }}
            >
              {totalItems > 0 && (
                <View
                  style={{
                    position: "absolute",
                    width: 17,
                    height: 17,
                    right: 0,
                    bottom: 10,
                    backgroundColor: colors.primaryColor,
                    borderRadius: 30,
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "primary",
                      color: colors.white,
                    }}
                  >
                    {totalItems.toString()}
                  </Text>
                </View>
              )}
              <Ionicons name="cart-outline" size={28} />
            </TouchableOpacity>
          ),
          headerRight: (props) => (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={28} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: colors.white,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            elevation: 0,
          },
          // cardShadowEnabled : false
        })}
        name={pages.product}
        component={Product}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerTitle: false,
          headerLeft: (props) => (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={28} />
            </TouchableOpacity>
          ),
          gestureEnabled: false,
        })}
        name={pages.images}
        component={Images}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerTitle: route.params.totalVoters + " دیدگاه",
          headerTitleStyle: {
            fontFamily: "primaryBold",
            alignSelf: "flex-end",
          },
          headerLeft: (props) => (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
              {...props}
            >
              <Ionicons name="close" size={28} />
            </TouchableOpacity>
          ),
        })}
        name={pages.reviews}
        component={Reviews}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerTitle: "ثبت دیدگاه جدید",
          headerTitleStyle: {
            fontFamily: "primaryBold",
            alignSelf: "flex-end",
          },
          headerLeft: (props) => (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
              {...props}
            >
              <Ionicons name="close" size={28} />
            </TouchableOpacity>
          ),
        })}
        name={pages.newReview}
        component={NewReview}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerTitle: "مشخصات فنی",
          headerTitleStyle: {
            fontFamily: "primaryBold",
            alignSelf: "flex-end",
          },
          headerLeft: (props) => (
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
              {...props}
            >
              <Ionicons name="close" size={28} />
            </TouchableOpacity>
          ),
        })}
        name={pages.details}
        component={ProductDetails}
      />
      <Stack.Screen
        name={pages.search}
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={pages.specialOffers}
        component={AllSpecialOffers}
        options={({ navigation, route }) => ({
          headerTitle: "پیشنهاد شگفت انگیز",
          headerTitleStyle: {
            fontFamily: "primaryBold",
            color: colors.white,
            fontSize: 25,
          },
          headerTitleAlign: "center",
          headerBackground: () => (
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.primaryColor,
              }}
            ></View>
          ),
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <MaterialCommunityIcons
                name="arrow-left"
                color={colors.white}
                size={35}
              />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate(pages.search)}>
              <MaterialCommunityIcons
                name="magnify"
                color={colors.white}
                size={35}
              />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: { paddingRight: 10 },
        })}
      />
      <Stack.Screen
        name={pages.settings}
        options={{
          headerTitle: "تنظیمات",
          headerTitleAlign: "center",
          headerBackTitle: "بازگشت",
          headerTitleStyle: { fontFamily: "primaryBold" },
          headerBackTitleStyle: { fontFamily: "primary" },
        }}
        component={Settings}
      />
      <Stack.Screen
        name={pages.addresses}
        options={{
          headerTitle: "آدرس ها",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          headerBackTitle: "بازگشت",
          headerBackTitleStyle: { fontFamily: "primary" },
        }}
        component={Address}
      />
      <Stack.Screen
        name={pages.addAddress}
        options={{
          headerShown: false,
        }}
        component={AddAddress}
      />
      <Stack.Screen
        name={pages.editAddress}
        options={{
          headerShown: false,
        }}
        component={EditAddRess}
      />
      <Stack.Screen
        name={pages.persoanlInfo}
        options={{
          headerTitle: "اطلاعات حساب کاربری",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          headerBackTitle: "اکانت من",
          headerBackTitleStyle: { fontFamily: "primary" },
        }}
        component={PersoanlInfo}
      />
      <Stack.Screen
        name={pages.selectShippingMethos}
        options={{
          headerTitle: "آدرس و زمان ارسال",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          headerBackTitle: "بازگشت",
          headerBackTitleStyle: { fontFamily: "primary" },
        }}
        component={SelectShippingAddress}
      />
      <Stack.Screen
        name={pages.resetPassword}
        options={{
          headerTitle: "بازیابی رمز عبور",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          headerBackTitle: "بازگشت",
          headerBackTitleStyle: { fontFamily: "primary" },
        }}
        component={ResetPassword}
      />
      <Stack.Screen
        name={pages.messages}
        options={{
          headerTitle: "پیام‌ها",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          headerBackTitleStyle: { fontFamily: "primary" },
          headerBackTitle: "بازگشت",
        }}
        component={Messages}
      />
      <Stack.Screen
        name={pages.orderDetail}
        options={{
          headerTitle: "جزئیات سفارش",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          headerBackTitleStyle: { fontFamily: "primary" },
          headerBackTitle: "بازگشت",
        }}
        component={OrderDetail}
      />
      <Stack.Screen
        name={pages.invoice}
        options={{
          headerTitle: "پیش‌فاکتور",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          headerBackTitleStyle: { fontFamily: "primary" },
          headerBackTitle: "بازگشت",
        }}
        component={Invoice}
      />
      <Stack.Screen
        name={pages.orderRegistered}
        options={{
          headerTitle: "سفارش شما ثبت شد",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          // headerBackTitleStyle: { fontFamily: "primary" },
          headerBackTitle: null,
          headerLeft: null,
        }}
        component={RegisteredOrder}
      />
      <Stack.Screen
        name={pages.cutomerReviews}
        options={{
          headerTitle: "نقد و نظرات",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          headerBackTitleStyle: { fontFamily: "primary" },
          headerBackTitle: "بازگشت",
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: colors.white,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            elevation: 0,
          },
        }}
        component={CustomerReviews}
      />
      <Stack.Screen
        name={pages.contactUs}
        options={({ navigation, route }) => ({
          headerTitle:
            route.params && route.params.title
              ? route.params.title
              : "تماس با ما",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          headerBackTitleStyle: { fontFamily: "primary" },
          headerBackTitle: "بازگشت",
        })}
        component={ContactUs}
      />
      <Stack.Screen
        name={pages.translator}
        options={{ headerShown: false }}
        component={Translator}
      />
      <Stack.Screen
        name={pages.orderHistory}
        options={{
          headerTitle: "سفارش های من",
          headerTitleStyle: { fontFamily: "primaryBold", textAlign: "right" },
          headerBackTitleStyle: { fontFamily: "primary" },
          headerBackTitle: "بازگشت",
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: colors.white,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            elevation: 0,
          },
        }}
        component={OrderHistory}
      />
      <Stack.Screen
        name={pages.privacy}
        options={{
          headerTitle: "حریم خصوصی",
          headerBackTitle: "بازگشت",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "primaryBold" },
          headerBackTitleStyle: { fontFamily: "primary" },
        }}
        component={Privacy}
      />
      <Stack.Screen
        name={pages.termOfUse}
        options={{
          headerTitle: "شرایط استفاده",
          headerBackTitle: "بازگشت",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: "primaryBold" },
          headerBackTitleStyle: { fontFamily: "primary" },
        }}
        component={TermOfUse}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
