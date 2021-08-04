import React, { useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import * as Clipboard from "expo-clipboard";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utilities/colors";
import AppButton from "./Form/AppButton";
import { isArray } from "lodash";

const BankCartSelector = ({ accounts, amount }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const sliderRef = useRef();

  if (!accounts) return null;

  const Cart = ({ item }) => (
    <View style={styles.cartContainer}>
      <Text style={styles.bankName}>بانک {item.bankName || ""}</Text>
      {item.accountNumber && (
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            Clipboard.setString(item.accountNumber || "");
          }}
        >
          {Platform.OS === "android" ? (
            <MaterialCommunityIcons
              name="content-copy"
              size={15}
              color={colors.seconadryColor}
            />
          ) : (
            <Ionicons
              name="copy-outline"
              size={15}
              color={colors.seconadryColor}
            />
          )}
          <Text style={styles.accountNumberPlaceholder}>شماره حساب</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.accountNumber}>{item.accountNumber || ""}</Text>
      {item.sheba && (
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            Clipboard.setString(item.sheba || "");
          }}
        >
          {Platform.OS === "android" ? (
            <MaterialCommunityIcons
              name="content-copy"
              size={15}
              color={colors.seconadryColor}
            />
          ) : (
            <Ionicons
              name="copy-outline"
              size={15}
              color={colors.seconadryColor}
            />
          )}
          <Text style={styles.shebaPlaceholder}>شماره شبا</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.sheba}>{item.sheba || ""}</Text>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          Clipboard.setString(item.cardNumber || "");
        }}
      >
        {Platform.OS === "android" ? (
          <MaterialCommunityIcons
            name="content-copy"
            size={15}
            color={colors.seconadryColor}
          />
        ) : (
          <Ionicons
            name="copy-outline"
            size={15}
            color={colors.seconadryColor}
          />
        )}
        <Text style={styles.cardNumberPlaceholder}>شماره کارت</Text>
      </TouchableOpacity>
      <Text style={styles.cardNumber}>
        {item.cardNumber.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-") || ""}
      </Text>
      <Text style={styles.description}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {accounts && accounts.length > 1 && (
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            style={styles.topButton}
            onPress={() => sliderRef.current.snapToPrev(true)}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              color={colors.primaryColor}
              size={15}
            />
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 15,
                color: colors.primaryColor,
              }}
            >
              قبلی
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topButton}
            onPress={() => sliderRef.current.snapToNext(true)}
          >
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 15,
                color: colors.primaryColor,
              }}
            >
              بعدی
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              color={colors.primaryColor}
              size={15}
            />
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.amount}>
        مبلغ :{" "}
        {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " تومان"}
      </Text>
      <Carousel
        initialScrollIndex={0}
        ref={sliderRef}
        data={accounts}
        renderItem={Cart}
        sliderHeight={240}
        sliderWidth={Dimensions.get("screen").width}
        itemHeight={190}
        itemWidth={(Dimensions.get("screen").width / 100) * 85}
        loop
        onSnapToItem={(i) => setActiveCardIndex(i)}
        useScrollView
        // windowSize={}
        vertical={true}
      />
      <AppButton
        value="کپی شماره کارت"
        outline
        style={styles.copyButton}
        onPress={() => {
          if (!isArray(accounts)) return;
          if (!accounts[activeCardIndex].cardNumber) return null;
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          Clipboard.setString(accounts[activeCardIndex].cardNumber);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  topButtonsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  topButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.primaryColor,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
  copyButton: {
    marginVertical: 10,
  },
  cartContainer: {
    height: 190,
    width: (Dimensions.get("screen").width / 100) * 85,
    backgroundColor: colors.primaryColor,
    borderColor: colors.seconadryColor,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "space-around",
  },
  bankName: {
    fontFamily: "primaryBold",
    fontSize: 20,
    color: colors.buttonTextColor,
    textAlign: "right",
  },
  accountNumberPlaceholder: {
    fontFamily: "primary",
    fontSize: 13,
    color: colors.buttonTextColor,
    textAlign: "center",
    marginLeft: 5,
  },
  cardNumberPlaceholder: {
    fontFamily: "primary",
    fontSize: 13,
    color: colors.buttonTextColor,
    textAlign: "center",
    marginLeft: 5,
  },
  shebaPlaceholder: {
    fontFamily: "primary",
    fontSize: 13,
    color: colors.buttonTextColor,
    textAlign: "center",
    marginLeft: 5,
  },
  sheba: {
    fontFamily: "primaryBold",
    color: colors.buttonTextColor,
    fontSize: 14,
    textAlign: "center",
    letterSpacing: 3,
  },
  cardNumber: {
    fontFamily: "primaryBold",
    color: colors.buttonTextColor,
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 3,
  },
  accountNumber: {
    fontFamily: "primaryBold",
    color: colors.buttonTextColor,
    fontSize: 14,
    textAlign: "center",
    letterSpacing: 3,
  },
  amount: {
    fontFamily: "primary",
    color: colors.black,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 5,
  },
  description: {
    fontFamily: "primary",
    color: colors.gray,
    textAlign: "right",
    fontSize: 13,
  },
});

export default BankCartSelector;
