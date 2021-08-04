import React, { useEffect, useState, useContext } from "react";
import {
  Alert,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { apiAddNewReview } from "../api/reviews";
import { apiGetStoreSettings } from "../api/util";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import * as yup from "yup";
import AppButton from "./../components/Form/AppButton";
import AppInput from "./../components/Form/AppInput";
import AppInputError from "./../components/Form/AppInputError";
import AppView from "./../components/AppView/AppView";
import colors from "../utilities/colors";
import Line from "../components/Line";
import LottieView from "lottie-react-native";
import Slider from "@react-native-community/slider";
import StoreSettingContext from "../utilities/storeSettingContext";

const NewReview = ({ route, navigation }) => {
  const [rating, setRating] = useState(route?.params?.rating || 4);
  const [loading, setLoading] = useState(false);
  const { faName } = useContext(StoreSettingContext);

  const validationSchema = yup.object({
    title: yup.string().required("عنوان دیدگاه را وارد کنید"),
    description: yup.string().required("متن دیدگاه را وارد کنید"),
  });

  const handleAddNewReview = async (values) => {
    setLoading(true);
    try {
      const result = await apiAddNewReview(route.params.productId.toString(), {
        productId: route.params.productId.toString(),
        ...values,
        rating: rating,
      });
      if (result.status === 200) {
        setLoading(false);
        Alert.alert(
          "نظر ثبت شد",
          "نظر شما با موفقیت ثبت شد و پس از بررسی منتشر خواهد شد",
          [{ text: "باشه", style: "default" }]
        );
        navigation.goBack();
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      alert("خطا در ثبت نظر");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: route?.params?.title || "",
      description: route?.params?.description || "",
    },
    onSubmit: handleAddNewReview,
    validationSchema,
    enableReinitialize: true,
  });

  if (loading)
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

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 35,
        }}
      >
        <Text style={{ fontFamily: "primary", fontSize: 15 }}>
          {rating === 0 && "خیلی بد"}
          {rating === 1 && "بد"}
          {rating === 2 && "معمولی"}
          {rating === 3 && "خوب"}
          {rating === 4 && "خیلی خوب"}
          {rating === 5 && "عالی"}
        </Text>
        <Slider
          style={{ width: "95%", height: 40 }}
          minimumValue={0}
          maximumValue={5}
          minimumTrackTintColor={colors.fiveScore}
          maximumTrackTintColor={colors.zeroScore}
          step={1}
          inverted
          onValueChange={(item) => setRating(item)}
          value={rating}
        />
      </View>
      <Line />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <Text
          style={{
            fontFamily: "primaryBold",
            textAlign: "right",
            fontSize: 17,
            marginBottom: 20,
          }}
        >
          دیدگاه خود را شرح دهید
        </Text>
        <Text
          style={{
            fontFamily: "primary",
            textAlign: "right",
            marginRight: 10,
            color: colors.black,
            fontSize: 13,
            marginBottom: 3,
          }}
        >
          عنوان نظر
        </Text>
        <AppInput
          textAlign="right"
          value={formik.values.title}
          onChangeText={formik.handleChange("title")}
        />
        <AppInputError
          error={
            formik.errors.title && formik.touched.title && formik.errors.title
          }
        />
        <Text
          style={{
            fontFamily: "primary",
            textAlign: "right",
            marginRight: 10,
            color: colors.black,
            fontSize: 13,
            marginBottom: 3,
            marginTop: 20,
          }}
        >
          متن نظر
        </Text>
        <AppInput
          multiline={true}
          numberOfLines={7}
          textAlign="right"
          value={formik.values.description}
          onChangeText={formik.handleChange("description")}
          textAlignVertical="top"
          style={{ minHeight: 100, paddingBottom: 5 }}
        />
        <AppInputError
          style={{ marginBottom: 50 }}
          error={
            formik.errors.description &&
            formik.touched.description &&
            formik.errors.description
          }
        />
        <AppButton value="ثبت دیدگاه" onPress={formik.handleSubmit} />
        <Text
          style={{
            fontFamily: "primary",
            textAlign: "center",
            color: colors.gray,
            marginTop: 10,
            fontSize: 12,
          }}
        >
          ثبت دیدگاه، به معنی موافقت با{" "}
          <Text style={{ color: colors.seconadryColor }}>
            قوانین انتشار {faName || "فروشگاه"}
          </Text>{" "}
          است.
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default NewReview;
