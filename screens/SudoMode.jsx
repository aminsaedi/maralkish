import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  StyleSheet,
  DevSettings,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiGetServerTime } from "../api/util";

import authStorage from "../auth/storage";
import { setNoficationToken } from "../utilities/notificationTokenStorage";

const SudoMode = ({ navigation }) => {
  const [timeDiff, setTimeDiff] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [isFirstRun, setIsFirstRun] = useState("");
  const [cartUniqueId, setCartUniqueId] = useState("");
  const [searchHistory, setSearchHistory] = useState("");
  const [noticationToken, setNotificationToken] = useState("");

  const getTimeDiff = async () => {
    try {
      const serverTime = await apiGetServerTime();
      if (serverTime.status === 200) {
        const currentTime = Date.now();
        const diff = serverTime.data - currentTime;
        setTimeDiff(diff);
      }
    } catch (error) {
      alert("Error getting server time");
    }
  };

  const handleRemoveAllKeysInAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert("Async storage cleared suuccessfully!");
    } catch (error) {
      alert("Error clearing AsyncStorage " + error?.toString());
    }
    // TODO: clear all token
  };

  const getAccessToken = async () => {
    const result = await authStorage.getToken();
    setAccessToken(result.toString());
  };

  const getRefreshToken = async () => {
    const result = await authStorage.getRefreshToken();
    setRefreshToken(result.toString());
  };

  const getIsFirstRun = async () => {
    const result = await AsyncStorage.getItem("isFirstRun");
    setIsFirstRun(result ? result.toString() : "null");
  };

  const getCartUniqueId = async () => {
    const result = await AsyncStorage.getItem("cartId");
    setCartUniqueId(result);
  };

  const getSearchHistory = async () => {
    const result = await AsyncStorage.getItem("searchHistory");
    setSearchHistory(result);
  };

  const getNotificationToken = async () => {
    const result = await AsyncStorage.getItem("notificationToken");
    setNotificationToken(result);
  };

  const handleSetIsFirstRun = async (value) => {
    try {
      await AsyncStorage.setItem("isFirstRun", value);
      setIsFirstRun(value);
    } catch (error) {
      alert("Error changing is first run");
    }
  };

  const handleCleartIsFirstRun = async () => {
    try {
      await AsyncStorage.removeItem("isFirstRun");
      setIsFirstRun("null");
    } catch (error) {
      alert("Error removeing is frst run token");
    }
  };

  const handleClearCartId = async () => {
    try {
      await AsyncStorage.removeItem("cartId");
      setCartUniqueId("");
    } catch (error) {
      alert("Error clearing cart unique id");
    }
  };

  const handleClearRefreshToken = async () => {
    try {
      await AsyncStorage.removeItem("refreshToken");
      setRefreshToken(undefined);
    } catch (error) {
      alert("Error clearing refresh token");
    }
  };

  const handleClearAccessToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setAccessToken(undefined);
    } catch (error) {
      alert("Error clearing access token");
    }
  };

  const handleClearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem("searchHistory");
      setSearchHistory("");
    } catch (error) {
      alert("Error clearing search history");
    }
  };

  const handleClearNotificationToken = async () => {
    try {
      await AsyncStorage.removeItem("notificationToken");
      setNoficationToken("");
    } catch (error) {
      alert("Error clearing notification token");
    }
  }

  const useEffectItems = () => {
    getTimeDiff();
    getAccessToken();
    getRefreshToken();
    getIsFirstRun();
    getCartUniqueId();
    getSearchHistory();
    getNotificationToken();
  };

  useEffect(() => {
    useEffectItems();
  }, []);

  // return null;

  return (
    <ScrollView>
      <Text style={{ color: "red", fontSize: 25, textAlign: "center" }}>
        Welcome to sudo mode
      </Text>
      <View style={styles.marginer} />
      <View style={styles.marginer} />
      <Text>time diff with server (server - local) : {timeDiff}ms</Text>
      <View style={styles.marginer} />
      <Text>AsyncStorage</Text>
      <Button
        color="red"
        title="clear all keys (dangrous!)"
        onPress={handleRemoveAllKeysInAsyncStorage}
      ></Button>
      <View style={styles.marginer} />
      <Text>accessToken : {accessToken}</Text>
      <Button
        title="clear access token"
        onPress={handleClearAccessToken}
      ></Button>
      <View style={styles.marginer} />
      <Text>refreshToken : {refreshToken}</Text>
      <Button
        title="clear refresh token"
        onPress={handleClearRefreshToken}
      ></Button>
      <View style={styles.marginer} />
      <Text>cart unique Id : {cartUniqueId}</Text>
      <Button title="clear cart unique Id" onPress={handleClearCartId}></Button>
      <View style={styles.marginer} />
      <Text>
        isFirstRun : {isFirstRun} (bug! change key name to isNotFirstRun)
      </Text>
      <Button
        title="clear is FirstRun"
        onPress={handleCleartIsFirstRun}
      ></Button>
      <View style={styles.marginer} />
      <Button
        title="set is FirstRun true"
        onPress={() => handleSetIsFirstRun("true")}
      ></Button>
      <View style={styles.marginer} />
      <Button
        title="set is FirstRun false"
        onPress={() => handleSetIsFirstRun("false")}
      ></Button>
      <View style={styles.marginer} />
      <Text>search history : {searchHistory}</Text>
      <Button
        title="clear search history"
        onPress={handleClearSearchHistory}
      ></Button>
      <View style={styles.marginer} />
      <Text>notification token : {noticationToken}</Text>
      <Button
        title="clear notification token"
        onPress={handleClearNotificationToken}
      ></Button>
      <View style={styles.marginer} />
      <Button title="run use effect again" onPress={useEffectItems}></Button>
      <View style={styles.marginer} />
      <Button
        title="reload app"
        onPress={() => DevSettings.reload("Becuase I say.")}
      ></Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  marginer: {
    width: "100%",
    height: 5,
  },
});

export default SudoMode;
