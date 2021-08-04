import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

// componets import
import AppView from "./../components/AppView/AppView";
import SearchHistoryItem from "./../components/SearchHistoryItems";

// utils import
import colors from "../utilities/colors";

// apis import
import { apiSeach } from "../api/util";
import ProductHorizentalItem from "../components/ProductHorizentalItem";
import pages from "./../navigation/routes";
import Line from "../components/Line";

const Search = ({ navigation, route }) => {
  const [searchString, setSearchString] = useState();
  const [historyItems, setHistoryItems] = useState();
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const windowWidth = Dimensions.get("window").width;

  const getHistoryItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("searchHistory");
      if (JSON.parse(jsonValue).values)
        setHistoryItems(JSON.parse(jsonValue).values);
    } catch (e) {
      // error reading value
    }
  };

  const handleSearch = async (key) => {
    setLoading(true);
    try {
      const result = await apiSeach(key || searchString);
      if (result.status === 200) setResults(result.data);
      setLoading(false);
    } catch (error) {
      alert("خطایی رخ داد");
      setLoading(false);
    }
  };

  const addItemToHistory = async (value) => {
    console.log("adding item");
    let copy = await AsyncStorage.getItem("searchHistory");
    if (!copy) {
      copy = { values: [] };
    } else if (typeof copy === "string") {
      copy = JSON.parse(copy);
    }
    copy.values = [value.toString(), ...copy.values];
    await AsyncStorage.setItem("searchHistory", JSON.stringify(copy));
  };

  const onSubmit = async () => {
    if (searchString && searchString === "sudoMode") {
      inputRef?.current?.clear();
      inputRef?.current?.blur();
      return navigation.navigate(pages.sudoMode);
    }
    if (searchString) {
      inputRef?.current?.blur();
      addItemToHistory(searchString);
      handleSearch();
    }
  };

  useEffect(() => {
    if (!results) inputRef.current.focus();
    getHistoryItems();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: colors.white,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <LottieView
          style={{ width: 200, height: 200 }}
          source={require("../assets/spinner.json")}
          autoPlay
        />
      </View>
    );
  }

  return (
    <AppView isSAfe>
      <View
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          marginTop: 10,
          backgroundColor: searchString ? colors.inputBackgroundColor : null,
          paddingVertical: searchString ? 10 : null,
          borderRadius: 10,
          marginHorizontal: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
          <MaterialCommunityIcons name="arrow-right" size={25} />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          placeholder={`جستجو در ${route.params?.searchTitle || "همه کالاها"}`}
          placeholderTextColor={colors.inputPlaceholderColor}
          style={{
            fontFamily: "primary",
            flex: 1,
            textAlign: "right",
            direction: "rtl",
            fontSize: 19,
          }}
          value={searchString}
          onChangeText={(input) => {
            if (input) setSearchString(input);
            else setSearchString(undefined);
          }}
          onSubmitEditing={onSubmit}
        />
        {searchString && searchString.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchString(undefined);
              setResults(undefined);
            }}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      {!searchString && (
        <View
          style={{
            width: "96%",
            height: 2,
            backgroundColor: colors.seconadryColor,
            marginTop: 10,
            marginLeft: "2%",
          }}
        />
      )}
      {historyItems && !results && (
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            width: "100%",
            alignItems: "center",
            // justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 30,
          }}
        >
          <MaterialCommunityIcons
            name="clock-outline"
            size={25}
            color={colors.gray}
          />
          <Text
            style={{
              fontFamily: "primary",
              fontSize: 15,
              textAlign: "right",
              flex: 1,
              marginRight: 10,
            }}
          >
            تاریخچه جستجوهای شما
          </Text>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem("searchHistory", "");
              setHistoryItems(undefined);
            }}
          >
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={25}
              color={colors.gray}
            />
          </TouchableOpacity>
        </View>
      )}
      {historyItems && !results && (
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={historyItems}
            keyExtractor={(i) => i.toString()}
            renderItem={({ item }) => (
              <SearchHistoryItem
                value={item}
                onPress={() => {
                  setSearchString(item);
                  handleSearch(item);
                }}
              />
            )}
            horizontal
            inverted
          />
        </View>
      )}
      {results && (
        <FlatList
          data={results}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => <ProductHorizentalItem product={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View>
              <View
                style={{
                  width: windowWidth,
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LottieView
                  source={require("../assets/search.json")}
                  autoPlay
                  loop
                  style={{ width: "100%", height: "100%" }}
                  autoSize
                />
              </View>
              <Text
                style={{
                  fontFamily: "primaryBold",
                  textAlign: "center",
                  fontSize: 25,
                }}
              >
                آیتمی یافت نشد
              </Text>
            </View>
          }
          ItemSeparatorComponent={Line}
        />
      )}
    </AppView>
  );
};

export default Search;
