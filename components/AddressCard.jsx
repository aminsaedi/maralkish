import React from "react";

import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utilities/colors";

const AddressCard = ({ address, onEdit, onDelete }) => {
  return (
    <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
      <Text
        style={{
          fontFamily: "primary",
          textAlign: "right",
          lineHeight: 25,
          marginBottom: 15,
          fontSize : 16
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
        <Ionicons name="logo-closed-captioning" size={15} color={colors.gray} />
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
      <View
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => onEdit(address)}
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 15,
              color: colors.seconadryColor,
              marginLeft: 10,
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
        <TouchableOpacity
          onPress={() => {
            Alert.alert("حذف آدرس", "آیا از حذف آدرس اطمینان داید؟", [
              { text: "بیخیال", style: "cancel" },
              {
                text: "حدف",
                style: "default",
                onPress: () => onDelete(address.id),
              },
            ]);
          }}
          style={{padding:5}}
        >
          <Ionicons name="trash" size={20} color={colors.primaryColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressCard;
