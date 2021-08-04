import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fa";

import { View, Text, TouchableOpacity } from "react-native";
import colors from "../utilities/colors";

const ReviewSquareContainer = ({ review, style, onLastItemPress, onPress }) => {
  if (review.isLastItem)
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={onLastItemPress}
        >
          <MaterialCommunityIcons
            name="arrow-left-circle-outline"
            size={40}
            color={colors.seconadryColor}
          />
          <Text
            style={{ fontFamily: "primary", color: colors.black, fontSize: 12 }}
          >
            {review.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  return (
    <TouchableOpacity
      style={[
        {
          width: 300,
          height: 220,
          borderRadius: 5,
          // borderColor: colors.lightGray,
          // borderWidth: 1.2,
          backgroundColor: colors.white,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          margin: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        },
        style,
      ]}
      onPress={onPress}
    >
      <View
        style={{
          height: "15%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "primaryBold",
            fontSize: 17,
            textAlign: "right",
            marginRight: 15,
            // marginTop: 10,
          }}
          numberOfLines={1}
        >
          {review.title}
        </Text>
      </View>

      <View style={{ height: "70%" }}>
        <Text
          style={{
            fontFamily: "primary",
            // overflow: "hidden",
            marginHorizontal: 15,
            textAlign: "right",
            lineHeight: 25,
            // marginTop : "5%"
          }}
          numberOfLines={6}
        >
          {review.description}
        </Text>
      </View>
      <View
        style={{
          height: "15%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {review.isBuyer && (
          <Text
            style={{
              color: colors.green,
              fontFamily: "primary",
              marginRight: 5,
            }}
          >
            خریدار کالا
          </Text>
        )}
        <Text
          style={{
            fontFamily: "primary",
            marginRight: 5,
            // marginBottom: 5,
            textAlign: "right",
            color: colors.secondaryTextColor,
            fontSize: 13,
          }}
        >
          {moment.locale("fa") && moment(review.datePublished).fromNow()}
        </Text>
        <MaterialCommunityIcons
          name="checkbox-blank-circle"
          color={colors.secondaryTextColor}
          size={5}
          style={{ marginTop: 2.5 }}
        />
        <Text
          style={{
            fontFamily: "primary",
            marginRight: 10,
            marginLeft : 5,
            // marginBottom: 5,
            textAlign: "right",
            color: colors.secondaryTextColor,
            fontSize: 13,
          }}
        >
          {review.customerName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReviewSquareContainer;
