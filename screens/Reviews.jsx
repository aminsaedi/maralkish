import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

import * as Progress from "react-native-progress";
import moment from "moment";
import "moment/locale/fa";
import { FontAwesome5 } from "@expo/vector-icons";

// components import
import AppView from "../components/AppView/AppView";
import Line from "../components/Line";

// api import
import { apiGetProductReviews } from "../api/products";
import colors from "../utilities/colors";
import pages from "./../navigation/routes";

const Reviews = ({ route, navigation }) => {
  const [reviews, setReviews] = useState();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const getProductReview = async () => {
    const { productId } = route.params;
    const result = await apiGetProductReviews(productId);
    if (result.status === 200) return setReviews(result.data);
  };

  const handleRatingBackground = (rating) => {
    if (rating === 0) return colors.zeroScore;
    else if (rating === 1) return colors.oneScore;
    else if (rating === 2) return colors.twoScore;
    else if (rating === 3) return colors.threeScore;
    else if (rating === 4) return colors.fourScore;
    else if (rating === 5) return colors.fiveScore;
    else return colors.fiveScore;
  };

  useEffect(() => {
    getProductReview();
  }, []);

  if (!reviews) return null;

  return (
    <AppView>
      <TouchableOpacity
        style={{
          backgroundColor: colors.primaryColor,
          position: "absolute",
          bottom: (windowHeight / 100) * 3,
          left: (windowWidth / 100) * 5,
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 35,
          display: "flex",
          flexDirection: "row-reverse",
          zIndex: 1,
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate(pages.newReview, { productId: 345277 })
        }
      >
        <Text
          style={{
            fontFamily: "primaryBold",
            color: colors.buttonTextColor,
            marginLeft: 5,
          }}
        >
          ثبت دیدگاه
        </Text>
        <FontAwesome5 name="comment" size={24} color={colors.buttonTextColor} />
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Progress.Bar
          progress={route.params.totalScore / 5}
          width={200}
          color={colors.fiveScore}
          height={7}
        />
        <Text style={{ fontFamily: "primaryBold", fontSize: 15 }}>
          امتیاز کلی : {route.params.totalScore}
        </Text>
      </View>
      <Line />
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.customerName.toString()}
        renderItem={({ item,index }) => (
          <View
            style={{
              //   backgroundColor: "green",
              width: "100%",
              //   height: 350,
              display: "flex",
              flexDirection: "row-reverse",
              paddingTop: 30,
              paddingBottom: 10,
              marginBottom : reviews.length-1 === index ? 100 : 0
            }}
          >
            <View
              style={{
                width: "15%",
                height: "100%",
              }}
            >
              <View
                style={{
                  backgroundColor: handleRatingBackground(item.rating),
                  width: "50%",
                  borderRadius: 5,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "primaryBold",
                    color: colors.white,
                  }}
                >
                  {item.rating + ".0"}
                </Text>
              </View>
            </View>
            <View
              style={{
                // backgroundColor: "red",
                width: "85%",
                height: "100%",
              }}
            >
              <Text
                style={{
                  fontFamily: "primaryBold",
                  fontSize: 15,
                  textAlign: "right",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontFamily: "primary",
                  textAlign: "right",
                  color: colors.gray,
                  fontSize: 13,
                  marginTop: 7,
                  marginBottom: 10,
                }}
              >
                {moment.locale("fa") && moment(item.datePublished).fromNow()}{" "}
                {item.customerName}{" "}
                {item.isBuyer && (
                  <Text style={{ color: colors.green }}>خریدار</Text>
                )}
              </Text>
              <Line
                marginHorizontal={0}
                style={{ width: "95%", marginLeft: "5%" }}
              />
              <Text
                style={{
                  textAlign: "right",
                  fontFamily: "primary",
                  paddingLeft: 20,
                  lineHeight: 30,
                }}
              >
                {item.description}
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={Line}
      />
    </AppView>
  );
};

export default Reviews;
