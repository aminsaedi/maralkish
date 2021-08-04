import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { baseURL } from "../api/client";
import colors from "../utilities/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import pages from "../navigation/routes";
import { useNavigation } from "@react-navigation/native";

const OrderHistoryCard = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.container, { marginTop: index === 0 ? 15 : null }]}
      onPress={() =>
        navigation.push(pages.orderDetail, { trackingId: item.trackingId })
      }
    >
      <View style={styles.flexRow}>
        <Text style={styles.priceText}>
          {item.finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          <Text style={styles.tomanText}>تومان</Text>{" "}
        </Text>
        <Text style={styles.uniqueIdText}>
          شناسه سفارش :{" "}
          <Text style={styles.uniqueIdValue}>{item.uniqueId}</Text>
        </Text>
      </View>
      <Text style={styles.dateText}>1400/04/04</Text>
      <View style={[styles.flexRow, { marginTop: 10, marginBottom: 5 }]}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={30}
          color={colors.secondaryTextColor}
        />
        <FlatList
          style={{ height: 50, width: "80%" }}
          contentContainerStyle={{ height: 50, width: "80%" }}
          horizontal
          inverted
          data={item.items}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item: itemImage }) => {
            return (
              <View style={{ width: 50, height: 50 }}>
                <Image
                  source={{ uri: baseURL + itemImage.imageAddress }}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            );
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginLeft: "2.5%",
    // height: 150,
    borderColor: colors.lightGray,
    borderWidth: 0.2,
    // margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 15,
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  flexRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  priceText: {
    fontFamily: "primaryBold",
    textAlign: "left",
    color: colors.black,
    fontSize: 16,
  },
  tomanText: {
    fontSize: 12,
  },
  uniqueIdText: {
    fontFamily: "primary",
    color: colors.secondaryTextColor,
  },
  uniqueIdValue: {
    color: colors.black,
    letterSpacing: 2,
    fontSize: 15,
  },
  dateText: {
    fontFamily: "primary",
    textAlign: "right",
    color: colors.secondaryTextColor,
  },
});

export default OrderHistoryCard;
