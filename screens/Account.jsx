import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  Image,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import { getStatusBarHeight } from "react-native-status-bar-height";
import LottieView from "lottie-react-native";

// componets import
import AppView from "./../components/AppView/AppView";
import HorizentalLine from "./../components/HorizentalLine";
import Line from "./../components/Line";
import OrderStausIcon from "../components/OrderStatusIcon";
import AppInput from "./../components/Form/AppInput";
import AppInputError from "./../components/Form/AppInputError";
import AppButton from "./../components/Form/AppButton";

// utilities import
import colors from "../utilities/colors";
import pages from "../navigation/routes";
import regexs from "./../utilities/regex";
import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage";

// apis import
import {
  apiGetUserProfile,
  apiIsUserExists,
  apiSendOtp,
  apiOtpLogin,
  apiPasswordLogin,
  apiRegisterUser,
  apiGetMostPurchasedProducts,
  apiGetOrderHistory,
} from "../api/users";
import { apiGetLogo, apiGetStoreSettings } from "../api/util";
import MostpurchasedProducts from "../components/MostpurchasedProducts";

const orderStatues = [
  {
    id: 1,
    name: "در حال پردازش",
    value: "pending",
    icon: require("./../assets/orderStatuses/pending.png"),
  },
  {
    id: 2,
    name: "آماده به ارسال",
    value: "ready",
    icon: require("../assets/orderStatuses/readyToSend.png"),
  },
  {
    id: 3,
    name: "ارسال شده",
    value: "sent",
    icon: require("../assets/orderStatuses/sending.png"),
  },
  {
    id: 4,
    name: "توزیع شده",
    value: "rested",
    icon: require("../assets/orderStatuses/deliverd.png"),
  },
  {
    id: 5,
    name: "تکمیل شده",
    value: "done",
    icon: require("../assets/orderStatuses/finished.png"),
  },
  {
    id: 6,
    name: "بازگشتی",
    value: "returend",
    icon: require("../assets/orderStatuses/rejected.png"),
  },
  {
    id: 7,
    name: "انصرافی",
    value: "canceled",
    icon: require("../assets/orderStatuses/returned.png"),
  },
];

const options = [
  {
    id: 1,
    name: "اطلاعات حساب کاربری",
    icon: "person-outline",
    page: pages.persoanlInfo,
  },
  { id: 2, name: "آدرس ها", icon: "location-outline", page: pages.addresses },
  {
    id: 3,
    name: "نقد و نظرات",
    icon: "chatbox-outline",
    page: pages.cutomerReviews,
  },
];

