import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import AppInput from "./../components/Form/AppInput";
import AppButton from "./../components/Form/AppButton";
import * as yup from "yup";
import { useFormik, validateYupSchema } from "formik";
import colors from "../utilities/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import captchaLinkGenerator from "./../utilities/captchaLinkGenerator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { apiSendContactUsForm } from "../api/util";
import StoreSettingContext from "./../utilities/storeSettingContext";

const ContactUs = ({ navigation, route }) => {
  const storeSetting = useContext(StoreSettingContext);
  const [captchaImage, setCaptchaImage] = useState();
  const [captchaInput, setCaptchaInput] = useState();
  const generateCaptcha = () => {
    const result = captchaLinkGenerator();
    setCaptchaImage(result);
  };

  const handleSendForm = async (values) => {
    if (!captchaInput) return alert("کد اعتبار سنجی را وارد کنید");
    try {
      const result = await apiSendContactUsForm({
        captchaCode: captchaInput,
        captchaUniqueId: captchaImage.uniqueId,
        ...values,
      });
      if (result.status === 200) {
        alert("پیام شما با موفقیت ثبت شد");
        navigation.goBack();
      }
    } catch (error) {
      if (error.response.data) alert(error.response.data.toString());
      else alert("خطایی رخ داد");
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const contactUsForm = useFormik({
    initialValues: {
      subject: "",
      text: "",
      name: "",
      phone: "",
      email: "",
      website: "",
    },
    onSubmit: handleSendForm,
  });

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <View style={{ paddingHorizontal: 15 }}>
          <Text
            style={{
              fontFamily: "primaryBold",
              fontSize: 25,
              textAlign: "center",
            }}
          >
            {route.params && route.params.title
              ? route.params.title
              : "تماس با ما"}
          </Text>
          <Text
            style={{
              fontFamily: "primary",
              color: colors.secondaryTextColor,
              lineHeight: 25,
              marginVertical: 15,
              textAlign: "right",
            }}
          >
            شما میتوانید با تکمیل این فرم با بخش پشتیبانی فروشگاه در تماس باشید
            و به بهبود تجربه خرید مشتریان کمک کنید
          </Text>
          <Text
            style={{
              fontFamily: "primary",
              lineHeight: 22,
              color: colors.secondaryTextColor,
              textAlign: "right",
            }}
          >
            همچنین میتوانید با روش های زیر به طور مستقیم با{" "}
            {storeSetting.faName || "فروشگاه"} در تماس باشید
          </Text>
          {storeSetting.phone && (
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${storeSetting.phone}`)}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.secondaryTextColor,
                  textAlign: "right",
                }}
              >
                شماره تلفن :{" "}
                <Text style={{ color: colors.seconadryColor }}>
                  {storeSetting.phone}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
          {storeSetting.mobile && (
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${storeSetting.mobile}`)}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.secondaryTextColor,
                  textAlign: "right",
                }}
              >
                شماره موبایل :{" "}
                <Text style={{ color: colors.seconadryColor }}>
                  {storeSetting.mobile}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
          {storeSetting.email && (
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${storeSetting.email}`)}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.secondaryTextColor,
                  textAlign: "right",
                }}
              >
                آدرس ایمیل :{" "}
                <Text style={{ color: colors.seconadryColor }}>
                  {storeSetting.email}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
          {storeSetting.address && storeSetting.latitude && (
            <TouchableOpacity
              onPress={() => {
                const scheme = Platform.select({
                  ios: "maps:0,0?q=",
                  android: "geo:0,0?q=",
                });
                const latLng = `${storeSetting.latitude},${storeSetting.longitude}`;
                const label = "Store Address";
                const url = Platform.select({
                  ios: `${scheme}${label}@${latLng}`,
                  android: `${scheme}${latLng}(${label})`,
                });

                Linking.openURL(url);
              }}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.secondaryTextColor,
                  textAlign: "right",
                }}
              >
                آدرس فروشگاه :{" "}
                <Text style={{ color: colors.seconadryColor }}>
                  {storeSetting.address}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
          <AppInput
            placeholder="عنوان پیام"
            style={{ marginBottom: 25, marginTop: 10 }}
            value={contactUsForm.values.subject}
            onChangeText={contactUsForm.handleChange("subject")}
          />
          <AppInput
            multiline={true}
            numberOfLines={7}
            textAlign="center"
            textAlignVertical="center"
            style={{ minHeight: 100, paddingBottom: 5, marginBottom: 25 }}
            placeholder="متن پیام"
            value={contactUsForm.values.text}
            onChangeText={contactUsForm.handleChange("text")}
          />
          <AppInput
            placeholder="نام و نام‌خوانوادگی"
            autoCompleteType="name"
            style={{ marginBottom: 25 }}
            value={contactUsForm.values.name}
            onChangeText={contactUsForm.handleChange("name")}
          />
          <AppInput
            placeholder="شماره تماس"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            style={{ marginBottom: 25 }}
            value={contactUsForm.values.phone}
            onChangeText={contactUsForm.handleChange("phone")}
          />
          <AppInput
            placeholder="آدرس ایمل"
            autoCompleteType="email"
            keyboardType="email-address"
            style={{ marginBottom: 25 }}
            value={contactUsForm.values.email}
            onChangeText={contactUsForm.handleChange("email")}
          />
          <AppInput
            placeholder="آدرس وب سایت"
            style={{ marginBottom: 25 }}
            value={contactUsForm.values.website}
            onChangeText={contactUsForm.handleChange("website")}
          />
          <View
            style={{
              width: "100%",
              marginBottom: 25,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AppInput
              keyboardType="number-pad"
              style={{ width: "45%" }}
              placeholder="کد اعتبار سنجی"
              clearTextOnFocus
              onChangeText={(t) => setCaptchaInput(t)}
            />
            <TouchableOpacity
              style={{
                width: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
              }}
              onPress={() => {
                const result = captchaLinkGenerator();
                setCaptchaImage(result);
              }}
            >
              <MaterialCommunityIcons
                name="refresh"
                size={35}
                color={colors.seconadryColor}
              />
            </TouchableOpacity>
            <View style={{ width: "45%", height: 50 }}>
              {captchaImage && (
                <Image
                  source={{ uri: captchaImage.uri }}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%", borderRadius: 2.5 }}
                />
              )}
            </View>
          </View>
          <AppButton
            value="ارسال پیام"
            style={{ marginBottom: 25 }}
            onPress={contactUsForm.submitForm}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ContactUs;
