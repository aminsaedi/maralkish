import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../utilities/colors";
import Line from "../../components/Line";
import pages from "./../../navigation/routes";

const CustomHeader = ({
  scene,
  previous,
  navigation,
  setSortModalVisible,
  setFilterModalVisible,
}) => {
  const { options } = scene.descriptor;
  const title = options.headerTitle || "فروشگاه";
  const sortMethod = options.selectedSortMethod?.name || "مرتب سازی";

  return (
    <View
      style={{
        width: "100%",
        height: 130,
        paddingTop: getStatusBarHeight(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: colors.inputBackgroundColor,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          height: "42.5%",
          marginTop : "2.5%",
          paddingHorizontal: 5,
          width: "95%",
          borderRadius: 10,
        }}
        onPress={() => navigation.push(pages.search)}
      >
        <Text
          style={{
            fontFamily: "primary",
            textAlign: "right",
            color: colors.inputPlaceholderColor,
            fontSize: 17,
          }}
        >
          جستجو در {title}
        </Text>
        <TouchableOpacity
          style={{ marginLeft: 10, paddingLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-right" size={25} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={{
          width: "94%",
          height: "55%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 5,
          }}
          onPress={() => setSortModalVisible(true)}
        >
          <Text style={{ fontFamily: "primaryBold", fontSize: 13 }}>
            {sortMethod}
          </Text>
          <MaterialCommunityIcons name="sort-variant" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 20,
            paddingVertical: 5,
          }}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text style={{ fontFamily: "primaryBold", fontSize: 13 }}>
            فیلترها
          </Text>
          <Ionicons name="options-outline" size={25} />
        </TouchableOpacity>
      </View>
      {/* <Line style={{ height: "1%" }} /> */}
    </View>
  );
};

export default CustomHeader;