const Account = ({ navigation, route }) => {
  const [apiResult, setApiResult] = useState();
  const [storeName, setStoreName] = useState("");
  const [loginType, setLoginType] = useState("mobile");
  const [loginStep, setLoginStep] = useState("login");
  const [username, setUsername] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [otpExpireTime, setOtpExpireTime] = useState(0);
  const [
    isAuthenticationRequiredOnRegister,
    setIsAuthenticationRequiredOnRegister,
  ] = useState(false);
  const [registerMetaData, setRegisterMetaData] = useState();
  const [mostPurchased, setMostPurchased] = useState();
  const [orderHistory, setOrderHistory] = useState();
  const [mobileChache, setMobileChache] = useState();
  const [emailChache, setEmailChache] = useState();
  const [loading, setLoading] = useState(false);
  const [intervalId, setIntervalId] = useState();
  // let intervalId;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getProfile(false);
    getHistory(false);
    setRefreshing(false);
  }, []);
  const { user, login, logout } = useAuth();

  const toPersian = (string) => {
    return string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (c) {
      return c.charCodeAt(0) & 0xf;
    });
  };

  const getHistory = async (shouldSetLoading = true) => {
    try {
      shouldSetLoading && setLoading(true);
      const result = await apiGetOrderHistory();
      shouldSetLoading && setLoading(false);
      if (result.status === 200) setOrderHistory(result.data);
    } catch (error) {
      shouldSetLoading && setLoading(false);
      console.log(error);
    }
  };

  const getStoreName = async () => {
    const result = await apiGetStoreSettings();
    if (result.status === 200 && result.data.faName) {
      setIsAuthenticationRequiredOnRegister(
        result.data.isAuthenticationRequiredOnRegister
      );
      setStoreName(result.data.faName);
    }
  };

  const getProfile = async (shouldSetLoading = true) => {
    try {
      if (user) {
        // logout();
        shouldSetLoading && setLoading(true);
        const result = await apiGetUserProfile();
        // console.log(result.data)
        if (result.status === 200) setApiResult(result.data);
        shouldSetLoading && setLoading(false);
      }
    } catch (error) {
      console.log("Error happened", error, error.response);
    }
  };

  const getMostPurchasedProducts = async () => {
    if (user) {
      try {
        const result = await apiGetMostPurchasedProducts();
        if (result.status === 200) setMostPurchased(result.data);
      } catch (error) {}
    } else return;
  };

  useEffect(() => {
    if (otpExpireTime > 0) {
      setTimeout(() => {
        setOtpExpireTime(otpExpireTime - 1);
      }, 1000);
    }
  }, [otpExpireTime]);

  const handleCheckIsUserExists = async (values, { resetForm }) => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      const result = await apiIsUserExists(values.username);
      if (result.status === 200) {
        if (loginType === "mobile") {
          let otpResult;
          try {
            otpResult = await apiSendOtp({ username: values.username });
            if (otpResult.status === 200) {
              const otpTime = moment(otpResult.data.expireTime);
              const nowTime = moment();
              setOtpExpireTime(otpTime.diff(nowTime, "seconds"));
              console.log(otpTime.diff(nowTime, "seconds"));
              // const intervalId = setInterval(() => {
              //   // if (otpExpireTime > 1) setOtpExpireTime(otpExpireTime - 1);
              //   // else if (otpExpireTime <= 0) clearInterval(intervalId);
              //   console.log("Tick Tock", typeof otpExpireTime, otpExpireTime);
              // }, 1000);
              // setIntervalId(intervalId);
              setUsername(values.username);
              resetForm();
              setLoginStep("otp");
            }
          } catch (error) {
            if (error.response.status === 429) {
              setLoading(false);
              alert(error.response.data);
            } else alert("خطا در ارسال رمز یکبارمصرف");
            // console.log(error)
            // if (otpResult && otpResult.status === 429)
            //   return Alert.alert(otpResult.data[0]);
          }
        } else if (loginType === "email") {
          setUsername(values.username);
          resetForm();
          setLoginStep("password");
        }
      }
      setLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        setLoading(false);
        if (loginType === "mobile") setMobileChache(values.username);
        if (loginType === "email") setEmailChache(values.username);
        setLoginStep("register");
      }
    }
  };

  const handleCheckOtp = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const result = await apiOtpLogin({
        username: username,
        password: values.otp,
      });
      if (result.status === 200 && result.data.success === true) {
        // setLoginStep("login");
        clearInterval(intervalId);
        resetForm();
        login(result.data.accessToken, result.data.refreshToken);
        if (route.params && route.params.returnTo) {
          return navigation.navigate(route.params.returnTo);
        }
      } else if (result.status === 403) {
        Alert.alert(result.data[0].toString());
      }
      setLoading(false);
    } catch (error) {
      alert(error?.response?.data?.toString() || "خطا در ورود");
      setLoading(false);
    }
    resetForm();
    // setLoginStep("login");
  };

  const handleCheckPassword = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const result = await apiPasswordLogin({
        username,
        password: values.password,
      });
      if (result.status === 200) {
        // setLoginStep("login");
        resetForm();
        login(result.data.accessToken, result.data.refreshToken);
        if (route.params && route.params.returnTo) {
          return navigation.navigate(route.params.returnTo);
        }
      } else if (result.status === 403) {
        alert(result.data[0].toString());
        // setLoginStep("login");
      }
      setLoading(false);
    } catch (error) {
      alert(error?.response?.data?.toString() || "خطا در ورود");
      setLoading(false);
    }
    // setLoginStep("login");
  };

  const handleRegister = async (values, { resetForm }) => {
    console.log(
      "handleRegister",
      isAuthenticationRequiredOnRegister === true ? " with otp" : "without otp"
    );
    setRegisterMetaData(values);
    if (isAuthenticationRequiredOnRegister === true) {
      setLoading(true);
      try {
        const otpResult = await apiSendOtp({ username: values.mobile });
        if (otpResult.status === 200) {
          setLoading(false);
          return setLoginStep("registerOtp");
        }
      } catch (error) {
        if (error?.response?.data) {
          setLoading(false);
          alert(error?.response?.data);
        } else {
          setLoading(false);
          alert("خطایی رخ داد");
          console.log(error.response.data);
        }
      }
    } else {
      try {
        const result = await apiRegisterUser(values);
        if (result.status === 200 && result.data.success === true) {
          resetForm();
          login(result.data.accessToken, result.data.refreshToken);
          if (route.params && route.params.returnTo) {
            return navigation.navigate(route.params.returnTo);
          }
          // ime login to register user and importantly  set tokens
        }
      } catch (error) {
        if (error?.response?.data) {
          alert(error?.response?.data);
        }
        alert("خطا در ثبت نام");
      }
    }
  };

  const handleRegisterWithOtp = async (values, { resetForm }) => {
    console.log("handleRegisterWithOtp", {
      ...registerMetaData,
      ...{ otp: values.otp },
    });
    try {
      const result = await apiRegisterUser({
        ...registerMetaData,
        ...{ otp: values.otp },
      });
      if (result.status === 200 && result.data.success === true) {
        resetForm();
        login(result.data.accessToken, result.data.refreshToken);
        if (route.params && route.params.returnTo) {
          return navigation.navigate(route.params.returnTo);
        }
        // ime login to register user and importantly  set tokens
      }
    } catch (error) {
      console.log(error?.response?.data?.toString());
      alert(error.response?.data?.toString() || error);
    }
  };

  const mobileValidationSchema = yup.object().shape({
    username: yup
      .string()
      .required("شماره موبایل خود را وارد کنید")
      .matches(regexs.emailOrMobileValidate, "مقدار ورودی معتبر نیست"),
  });

  const registerValidationSchema = yup.object().shape({
    firstName: yup.string().required("نام خود را وارد کنید"),
    lastName: yup.string().required("نام خانوادگی خود را وارد کنید"),
    mobile: yup
      .string()
      .required("شماره موبایل خود را وارد کنید")
      .matches(regexs.mobile, "شماره موبایل معتبر نیست"),
    email: yup
      .string()
      .required("پست الکترونیک خود را وارد کنید")
      .matches(regexs.email, "آدرس ایمیل معتبر نیست"),
    password: yup
      .string()
      .required("کلمه عبور خود را وارد کنید")
      .min(4, "حداقل طول ۴ کاراکتر است"),
  });

  const checkExistsForm = useFormik({
    initialValues: { username: "" },
    onSubmit: handleCheckIsUserExists,
    validationSchema: mobileValidationSchema,
  });

  const checkOtpForm = useFormik({
    initialValues: { otp: "" },
    onSubmit: handleCheckOtp,
  });

  const checkPasswordForm = useFormik({
    initialValues: { password: "" },
    onSubmit: handleCheckPassword,
  });

  const registerForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: mobileChache,
      email: emailChache,
      password: "",
    },
    onSubmit: handleRegister,
    validationSchema: registerValidationSchema,

    enableReinitialize: true,
  });

  const checkRegisterOtpForm = useFormik({
    initialValues: { otp: "" },
    onSubmit: handleRegisterWithOtp,
  });

  useEffect(() => {
    // logout()
    getStoreName();
  }, []);

  useEffect(() => {
    setLoginStep("login");
    if (user) {
      getProfile();
      getMostPurchasedProducts();
      getHistory();
    }
  }, [user]);

  // return (
  //   <AppView isSAfe>
  //     <Text>
  //       Error {Object.keys(user).toString()}{" "}
  //       {authStorage.getRefreshToken().toString()}{" "}
  //     </Text>
  //     <AppButton
  //       value="clean up"
  //       onPress={() => {
  //         authStorage.removeTokens();
  //       }}
  //     />
  //   </AppView>
  // );

  if (loading) {
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
  }

  if (user && apiResult)
    return (
      <AppView topSafe >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <View
              style={[
                styles.flexRow,
                { justifyContent: "space-between", paddingHorizontal: 20 },
              ]}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate(pages.messages)}
                disabled={true}
              >
                <Ionicons
                  name="notifications-outline"
                  size={25}
                  color={colors.gray}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate(pages.settings)}
              >
                <Ionicons
                  name="settings-outline"
                  size={25}
                  color={colors.black}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.flexColAllCenter,
                { width: "100%", marginTop: 20 },
              ]}
            >
              <Ionicons name="person-outline" size={100} color={colors.gray} />
              <Text style={{ fontFamily: "primaryBold", fontSize: 17 }}>
                {apiResult.firstName + " " + apiResult.lastName}
              </Text>
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.gray,
                  marginBottom: 5,
                }}
              >
                {apiResult.mobile}
              </Text>
            </View>
          </View>
          <View style={styles.blankGray} />
          <View>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 17,
                textAlign: "right",
                marginRight: 10,
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              سفارش های من
            </Text>
            <FlatList
              data={orderStatues}
              horizontal
              inverted
              showsHorizontalScrollIndicator={false}
              keyExtractor={(i) => i.id.toString()}
              renderItem={({ item, index }) => (
                <OrderStausIcon
                  item={item}
                  badge={
                    orderHistory
                      ?.filter((i) => i.state === item.value)
                      .length.toString() || -1
                  }
                  onPress={() => navigation.push(pages.orderHistory, { index })}
                />
              )}
              ItemSeparatorComponent={HorizentalLine}
            />
            {options.map((item) => (
              <TouchableOpacity
                style={styles.optionsStyle}
                key={item.id.toString()}
                onPress={() => navigation.navigate(item.page)}
              >
                <Ionicons name={item.icon} size={25} color={colors.black} />
                <Text
                  style={{
                    fontFamily: "primaryBold",
                    flex: 1,
                    marginRight: 20,
                    textAlign: "right",
                  }}
                >
                  {item.name}
                </Text>
                <Ionicons name="chevron-back" size={20} color={colors.gray} />
              </TouchableOpacity>
            ))}
            <MostpurchasedProducts mostPurchased={mostPurchased} />
          </View>
        </ScrollView>
      </AppView>
    );
  else if (!user) {
    {
      // setLoginStep("login");
      return (
        <React.Fragment>
          {loginStep === "login" && (
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
              <View
                style={[
                  styles.flexRow,
                  {
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    marginTop: getStatusBarHeight(),
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(pages.home)}
                >
                  <Ionicons name="close" size={25} color={colors.black} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate(pages.settings)}
                >
                  <Ionicons
                    name="settings-outline"
                    size={25}
                    color={colors.black}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  // backgroundColor : "red",
                  // width : "100%"
                }}
              >
                <View style={{ width: "100%", height: 75, marginTop: "35%" }}>
                  <Image
                    source={{ uri: apiGetLogo }}
                    resizeMode="contain"
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
                <View style={{ width: "95%", marginTop: "30%" }}>
                  <Text
                    style={{
                      fontFamily: "primary",
                      textAlign: "right",
                      lineHeight: 28,
                    }}
                  >
                    برای ورود و یا ثبت نام در {storeName} شماره موبایل یا پست
                    الکترونیک خود را وارد نمایید
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignSelf: "flex-end",
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    <TouchableOpacity onPress={() => setLoginType("mobile")}>
                      <Text
                        style={{
                          fontFamily: "primary",
                          color:
                            loginType === "mobile"
                              ? colors.primaryColor
                              : colors.black,
                          textDecorationLine:
                            loginType === "mobile" ? "underline" : undefined,
                        }}
                      >
                        ورود با موبایل
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setLoginType("email")}
                      style={{ marginRight: 10 }}
                    >
                      <Text
                        style={{
                          fontFamily: "primary",
                          color:
                            loginType === "email"
                              ? colors.primaryColor
                              : colors.black,
                          textDecorationLine:
                            loginType === "email" ? "underline" : undefined,
                        }}
                      >
                        ورود با ایمیل
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <AppInput
                    placeholder={
                      loginType === "mobile" ? "شماره موبایل" : "پست الکترونیک"
                    }
                    style={{ marginBottom: 5 }}
                    textAlign="right"
                    lable="username"
                    onChangeText={(input) => {
                      checkExistsForm.handleChange("username")(
                        toPersian(input)
                      );
                    }}
                    value={checkExistsForm.values.username}
                    onEndEditing={checkExistsForm.submitForm}
                    // autoFocus
                    autoCompleteType={loginType === "mobile" ? "tel" : "email"}
                    keyboardType={
                      loginType === "mobile" ? "number-pad" : "default"
                    }
                  />
                  <AppInputError
                    style={{ marginBottom: 10 }}
                    error={
                      checkExistsForm.errors.username &&
                      checkExistsForm.touched.username &&
                      checkExistsForm.errors.username
                    }
                  />
                  <AppButton
                    onPress={checkExistsForm.submitForm}
                    value={`ورود به ${storeName}`}
                    style={{ marginBottom: 20 }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "primary",
                      fontSize: 12,
                      lineHeight: 20,
                    }}
                  >
                    با ورود و یا ثبت نام در {storeName} شما شرایط و قوانین
                    استفاده ار سرویس های سایت {storeName} و قوانین حریم خصوصی آن
                    را میپذیرید
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
          )}
          {loginStep === "otp" && (
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "95%",
                  marginLeft: "2.5%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "primary",
                    marginBottom: 20,
                    marginTop: "70%",
                  }}
                >
                  رمز ارسال شده به شماره موبایل خود را وارد کنید
                </Text>
                <AppInput
                  label="otp"
                  value={checkOtpForm.values.otp}
                  onChangeText={(input) =>
                    checkOtpForm.handleChange("otp")(toPersian(input))
                  }
                  onEndEditing={checkOtpForm.handleSubmit}
                  maxLength={6}
                  textContentType="oneTimeCode"
                  placeholder="کد یکبار مصرف"
                  textAlign="center"
                  style={{ marginBottom: 20 }}
                  keyboardType="number-pad"
                />
                {otpExpireTime > 0 ? (
                  <Text style={{ textAlign: "center", fontFamily: "primary" }}>
                    کد تا {otpExpireTime} ثانیه دیگر انقضا میشود
                  </Text>
                ) : (
                  <Text style={{ textAlign: "center", fontFamily: "primary" }}>
                    کد انقضا شده است
                  </Text>
                )}
                <Text
                  style={{
                    fontFamily: "primary",
                    color: colors.primaryColor,
                    marginBottom: 20,
                    textAlign: "right",
                    alignSelf: "flex-end",
                  }}
                  onPress={() => setLoginStep("password")}
                >
                  ورود با رمز عبور
                </Text>
                <AppButton
                  value={`ورود به ${storeName}`}
                  onPress={checkOtpForm.submitForm}
                  style={{ marginBottom: 40 }}
                />
              </View>
            </KeyboardAwareScrollView>
          )}
          {loginStep === "password" && (
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "95%",
                  marginLeft: "2.5%",
                }}
              >
                <AppInput
                  placeholder="رمز عبور"
                  value={checkPasswordForm.values.password}
                  onChangeText={checkPasswordForm.handleChange("password")}
                  secureTextEntry
                  style={{ marginBottom: 50, marginTop: "50%" }}
                />
                <AppButton
                  value={`ورود به ${storeName}`}
                  onPress={checkPasswordForm.handleSubmit}
                  onLongPress={() => setLoginStep("login")}
                  style={{ marginBottom: 50 }}
                />
              </View>
            </KeyboardAwareScrollView>
          )}
          {loginStep === "register" && (
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "95%",
                  marginLeft: "2.5%",
                  marginTop: getStatusBarHeight(),
                }}
              >
                <AppInput
                  value={registerForm.values.firstName}
                  onChangeText={registerForm.handleChange("firstName")}
                  placeholder="نام"
                  style={{ marginBottom: 20, marginTop: "30%" }}
                  textContentType="name"
                />
                <AppInputError
                  style={{ marginBottom: 10 }}
                  error={
                    registerForm.errors.firstName &&
                    registerForm.touched.firstName &&
                    registerForm.errors.firstName
                  }
                />
                <AppInput
                  value={registerForm.values.lastName}
                  onChangeText={registerForm.handleChange("lastName")}
                  placeholder="نام خانوادگی"
                  style={{ marginBottom: 20 }}
                  textContentType="familyName"
                />
                <AppInputError
                  style={{ marginBottom: 10 }}
                  error={
                    registerForm.errors.lastName &&
                    registerForm.touched.lastName &&
                    registerForm.errors.lastName
                  }
                />
                <AppInput
                  value={registerForm.values.mobile}
                  onChangeText={(input) =>
                    registerForm.handleChange("mobile")(toPersian(input))
                  }
                  placeholder="شماره موبایل"
                  style={{ marginBottom: 20 }}
                  keyboardType="number-pad"
                  textContentType="telephoneNumber"
                />
                <AppInputError
                  style={{ marginBottom: 10 }}
                  error={
                    registerForm.errors.mobile &&
                    registerForm.touched.mobile &&
                    registerForm.errors.mobile
                  }
                />
                <AppInput
                  value={registerForm.values.email}
                  onChangeText={registerForm.handleChange("email")}
                  placeholder="پست الکترونیک"
                  style={{ marginBottom: 20 }}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
                <AppInputError
                  style={{ marginBottom: 10 }}
                  error={
                    registerForm.errors.email &&
                    registerForm.touched.email &&
                    registerForm.errors.email
                  }
                />
                <AppInput
                  value={registerForm.values.password}
                  onChangeText={registerForm.handleChange("password")}
                  placeholder="رمز عبور"
                  style={{ marginBottom: 40 }}
                  secureTextEntry
                  textContentType="newPassword"
                />
                <AppInputError
                  style={{ marginBottom: 10 }}
                  error={
                    registerForm.errors.password &&
                    registerForm.touched.password &&
                    registerForm.errors.password
                  }
                />
                <AppButton
                  value={`ثبت نام در ${storeName}`}
                  onPress={registerForm.handleSubmit}
                  style={{ marginBottom: 50 }}
                />
              </View>
            </KeyboardAwareScrollView>
          )}
          {loginStep === "registerOtp" && (
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "95%",
                  marginLeft: "2.5%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "primary",
                    marginBottom: 20,
                    marginTop: "70%",
                  }}
                >
                  رمز ارسال شده به شماره موبایل خود را وارد کنید
                </Text>
                <AppInput
                  label="otp"
                  value={checkRegisterOtpForm.values.otp}
                  onChangeText={(input) =>
                    checkRegisterOtpForm.handleChange("otp")(toPersian(input))
                  }
                  onEndEditing={checkRegisterOtpForm.handleSubmit}
                  maxLength={6}
                  textContentType="oneTimeCode"
                  placeholder="کد یکبار مصرف"
                  textAlign="center"
                  style={{ marginBottom: 20 }}
                  keyboardType="number-pad"
                />
                {otpExpireTime > 0 ? (
                  <Text style={{ textAlign: "center", fontFamily: "primary" }}>
                    کد تا {otpExpireTime} ثانیه دیگر انقضا میشود
                  </Text>
                ) : (
                  <Text style={{ textAlign: "center", fontFamily: "primary" }}>
                    کد انقضا شده است
                  </Text>
                )}
                <AppButton
                  value={`ثبت نام در ${storeName}`}
                  onPress={checkRegisterOtpForm.submitForm}
                  style={{ marginBottom: 40 }}
                />
              </View>
            </KeyboardAwareScrollView>
          )}
        </React.Fragment>
      );
    }
  } else
    return (
      <AppView isSAfe>
        <Text style={{ fontFamily: "primary", textAlign: "center" }}>
          درحال خواندن حافظه
        </Text>
        <AppButton
          value="پاک کردن حافظه"
          onPress={() => {
            authStorage.removeTokens();
          }}
        />
      </AppView>
    );
};

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  flexColAllCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  blankGray: {
    width: "100%",
    height: 10,
    backgroundColor: colors.lightGray,
  },
  optionsStyle: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default Account;
