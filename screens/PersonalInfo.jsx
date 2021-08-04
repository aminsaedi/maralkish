import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  apiGetUserProfile,
  apiChangeName,
  apiChangePassword,
} from "../api/users";
import colors from "../utilities/colors";
import PersoanlInfoCard from "../components/PersonalInfoCard";
import Line from "../components/Line";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppView from "../components/AppView/AppView";
import AppInput from "./../components/Form/AppInput";
import AppButton from "./../components/Form/AppButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { color } from "jimp";
import AppInputError from "./../components/Form/AppInputError";
import pages from "./../navigation/routes";

const PersoanlInfo = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();
  const [listItems, setListItems] = useState();
  const [loading, setLoading] = useState(true);
  const [changeNameModalVisible, setChangeNameModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordVisible] =
    useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const getUserInfo = async () => {
    setLoading(true);
    try {
      const result = await apiGetUserProfile();
      if (result.status === 200) {
        const data = [
          {
            id: 1,
            title: "نام و نام‌خانوادگی",
            subTitle: result.data.name,
            isVerified: false,
            type: "text",
            editable: true,
          },
          {
            id: 2,
            title: "شماره موبایل",
            subTitle: result.data.mobile,
            isVerified: result.data.hasVerifiedMobile,
            type: "text",
            editable: false,
          },
          {
            id: 3,
            title: "پست الکترونیک",
            subTitle: result.data.email,
            isVerified: result.data.hasVerifiedEmail,
            type: "text",
            editable: false,
          },
          {
            id: 4,
            title: "شماره ملی",
            subTitle: result.data.identityNumber,
            isVerified: false,
            type: "text",
            editable: false,
          },
          {
            id: 5,
            title: "کلمه عبور",
            type: "password",
            hasPassword: result.data.hasPassword,
            editable: true,
          },
        ];
        setListItems(data);
        setUserInfo(result.data);
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("خطایی رخ داد");
    }
  };

  const handleChangeName = async () => {
    try {
      const result = await apiChangeName(
        firstName,
        lastName,
        userInfo.mobile,
        userInfo.email
      );
      if (result.status === 200) {
        await getUserInfo();
        setChangeNameModalVisible(false);
      }
    } catch (error) {
      console.log(error, error.response);
      alert("خطایی رخ داد");
    }
  };

  const handleChangePassword = async (values) => {
    try {
      const result = await apiChangePassword(values);
      if (result.status === 200) {
        setChangePasswordVisible(false);
        alert("رمز عبور تغیر یافت");
      }
    } catch (error) {
      if (error.response.data) alert(error.response.data.toString());
      else alert("خطایی رخ داد");
    }
  };

  const changePasswordValidationSchema = yup.object().shape({
    oldPassword: yup
      .string()
      .required("رمز عبور فعلی خود را وارد کنید")
      .min(4, "طول رمز عبور حداقل ۴ کاراکتر میباشد")
      .max(50, "حداکثر طول رمزعبور ۵۰ کاراکتر میباشد"),
    newPassword: yup
      .string()
      .required("رمز عبور جدید خود را وارد کنید")
      .min(4, "طول رمز عبور حداقل ۴ کاراکتر میباشد")
      .max(50, "حداکثر طول رمزعبور ۵۰ کاراکتر میباشد"),
    confirmNewPassword: yup
      .string()
      .required("رمز عبور جدید خود را مجدد وارد کنید")
      .oneOf([yup.ref("newPassword"), null], "تکرار پسور مطابقت ندارد"),
  });

  const changePasswordForm = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
    onSubmit: handleChangePassword,
    validationSchema: changePasswordValidationSchema,
  });

  useEffect(() => {
    getUserInfo();
  }, []);

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

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {listItems && (
        <FlatList
          data={listItems}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <PersoanlInfoCard
              item={item}
              onPress={() => {
                if (item.id === 1) setChangeNameModalVisible(true);
                else if (item.id === 5) setChangePasswordVisible(true);
              }}
            />
          )}
          ItemSeparatorComponent={Line}
        />
      )}
      <Modal
        visible={changeNameModalVisible}
        onRequestClose={() => setChangeNameModalVisible(false)}
        transparent={false}
        animationType="slide"
      >
        <AppView isSAfe style={{ height: "100%", minHeight: "100%" }}>
          <View
            style={{ height: "5%", display: "flex", justifyContent: "center" }}
          >
            <TouchableOpacity
              style={{
                marginLeft: "5%",
                width: "10%",
              }}
              onPress={() => setChangeNameModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" size={25} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              paddingHorizontal: "5%",
              paddingTop: 10,
              paddingBottom: "5%",
            }}
          >
            <View style={{ marginBottom: "10%" }}>
              <Text
                style={{
                  fontFamily: "primaryBold",
                  textAlign: "right",
                  fontSize: 20,
                }}
              >
                نام و نام‌خانوادگی خود را وارد نمایید
              </Text>
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.gray,
                  textAlign: "right",
                  marginRight: 10,
                  fontSize: 15,
                  marginTop: 15,
                  marginBottom: 5,
                }}
              >
                نام
              </Text>
              <AppInput
                placeholder="نام"
                textAlign="right"
                value={firstName}
                onChangeText={(t) => setFirstName(t)}
              />
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.gray,
                  textAlign: "right",
                  marginRight: 10,
                  fontSize: 15,
                  marginTop: 15,
                  marginBottom: 5,
                }}
              >
                نام ‌خانوادگی
              </Text>
              <AppInput
                placeholder="نام ‌خانوادگی"
                textAlign="right"
                value={lastName}
                onChangeText={(t) => setLastName(t)}
              />
            </View>
            <AppButton value="تایید اطلاعات" onPress={handleChangeName} />
          </View>
        </AppView>
      </Modal>
      <Modal
        visible={changePasswordModalVisible}
        onRequestClose={() => setChangePasswordVisible(false)}
        transparent={false}
        animationType="slide"
      >
        <AppView isSAfe>
          <View
            style={{
              height: "5%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingLeft: "2.5%",
            }}
          >
            <TouchableOpacity onPress={() => setChangePasswordVisible(false)}>
              <MaterialCommunityIcons
                name="close"
                size={25}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: "95%", width: "100%", paddingHorizontal: 10 }}>
            <Text style={{ fontFamily: "primaryBold", fontSize: 20,textAlign : "right"}}>
              تغیر رمز عبور
            </Text>
            <Text
              style={{ fontFamily: "primary", fontSize: 15, marginBottom: 10,textAlign : "right" }}
            >
              رمز عبور شما باید حداقل ۴ حرف باشد
            </Text>
            <AppInput
              placeholder="رمزعبور فعلی"
              style={{ marginBottom: 2 }}
              onChangeText={changePasswordForm.handleChange("oldPassword")}
              value={changePasswordForm.values.oldPassword}
              autoCompleteType="password"
              secureTextEntry
            />
            <AppInputError
              style={{ marginBottom: 5 }}
              error={
                changePasswordForm.errors.oldPassword &&
                changePasswordForm.touched.oldPassword &&
                changePasswordForm.errors.oldPassword
              }
            />
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                marginBottom: 35,
              }}
              onPress={() => {
                setChangePasswordVisible(false);
                navigation.navigate(pages.resetPassword);
              }}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={15}
                color={colors.seconadryColor}
              />
              <Text
                style={{ fontFamily: "primary", color: colors.seconadryColor,textAlign : "right" }}
              >
                بازیابی رمز عبور
              </Text>
            </TouchableOpacity>
            <AppInput
              placeholder="رمزعبور جدید"
              style={{ marginBottom: 2 }}
              onChangeText={changePasswordForm.handleChange("newPassword")}
              value={changePasswordForm.values.newPassword}
              secureTextEntry
            />
            <AppInputError
              style={{ marginBottom: 20 }}
              error={
                changePasswordForm.errors.newPassword &&
                changePasswordForm.touched.newPassword &&
                changePasswordForm.errors.newPassword
              }
            />
            <AppInput
              placeholder="تکرار رمز عبور جدید"
              style={{ marginBottom: 2 }}
              onChangeText={changePasswordForm.handleChange(
                "confirmNewPassword"
              )}
              value={changePasswordForm.values.confirmNewPassword}
              secureTextEntry
            />
            <AppInputError
              style={{ marginBottom: 20 }}
              error={
                changePasswordForm.errors.confirmNewPassword &&
                changePasswordForm.touched.confirmNewPassword &&
                changePasswordForm.errors.confirmNewPassword
              }
            />
            <AppButton
              value="تغیر رمز عبور"
              onPress={changePasswordForm.submitForm}
            />
          </View>
        </AppView>
      </Modal>
    </View>
  );
};

export default PersoanlInfo;
