import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
// uti;ities import
import colors from "../utilities/colors";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";
import pages from "./../navigation/routes";
import ProgressiveImage from "./ProgressiveImage";

const SpecialProductCard = ({ product }) => {
  const navigation = useNavigation();
  const calculateTimeLeft = () => {
    setDiffrence({
      days: Math.floor((timeLeft - 1) / (1000 * 60 * 60 * 24)),
      hours: Math.floor(((timeLeft - 1) / (1000 * 60 * 60)) % 24),
      minutes: Math.floor(((timeLeft - 1) / 1000 / 60) % 60),
      seconds: Math.floor(((timeLeft - 1) / 1000) % 60),
    });
    setTimeLeft(timeLeft - 1000);
  };

  // const [timeLeft, setTimeLeft] = useState(
  //   moment(product.end).diff(moment(product.start), "milliseconds")
  // );

  const [timeLeft, setTimeLeft] = useState(
    moment(product.end).diff(moment(), "milliseconds")
  );
  const [diffrence, setDiffrence] = useState({});
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft();
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <TouchableWithoutFeedback
      style={{
        backgroundColor: colors.white,
        height: "100%",
        width: 175,
        borderRadius: 10,
        marginLeft: 10,
        display: "flex",
        overflow: "hidden",
      }}
      onPress={() =>
        navigation.navigate(pages.product, { productId: product.productId })
      }
      activeOpacity={0}
    >
      <View
        style={{
          backgroundColor: colors.white,
          height: "100%",
          width: 175,
          borderRadius: 10,
          marginLeft: 10,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <View style={{ height: "55%" }}>
          <ProgressiveImage
            source={{ uri: imageLinkGenerator(product.image) }}
            thumbnailSource={{
              uri: imageLinkGenerator(product.image, "jpg", 200),
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <View style={{ height: "15%", overflow: "hidden" }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: "primary",
              lineHeight: 22,
              paddingHorizontal: 12,
            }}
          >
            {product.name}
          </Text>
        </View>
        <View style={{ height: "15%" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontFamily: "primaryBold", fontSize: 15 }}>
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <Text style={{ fontSize: 10, width: 20, maxWidth: 20 }}>
                تومان
              </Text>
            </Text>
            <View
              style={{
                backgroundColor: colors.primaryColor,
                borderRadius: 15,
                paddingHorizontal: 5,
                paddingVertical: 3,
                width: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.white,
                  fontSize: 12,
                  letterSpacing: 2,
                }}
              >
                {Math.round(
                  ((product.regularPrice - product.price) /
                    product.regularPrice) *
                    100
                )}
                %
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={{
                fontFamily: "primary",
                marginLeft: 25,
                color: colors.gray,
                textDecorationLine: "line-through",
                fontSize: 13,
              }}
            >
              {product.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: "15%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 14,
              color: colors.gray,
              marginLeft: 15,
            }}
          >
            {diffrence.days || "00"} : {diffrence.hours || "00"} :{" "}
            {diffrence.minutes || "00"} : {diffrence.seconds || "00"}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SpecialProductCard;
