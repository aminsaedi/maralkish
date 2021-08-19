import React, { useContext } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import AppView from "../components/AppView/AppView";
import colors from "../utilities/colors";
import { apiGetLogo } from "../api/util";
import AuthContext from "../auth/context";
import pages from "../navigation/routes";
import AuthStorage from "../auth/storage";
import useAuth from "../auth/useAuth";
import StoreSettingContext from "./../utilities/storeSettingContext";

const Settings = () => {
  const storeStettings = useContext(StoreSettingContext);
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const options = [
    // {
    //   id: 1,
    //   name: "پرسش‌های متداول",
    //   icon: "build-outline",
    //   mode: "link",
    //   link: "https://google.com",
    // },
    {
      id: 2,
      name: "حریم خصوصی",
      icon: "lock-closed-outline",
      mode: "link",
      page: pages.privacy,
    },
    {
      id: 3,
      name: "شرایط استفاده",
      icon: "document-text-outline",
      mode: "link",
      page: pages.termOfUse,
    },
    {
      id: 4,
      name: "تماس با ما",
      icon: "call-outline",
      mode: "link",
      page: pages.contactUs,
    },
    {
      id: 5,
      name: "گزارش خطا",
      icon: "bug-outline",
      mode: "link",
      page: pages.contactUs,
    },
    // {
    //   id: 6,
    //   name: `امتیاز به ${storeStettings.faName || "فروشگاه"}`,
    //   icon: "star-outline",
    //   mode: "link",
    //   link: "https://google.com",
    // },
  ];

  if (user) {
    options.push({
      id: 7,
      name: "خروج از حساب کاربری",
      icon: "log-out-outline",
      mode: "logout",
      link: "",
    });
  }

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        // alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          // contentContainerStyle={{flex : 1}}
          style={{ flex: 1 }}
          data={options}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 15,
              }}
              onPress={() => {
                if (item.mode === "logout") {
                  Alert.alert(
                    "خروج از حساب",
                    "آیا میخواهید از حساب کاربری خارج شوید؟",
                    [
                      {
                        text: "خروج",
                        style: "default",
                        onPress: async () => {
                          logout();
                          navigation.navigate(pages.home);
                        },
                      },
                      { text: "بیخیال", style: "cancel" },
                    ]
                  );
                } else if (item.page)
                  navigation.navigate(item.page, { title: item.name });
              }}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={item.mode !== "logout" ? colors.gary : colors.danger}
              />
              <Text
                style={{
                  fontFamily: "primary",
                  flex: 1,
                  textAlign: "right",
                  color: item.mode !== "logout" ? colors.black : colors.danger,
                  marginRight: 20,
                  fontSize: 15,
                }}
              >
                {item.name}
              </Text>
              <Ionicons
                name={item.icon}
                size={25}
                color={item.mode !== "logout" ? colors.gray : colors.danger}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableWithoutFeedback
        style={{
          width: "100%",
          // height: "15%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        onPress={() => {
          Linking.openURL("https://profishop.ir");
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Image
            source={{ uri: apiGetLogo }}
            style={{ width: "50%", height: 20 }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: colors.gray,
              textAlign: "center",
              fontSize: 10,
              marginTop: 10,
            }}
          >
            App version : {Constants.manifest.version}
          </Text>
          <Text
            style={{
              color: colors.gray,
              textAlign: "center",
              fontSize: 10,
              marginBottom: 3,
            }}
          >
            Powered By Profishop
          </Text>
          <Image
            source={require("../assets/profishop.png")}
            style={{ width: "50%", height: 20, marginBottom: 5 }}
            resizeMode="contain"
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Settings;
