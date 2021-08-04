import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProgressiveImage from "./ProgressiveImage";
import moment from "moment";
import pages from "../navigation/routes";
import colors from "../utilities/colors";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SpecialProductSquareCard = ({ product }) => {
  if (product.id === "emptyItem")
    return <View style={[styles.container, { borderBottomWidth: 0 }]}></View>;
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
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(pages.product, { productId: product.productId })
      }
    >
      <View
        style={{
          width: "100%",
          height: "50%",
          paddingLeft: "2.5%",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <ProgressiveImage
          source={{
            uri: imageLinkGenerator(product.image, "jpg", 500, 500),
          }}
          thumbnailSource={{
            uri: imageLinkGenerator(product.image, "jpg", 200, 200),
          }}
          style={{ width: "95%", height: "98%" }}
          resizeMode="contain"
        />
      </View>
      <View style={{ width: "100%", height: "50%" }}>
        <View
          style={{
            width: "100%",
            height: "30%",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{ fontFamily: "primary", lineHeight: 23 }}
            numberOfLines={2}
          >
            {product.name}
          </Text>
        </View>
        <View style={{ width: "100%", height: "15%" }}>
          {/* To add something in future */}
        </View>
        <View
          style={{
            width: "100%",
            height: "40%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={{ width: "25%", height: "100%" }}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 10,
                textAlign: "right",
                marginTop: 10,
                marginRight: 3,
              }}
            >
              تومان
            </Text>
          </View>
          <View
            style={{
              width: "75%",
              height: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "primaryBold",
                  fontSize: 18,
                  textAlign: "left",
                  width: "60%",
                }}
              >
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
              <View
                style={{
                  width: "25%",
                  height: 20,
                  backgroundColor: colors.primaryColor,
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "10%",
                }}
              >
                <Text style={{ fontFamily: "primary", color: colors.white }}>
                  20%
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: "50%",
              }}
            >
              <Text
                style={{
                  fontFamily: "primaryBold",
                  fontSize: 14,
                  textAlign: "left",
                  textDecorationLine: "line-through",
                  color: colors.gray,
                }}
              >
                {product.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", height: "15%" }}>
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 15,
              textAlign: "left",
              color: colors.gray,
              marginLeft: "15%",
            }}
          >
            {diffrence.days || "00"} : {diffrence.hours || "00"} :{" "}
            {diffrence.minutes || "00"} : {diffrence.seconds || "00"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderColor: colors.midleLightGray,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    height: windowHeight / 2,
    paddingTop: 10,
  },
});

export default SpecialProductSquareCard;
