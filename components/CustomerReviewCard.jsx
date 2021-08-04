import React, { useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../utilities/colors";
import Line from "./Line";
import Modal from "react-native-modal";
import moment from "moment";
import "moment/locale/fa";
import pages from "./../navigation/routes";
import { baseURL } from "../api/client";

const CustomerReviewCard = ({ review, onDelete, onEdit }) => {
  const navigation = useNavigation();
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const handleRatingBackground = (rating) => {
    if (rating === 0) return colors.zeroScore;
    else if (rating === 1) return colors.oneScore;
    else if (rating === 2) return colors.twoScore;
    else if (rating === 3) return colors.threeScore;
    else if (rating === 4) return colors.fourScore;
    else if (rating === 5) return colors.fiveScore;
    else return colors.fiveScore;
  };
  return (
    <View style={styles.container}>
      <Modal
        isVisible={actionModalVisible}
        style={{
          justifyContent: "flex-start",
          margin: 0,
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
        onBackButtonPress={() => setActionModalVisible(false)}
        onBackdropPress={() => setActionModalVisible(false)}
        backdropOpacity={0.4}
        backdropTransitionOutTiming={1000}
        backdropTransitionInTiming={1000}
      >
        <View style={{ backgroundColor: colors.white }}>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              navigation.push(pages.newReview, {
                title: review.title,
                description: review.description,
                rating: review.rating,
                productId : review.productId,
              });
              setActionModalVisible(false);
            }}
          >
            <Text style={styles.modalItemText}>ویرایش دیدگاه</Text>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={30}
              color={colors.black}
            />
          </TouchableOpacity>
          <Line />
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              setActionModalVisible(false);
              onDelete(review.productId);
            }}
          >
            <Text style={styles.modalItemText}>حذف دیدگاه</Text>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={30}
              color={colors.danger}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>{review.title}</Text>
        <View
          style={[
            styles.ratingContainer,
            { backgroundColor: handleRatingBackground(review.rating) },
          ]}
        >
          <Text style={styles.ratingText}>{review.rating + ".0"}</Text>
        </View>
        <Line />
        <Text style={styles.descriptionText}>{review.description}</Text>
        <Line />
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => setActionModalVisible(true)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={25}
              color={colors.secondaryTextColor}
            />
          </TouchableOpacity>
          <Text style={styles.datePublishedText}>
            {moment.locale("fa") && moment(review.datePublished).fromNow()}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          navigation.push(pages.product, {
            productId: review.productId,
          });
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
          }}
        >
          {review.image.address && (
            <Image
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
              source={{
                uri: baseURL + review.image.address + "/" + review.image.name,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  imageContainer: {
    width: "20%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: "2.5%",
  },
  detailsContainer: {
    width: "80%",
    paddingLeft: 10,
  },
  titleText: {
    fontFamily: "primaryBold",
    fontSize: 17,
    textAlign: "right",
  },
  ratingContainer: {
    paddingVertical: 2.5,
    backgroundColor: colors.fiveScore,
    width: 30,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "flex-end",
  },
  ratingText: {
    fontFamily: "primaryBold",
    fontSize: 13,
    color: colors.white,
    textAlign: "center",
  },
  descriptionText: {
    fontFamily: "primary",
    fontSize: 15,
    lineHeight: 25,
    textAlign: "right",
    marginBottom: 10,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  datePublishedText: {
    fontFamily: "primary",
    color: colors.secondaryTextColor,
  },
  modalItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: 50,
    paddingVertical: 10,
    paddingRight: 10,
  },
  modalItemText: {
    fontFamily: "primary",
    fontSize: 15,
    marginRight: 25,
  },
});

export default CustomerReviewCard;
