import React from "react";

import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../utilities/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import pages from "./../navigation/routes";

const AddressSelectorCard = ({ address, onPress, isActive,onEdit }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={{
          height: "100%",
          width: "90%",
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "primary",
            textAlign: "right",
            lineHeight: 25,
            marginBottom: 15,
            fontSize: 16,
          }}
        >
          {address.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 14,
              textAlign: "right",
              marginRight: 10,
            }}
          >
            {address.cityName + "٬ " + address.stateName}
          </Text>
          <Ionicons
            name="logo-closed-captioning"
            size={15}
            color={colors.gray}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 14,
              textAlign: "right",
              marginRight: 10,
            }}
          >
            {address.postalCode}
          </Text>
          <Ionicons name="mail" size={15} color={colors.gray} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 14,
              textAlign: "right",
              marginRight: 10,
            }}
          >
            {address.mobile || address.phone}
          </Text>
          <Ionicons name="call" size={15} color={colors.gray} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 14,
              textAlign: "right",
              marginRight: 10,
            }}
          >
            {address.firstName + " " + address.lastName}
          </Text>
          <Ionicons name="person" size={15} color={colors.gray} />
        </View>
        <TouchableOpacity
          onPress={() =>
            onEdit(address)
          }
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingVertical : 10
          }}
        >
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 15,
              color: colors.seconadryColor,
              marginLeft: 5,
            }}
          >
            ویرایش آدرس
          </Text>
          <Ionicons
            name="chevron-back"
            color={colors.seconadryColor}
            style={{ marginTop: 4 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%", width: "10%" }}>
        <View
          style={[
            styles.outerCircle,
            { borderColor: isActive ? colors.seconadryColor : colors.gray },
          ]}
        >
          {isActive && <View style={styles.innerCircle}></View>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    marginTop: 5,
  },
  outerCircle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    // borderColor: colors.seconadryColor,
    borderWidth: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.seconadryColor,
  },
});

export default AddressSelectorCard;
