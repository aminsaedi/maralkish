import React from "react";
import moment from "moment";
import "moment/locale/fa";
import { Text, Image, View, TouchableOpacity, FlatList } from "react-native";
import colors from "../utilities/colors";

import { Ionicons } from "@expo/vector-icons";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";

const Message = ({ item, onPress, messageTypes }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 10,
      }}
      onPress={onPress}
    >
      <View style={{ width: "85%", height: "100%" }}>
        <Text
          style={{
            fontFamily: "primaryBold",
            fontSize: 18,
            textAlign: "right",
            // width : "90%",
            marginLeft: "5%",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: "primary",
            color: colors.secondaryTextColor,
            textAlign: "right",
            marginTop: 10,
            marginLeft : "5%"
          }}
        >
          {item.subTitle}
        </Text>
        {item.images && (
          <View style={{ width: "100%", height: 75, marginTop: 10 }}>
            <FlatList
              data={item.images}
              horizontal
              inverted
              keyExtractor={(i) => i.id.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: imageLinkGenerator(item) }}
                  style={{ height: 75, width: 75 }}
                  resizeMode="contain"
                />
              )}
            />
          </View>
        )}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            marginTop: item.images ? 20 : 40,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Ionicons
              name="chevron-back"
              color={colors.seconadryColor}
              size={15}
            />
            <Text
              style={{ fontFamily: "primary", color: colors.seconadryColor }}
            >
              {item.moreDetailTitle}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "primary",
              color: colors.secondaryTextColor,
              fontSize: 13,
            }}
          >
            {moment.locale("fa") && moment(item.date).fromNow()}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "15%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: messageTypes.find((i) => i.id === item.typeId)
              .activeColor,
            padding: 2,
            borderRadius: 100,
            width: 35,
            height: 35,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name={messageTypes.find((i) => i.id === item.typeId).icon}
            size={25}
            color={colors.white}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Message;
