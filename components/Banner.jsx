import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { apiGetFourBanner, apiGetOneBanner } from "../api/banner";
import { baseURL } from "../api/client";
import pages from "../navigation/routes";

const Banner = ({ four = false }) => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const handleGetOneBanner = async () => {
    try {
      setLoading(true);
      const result = await apiGetOneBanner();
      if (result.status === 200) {
        setData(result.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleGetFourLoading = async () => {
    try {
      setLoading(true);
      const result = await apiGetFourBanner();
      if (result.status === 200) {
        setData(result.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handlePressOnItem = (slide) => {
    // console.log(slide);
    if (!slide) return;
    if (slide.anchorType) {
      switch (slide.anchorType) {
        case "product":
          navigation.push(pages.product, {
            productId: slide.typeId,
          });
          break;
        case "collection":
          navigation.push(pages.app, {
            screen: pages.catagories,
            params: {
              screen: pages.subCategories,
              params: {
                categoryId: slide.typeId,
              },
            },
          });
          break;
        default:
          break;
      }
    } else if (!slide.anchorType && slide.href) {
      Linking.openURL(slide.href);
    }
  };
  useEffect(() => {
    if (!four) {
      handleGetOneBanner();
    } else if (four) handleGetFourLoading();
  }, []);
  if (!four && data)
    return (
      <View style={styles.oneItemContainer}>
        <TouchableWithoutFeedback
          onPress={() => handlePressOnItem(data.slides[0])}
        >
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 15,
              // backgroundColor: "red",
            }}
            resizeMode="cover"
            source={
              data.slides[0]?.address
                ? {
                    uri:
                      baseURL +
                      data.slides[0].address +
                      "/" +
                      data.slides[0].name,
                  }
                : require("../assets/default.jpg")
            }
          />
        </TouchableWithoutFeedback>
      </View>
    );
  else if (four && data)
    return (
      <View style={styles.fourItemContainer}>
        <View style={styles.fourRowContainer}>
          <View style={styles.fourImageContainer}>
            <TouchableWithoutFeedback
              onPress={() => handlePressOnItem(data.slides[0])}
            >
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 15 }}
                resizeMode="cover"
                source={
                  data.slides[0]?.address
                    ? {
                        uri:
                          baseURL +
                          data.slides[0].address +
                          "/" +
                          data.slides[0].name,
                      }
                    : require("../assets/default.jpg")
                }
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.fourImageContainer}>
            <TouchableWithoutFeedback
              onPress={() => handlePressOnItem(data.slides[1])}
            >
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 15 }}
                resizeMode="cover"
                source={
                  data.slides[1]?.address
                    ? {
                        uri:
                          baseURL +
                          data.slides[1].address +
                          "/" +
                          data.slides[1].name,
                      }
                    : require("../assets/default.jpg")
                }
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.fourRowContainer}>
          <View style={styles.fourImageContainer}>
            <TouchableWithoutFeedback
              onPress={() => handlePressOnItem(data.slides[2])}
            >
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 15 }}
                resizeMode="cover"
                source={
                  data.slides[2]?.address
                    ? {
                        uri:
                          baseURL +
                          data.slides[2].address +
                          "/" +
                          data.slides[2].name,
                      }
                    : require("../assets/default.jpg")
                }
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.fourImageContainer}>
            <TouchableWithoutFeedback
              onPress={() => handlePressOnItem(data.slides[3])}
            >
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 15 }}
                resizeMode="cover"
                source={
                  data.slides[3]?.address
                    ? {
                        uri:
                          baseURL +
                          data.slides[3].address +
                          "/" +
                          data.slides[3].name,
                      }
                    : require("../assets/default.jpg")
                }
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  else return null;
};

const styles = StyleSheet.create({
  oneItemContainer: {
    // marginVertical: 20,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width,
    height: 150,
    overflow: "hidden",
  },
  fourItemContainer: {
    height: 250,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  fourRowContainer: {
    display: "flex",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fourImageContainer: {
    height: 120,
    width: "48%",
  },
});

export default Banner;
