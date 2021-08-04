import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ProgressiveImage from "./ProgressiveImage";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utilities/colors";
import { useNavigation } from "@react-navigation/native";
import pages from "./../navigation/routes";
import Line from "./Line";
import ColorsThumbnil from "./ColorsThumbnil";
import ImageWithOverlay from "./ImageWithOverlay";

const ProductHorizentalItem = ({ product }) => {
  const navigation = useNavigation();
  //  return <TouchableOpacity style={{width  : "95%",height : 150,backgroundColor : "dodgerblue"}} />

  return (
    <TouchableOpacity
      style={{
        width: "95%",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "2.5%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 5,
      }}
      onPress={() => navigation.push(pages.product, { productId: product.id })}
    >
      {product.price !== product.regularPrice && (
        <View style={{ width: "100%" }}>
          <View style={{ marginBottom: 5 }}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 14,
                color: colors.primaryColor,
                textAlign: "right",
              }}
            >
              فروش ویژه
            </Text>
          </View>
          <Line
            color={colors.primaryColor}
            width="100%"
            marginHorizontal="0%"
            style={{ height: 2.5 }}
          />
        </View>
      )}
      <View
        style={{
          width: "100%",
          height: 150,
          display: "flex",
          flexDirection: "row",
          marginVertical: 5,
          // backgroundColor: "red",
        }}
      >
        <View style={{ width: "70%", height: "100%", }}>
          <View style={{ width: "100%", height: "40%", }}>
            <Text
              style={{
                fontFamily: "primaryBold",
                lineHeight: 23,
                textAlign: "right",
                marginRight: 10,
                marginLeft: 15,
              }}
              numberOfLines={2}
            >
              {product.name}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: "25%",
              display: "flex",
              flexDirection: "row",
              // backgroundColor : "orange"
            }}
          >
            <View
              style={{
                height: "100%",
                width: "30%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {product.voters > 0 && (
                <React.Fragment>
                  <MaterialCommunityIcons
                    name="star"
                    color={colors.startFull}
                    size={15}
                  />
                  <Text style={{ fontFamily: "primary", marginLeft: 3 }}>
                    {product.score.toString()}
                  </Text>
                </React.Fragment>
              )}
            </View>
            {product &&
              product.defaultVariant &&
              product.defaultVariant.stock !== null && (
                <Text
                  style={{
                    color: colors.primaryColor,
                    height: "100%",
                    width: "70%",
                    fontFamily: "primary",
                    textAlign: "right",
                    paddingRight: 5,
                  }}
                >
                  فقط {product.defaultVariant?.stock.toString()} عدد در انبار
                  موجود است
                </Text>
              )}
          </View>
          <View
            style={{
              width: "100%",
              height: "35%",
              display: "flex",
              flexDirection: "row",
              alignItems : "center",
              justifyContent: "space-between",
              // backgroundColor : "purple"
            }}
          >
            <View
              style={{
                width: "40%",
                height: "100%",
                display: "flex",
                alignItems : "center",
                justifyContent : "center",
                flexDirection: "row",
                // backgroundColor : "red"
              }}
            >
              {product.price > 0 && (
                <View
                  style={{
                    height: "100%",
                    width: "30%",
                    // backgroundColor : "blue"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "primary",
                      fontSize: 12,
                      textAlign: "right",
                      marginTop: 4,
                      marginRight: 1,
                    }}
                  >
                    تومان
                  </Text>
                </View>
              )}
              <View
                style={{
                  height: "100%",
                  width: "70%",
                  display: "flex",
                  // backgroundColor : "dodgerblue"
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "50%",
                    // backgroundColor : "green"
                  }}
                >
                  <Text style={{ fontFamily: "primaryBold", fontSize: 18 }}>
                    {product.price > 0
                      ? product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : "ناموجود"}
                  </Text>
                </View>
                {product.price !== product.regularPrice && (
                  <View
                    style={{
                      width: "100%",
                      height: "50%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "primary",
                        color: colors.gray,
                        textDecorationLine: "line-through",
                      }}
                    >
                      {product.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {product.price !== product.regularPrice && (
              <View
                style={{
                  width: "15%",
                  height: "40%",
                  backgroundColor: colors.primaryColor,
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontFamily: "primary", color: colors.white }}>
                  {Math.round(
                    ((product.regularPrice - product.price) /
                      product.regularPrice) *
                      100
                  )}{" "}
                  %
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{ flex : 1, }}>
          <View style={{ width: "100%", height: "80%" }}>
            {product.image ? (
              <ProgressiveImage
                source={{ uri: imageLinkGenerator(product.image, "webp", 400) }}
                thumbnailSource={{
                  uri: imageLinkGenerator(product.image, "webp", 150),
                }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../assets/default.jpg")}
                style={{ width: "100%", height: "100%", borderRadius: 15 }}
                resizeMode="contain"
              />
            )}
          </View>
          {product.colors && product.colors.length > 0 && (
            <View style={{ width: "100%", height: "20%", marginTop: 5 }}>
              {product.colors && product.colors.length > 0 && (
                <ColorsThumbnil colors={product.colors} />
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductHorizentalItem;
