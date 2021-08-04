import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Keyboard,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import LottieView from "lottie-react-native";

import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";

// components import
import AppButton from "../../components/Form/AppButton";
import AppView from "../../components/AppView/AppView";
import AppInput from "../../components/Form/AppInput";

// Apis import
import { apiGetLogo, apiGetStoreSettings } from "../../api/util";
import {
  apiIsUserExists,
  apiSendOtp,
  apiOtpLogin,
  apiPasswordLogin,
  apiRegisterUser,
} from "../../api/users";

import colors from "../../utilities/colors";
import authStorage from "../../auth/storage";
import regexs from "./../../utilities/regex";
import AppInputError from "../../components/Form/AppInputError";
import useAuth from "./../../auth/useAuth";
import StoreSettingContext from "../../utilities/storeSettingContext";

const LoginModal = ({ visible, onRequestClose, onFinish }) => {
  const [loginStep, setLoginStep] = useState("login");
  const [loginType, setLoginType] = useState("mobile");
  const [username, setUsername] = useState("");
  const [registerMetaData, setRegisterMetaData] = useState();

  const [otpExpireTime, setOtpExpireTime] = useState();
  const [
    isAuthenticationRequiredOnRegister,
    setIsAuthenticationRequiredOnRegister,
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [intervalId, setIntervalId] = useState();
  const { faName } = useContext(StoreSettingContext);
  const { login } = useAuth();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

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
              console.log(otpTime.diff(nowTime, "seconds"));
              setOtpExpireTime(otpTime.diff(nowTime, "seconds"));
              const test = setTimeout(() => {
                if (intervalId > 0) setOtpExpireTime(otpExpireTime - 1);
              }, 10000);
              setIntervalId(test);
              setUsername(values.username);
              resetForm();
              setLoginStep("otp");
            }
          } catch (error) {
            if (error.response && error.response.status === 429) {
              setLoading(false);
              alert(error.response.data);
            } else {
              console.log("EEEE : ", error, error?.response?.data);
              setLoading(false);
              alert("خطایی رخ داد");
            }
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
      if (error?.response?.status === 404) {
        setLoading(false);
        setLoginStep("register");
      } else {
        console.log("Error :  ", error);
        setLoading(false);
        alert("خطایی رخ داد");
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
        clearTimeout(intervalId);
        resetForm();
        login(result.data.accessToken, result.data.refreshToken);
        onFinish();
      } else if (result.status === 403) {
        Alert.alert(result.data[0].toString());
      }
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 403) {
        setLoading(false);
        alert(error);
      } else {
        console.log(error.response);
        setLoading(false);
        alert(error.toString());
      }
      console.log(error);
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
        onFinish();
      } else if (result.status === 403) {
        alert(result.data[0].toString());
        // setLoginStep("login");
      }
      setLoading(false);
    } catch (error) {
      if (error.response.status === 403) alert(error.response.data);
      setLoading(false);
    }
    // setLoginStep("login");
  };

  const handleRegister = async (values, { resetForm }) => {
    // console.log(
    //   "handleRegister",
    //   isAuthenticationRequiredOnRegister === true ? " with otp" : "without otp"
    // );
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
        if (error.response.status === 429) {
          setLoading(false);
          alert(error.response.data);
        } else {
          setLoading(false);
          alert("خطایی رخ داد");
          // console.log(error.response.data);
        }
      }
    } else {
      try {
        const result = await apiRegisterUser(values);
        if (result.status === 200 && result.data.success === true) {
          resetForm();
          login(result.data.accessToken, result.data.refreshToken);
          onFinish();
          // ime login to register user and importantly  set tokens
        } else {
          Alert.alert("خطا در ثبت نام");
        }
      } catch (error) {
        // console.log(error.response?.data);
        // alert(error.response?.data.toString() || error);
      }
    }
  };

  const handleRegisterWithOtp = async (values, { resetForm }) => {
    // console.log("handleRegisterWithOtp", {
    //   ...registerMetaData,
    //   ...{ otp: values.otp },
    // });
    try {
      const result = await apiRegisterUser({
        ...registerMetaData,
        ...{ otp: values.otp },
      });
      if (result.status === 200 && result.data.success === true) {
        resetForm();
        login(result.data.accessToken, result.data.refreshToken);
        onFinish();
        // ime login to register user and importantly  set tokens
      } else {
        Alert.alert("خطا در ثبت نام");
      }
    } catch (error) {
      // console.log(error.response.data.toString());
      alert(error.response?.data?.toString() || error);
    }
  };

  const mobileValidationSchema = yup.object().shape({
    username: yup
      .string()
      .required("شماره موبایل خود را وارد کنید")
      .matches(regexs.emailOrMobileValidate, "مقدار ورودی معتبر نیست"),
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
      mobile: username,
      email: "",
      password: "",
    },
    onSubmit: handleRegister,
  });

  const checkRegisterOtpForm = useFormik({
    initialValues: { otp: "" },
    onSubmit: handleRegisterWithOtp,
  });

  const msToTime = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    const timer =
      otpExpireTime > 0 &&
      setInterval(() => setOtpExpireTime(otpExpireTime - 1), 1);
    return () => clearInterval(timer);
  }, [otpExpireTime]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      {loading && (
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
            source={require("../../assets/spinner.json")}
            autoPlay
          />
        </View>
      )}
      {!loading && (
        <AppView isSAfe style={styles.loginModalContainer}>
          {loginStep === "login" && (
            <KeyboardAwareScrollView>
              <View
                style={[
                  styles.flexRow,
                  {
                    justifyContent: "space-between",
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => onRequestClose()}
                  style={{ padding: 10 }}
                >
                  <Ionicons name="close" size={25} color={colors.black} />
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
                    برای ورود و یا ثبت نام در {faName || "فروشگاه"} شماره موبایل
                    یا پست الکترونیک خود را وارد نمایید
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
                          paddingVertical: 10,
                        }}
                      >
                        ورود با موبایل
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setLoginType("email")}
                      style={{ marginRight: 20 }}
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
                          paddingVertical: 10,
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
                    onChangeText={checkExistsForm.handleChange("username")}
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
                    value={`ورود به ${faName || "فروشگاه"}`}
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
                    با ورود و یا ثبت نام در {faName || "فروشگاه"} شما شرایط و
                    قوانین استفاده ار سرویس های سایت {faName || "فروشگاه"} و
                    قوانین حریم خصوصی آن را میپذیرید
                  </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
          )}
          {loginStep === "otp" && (
            <KeyboardAwareScrollView>
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "95%",
                  marginLeft: "2.5%",
                  minWidth: "95%",
                  height: "100%",
                  minHeight: "100%",
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
                  onChangeText={checkOtpForm.handleChange("otp")}
                  onEndEditing={checkOtpForm.handleSubmit}
                  maxLength={6}
                  textContentType="oneTimeCode"
                  placeholder="کد یکبار مصرف"
                  textAlign="center"
                  style={{ marginBottom: 20 }}
                  keyboardType="number-pad"
                />
                <Text style={{ textAlign: "center", fontFamily: "primary" }}>
                  کد تا {otpExpireTime} انقضا میشود
                </Text>
                <TouchableOpacity onPress={() => setLoginStep("password")}>
                  <Text
                    style={{
                      fontFamily: "primary",
                      color: colors.primaryColor,
                      marginBottom: 20,
                      textAlign: "right",
                      alignSelf: "flex-end",
                      paddingVertical: 10,
                    }}
                  >
                    ورود با رمز عبور
                  </Text>
                </TouchableOpacity>
                <AppButton
                  value={`ورود به ${faName || "فروشگاه"}`}
                  onPress={checkOtpForm.submitForm}
                  style={{ marginBottom: 40 }}
                />
              </View>
            </KeyboardAwareScrollView>
          )}
          {loginStep === "password" && (
            <KeyboardAwareScrollView>
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "95%",
                  marginLeft: "2.5%",
                  minWidth: "95%",
                  height: "100%",
                  minHeight: "100%",
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
                  value={`ورود به ${faName || "فروشگاه"}`}
                  onPress={checkPasswordForm.handleSubmit}
                  onLongPress={() => setLoginStep("login")}
                  style={{ marginBottom: 50 }}
                />
              </View>
            </KeyboardAwareScrollView>
          )}
          {loginStep === "register" && (
            <KeyboardAwareScrollView>
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "95%",
                  marginLeft: "2.5%",
                  minWidth: "95%",
                  height: "100%",
                  minHeight: "100%",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <AppInput
                    value={registerForm.values.firstName}
                    onChangeText={registerForm.handleChange("firstName")}
                    placeholder="نام"
                    style={{ marginBottom: 20, marginTop: "30%" }}
                    textContentType="name"
                  />
                  <AppInput
                    value={registerForm.values.lastName}
                    onChangeText={registerForm.handleChange("lastName")}
                    placeholder="نام خانوادگی"
                    style={{ marginBottom: 20 }}
                    textContentType="familyName"
                  />
                  <AppInput
                    value={registerForm.values.mobile}
                    onChangeText={registerForm.handleChange("mobile")}
                    placeholder="شماره موبایل"
                    style={{ marginBottom: 20 }}
                    keyboardType="number-pad"
                    textContentType="telephoneNumber"
                  />
                  <AppInput
                    value={registerForm.values.email}
                    onChangeText={registerForm.handleChange("email")}
                    placeholder="پست الکترونیک"
                    style={{ marginBottom: 20 }}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                  />
                  <AppInput
                    value={registerForm.values.password}
                    onChangeText={registerForm.handleChange("password")}
                    placeholder="رمز عبور"
                    style={{ marginBottom: 40 }}
                    secureTextEntry
                    textContentType="newPassword"
                  />
                </View>
                <AppButton
                  value={`ثبت نام در ${faName || "فروشگاه"}`}
                  onPress={registerForm.handleSubmit}
                  style={{ marginBottom: 50 }}
                />
              </View>
            </KeyboardAwareScrollView>
          )}
          {loginStep === "registerOtp" && (
            <KeyboardAwareScrollView>
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "95%",
                  marginLeft: "2.5%",
                  minWidth: "95%",
                  height: "100%",
                  minHeight: "100%",
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
                  onChangeText={checkRegisterOtpForm.handleChange("otp")}
                  onEndEditing={checkRegisterOtpForm.handleSubmit}
                  maxLength={6}
                  textContentType="oneTimeCode"
                  placeholder="کد یکبار مصرف"
                  textAlign="center"
                  style={{ marginBottom: 20 }}
                  keyboardType="number-pad"
                />
                <Text style={{ textAlign: "center", fontFamily: "primary" }}>
                  کد تا {otpExpireTime} انقضا میشود
                </Text>
                <AppButton
                  value={`ثبت نام در ${faName || "فروشگاه"}`}
                  onPress={checkRegisterOtpForm.submitForm}
                  style={{ marginBottom: 40 }}
                />
              </View>
            </KeyboardAwareScrollView>
          )}
        </AppView>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  loginModalContainer: {
    display: "flex",
    alignItems: "center",
    // paddingHorizontal: 20,
    height: "100%",
    justifyContent: "flex-end",
  },
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

export default LoginModal;
