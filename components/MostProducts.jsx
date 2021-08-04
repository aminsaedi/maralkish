import React, { useState, useEffect } from "react";
import Carousel from "react-native-snap-carousel";
import { Text, View, TouchableOpacity, Dimensions, Image } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNavigation } from "@react-navigation/native";

// apis import
import {
  apiGetMostSalesProducts,
  apiGetMostViewdProducts,
} from "../api/products";
// utils import
import colors from "../utilities/colors";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";
import pages from "../navigation/routes";
// components import
import ProgressiveImage from "./ProgressiveImage";

const numCalculator = (index, item) => {
  if (index === 0) {
    if (item === 0) return 1;
    else if (item === 1) return 2;
    else if (item === 2) return 3;
  } else if (index === 1) {
    if (item === 0) return 4;
    if (item === 1) return 5;
    if (item === 2) return 6;
  } else if (index === 2) {
    if (item === 0) return 7;
    if (item === 1) return 8;
    if (item === 2) return 9;
  } else if (index === 3) {
    if (item === 0) return 10;
    if (item === 1) return 11;
    if (item === 2) return 12;
  } else if (index === 4) {
    if (item === 0) return 13;
    if (item === 1) return 14;
    if (item === 2) return 15;
  }
};

const MostProducts = ({ mode = "sales", style }) => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();
  const chunks = (a, size) =>
    Array.from(new Array(Math.ceil(a.length / size)), (_, i) =>
      a.slice(i * size, i * size + size)
    );

  const getProducts = async () => {
    !loading && setLoading(true);
    let result;
    if (mode === "sales") result = await apiGetMostSalesProducts();
    else if (mode === "views") result = await apiGetMostViewdProducts();
    if (result.status === 200) setProducts(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading)
    return (
      <View style={style}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            height={width}
          >
            <SkeletonPlaceholder.Item
              width={width - 50}
              height={width / 3 - 10}
              borderRadius={20}
            />
            <SkeletonPlaceholder.Item
              width={width - 50}
              height={width / 3 - 10}
              borderRadius={20}
            />
            <SkeletonPlaceholder.Item
              width={width - 50}
              height={width / 3 - 10}
              borderRadius={20}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    );

  return (
    <View style={style}>
      <Text
        style={{
          fontSize: 17,
          fontFamily: "primaryBold",
          marginRight: 15,
          marginBottom: 15,
          textAlign: "right",
        }}
      >
        {mode === "sales" ? "پرفروش ترین کالاها" : "محصولات پربازدید اخیر"}
      </Text>
      <Carousel
        inverted
        data={chunks(products, 3)}
        itemWidth={(width / 10) * 8}
        itemHeight={(width / 10) * 8}
        sliderWidth={width}
        sliderHeight={(width / 10) * 8}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: (width / 10) * 8,
              height: (width / 10) * 8,
              display: "flex",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.push(pages.product, { productId: item[0].id })
              }
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "60%", height: "100%", paddingRight: 10 }}>
                <Text
                  style={{
                    fontFamily: "primary",
                    color: colors.black,
                    fontSize: 15,
                    lineHeight: 27,
                    textAlign: "right",
                  }}
                  numberOfLines={2}
                >
                  {item[0].name}
                </Text>
              </View>
              <View
                style={{
                  width: "10%",
                  height: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "primaryBold",
                    fontSize: 35,
                    color: colors.seconadryColor,
                    textAlign: "center",
                  }}
                >
                  {numCalculator(index, 0)}
                </Text>
              </View>
              <View
                style={{
                  width: "30%",
                  height: "100%",
                }}
              >
                {item[0].image ? (
                  <ProgressiveImage
                    source={{
                      uri: imageLinkGenerator(item[0].image, "jpg", 300, 300),
                    }}
                    thumbnailSource={{
                      uri: imageLinkGenerator(
                        item[0].image,
                        "jpg",
                        150,
                        150,
                        50
                      ),
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
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.push(pages.product, { productId: item[1].id })
              }
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "60%", height: "100%", paddingRight: 10 }}>
                <Text
                  style={{
                    fontFamily: "primary",
                    color: colors.black,
                    fontSize: 15,
                    lineHeight: 27,
                    textAlign: "right",
                  }}
                  numberOfLines={2}
                >
                  {item[1].name}
                </Text>
              </View>
              <View
                style={{
                  width: "10%",
                  height: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "primaryBold",
                    fontSize: 35,
                    color: colors.seconadryColor,
                    textAlign: "center",
                  }}
                >
                  {numCalculator(index, 1)}
                </Text>
              </View>
              <View
                style={{
                  width: "30%",
                  height: "100%",
                }}
              >
                {item[1].image ? (
                  <ProgressiveImage
                    source={{
                      uri: imageLinkGenerator(item[1].image, "jpg", 300, 300),
                    }}
                    thumbnailSource={{
                      uri: imageLinkGenerator(
                        item[1].image,
                        "jpg",
                        150,
                        150,
                        50
                      ),
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
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.push(pages.product, { productId: item[2].id })
              }
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "60%", height: "100%", paddingRight: 10 }}>
                <Text
                  style={{
                    fontFamily: "primary",
                    color: colors.black,
                    fontSize: 15,
                    lineHeight: 27,
                    textAlign: "right",
                  }}
                  numberOfLines={2}
                >
                  {item[2].name}
                </Text>
              </View>
              <View
                style={{
                  width: "10%",
                  height: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "primaryBold",
                    fontSize: 35,
                    color: colors.seconadryColor,
                    textAlign: "center",
                  }}
                >
                  {numCalculator(index, 2)}
                </Text>
              </View>
              <View
                style={{
                  width: "30%",
                  height: "100%",
                }}
              >
                {item[2].image ? (
                  <ProgressiveImage
                    source={{
                      uri: imageLinkGenerator(item[2].image, "jpg", 300, 300),
                    }}
                    thumbnailSource={{
                      uri: imageLinkGenerator(
                        item[2].image,
                        "jpg",
                        150,
                        150,
                        50
                      ),
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
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default MostProducts;
