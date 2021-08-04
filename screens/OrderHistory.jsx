import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import AppView from "./../components/AppView/AppView";
import { TabView, SceneMap } from "react-native-tab-view";
import colors from "../utilities/colors";
import { apiGetOrderHistory } from "../api/users";
import OrderHistoryCard from "../components/OrderHistoryCard";
import LottieView from "lottie-react-native";
import SubHeaderFlat from "./Categories/SubHeaderFlat";
import { isArray } from "lodash";

const OrderHistory = ({ navigation, route }) => {
  const [index, setIndex] = useState(route.params?.index || 0);
  const tabRef = useRef();
  const [routes] = useState([
    { key: "pending", title: "در حال پردازش" },
    { key: "ready", title: "آماده به ارسال" },
    { key: "sent", title: "ارسال شده" },
    { key: "rested", title: "توزیع شده" },
    { key: "done", title: "تکمیل شده" },
    { key: "returned", title: "بازگشتی" },
    { key: "canceled", title: "انصرافی" },
  ]);
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(false);
  const getHistory = async () => {
    try {
      setLoading(true)
      const result = await apiGetOrderHistory();
      if (result.status === 200) setHistory(result.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  useEffect(() => {
    getHistory();
  }, []);

  const initialLayout = { width: Dimensions.get("window").width };

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const currentPageIndex = props.navigationState.index;
    return (
      <View>
        <FlatList
          initialScrollIndex={route.params?.index || 0}
          showsHorizontalScrollIndicator={false}
          horizontal
          ref={tabRef}
          //   inverted
          data={props.navigationState.routes}
          keyExtractor={(i) => i.key}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(index)}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isArray(history) && (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor:
                        index === currentPageIndex
                          ? colors.primaryColor
                          : colors.gray,
                      marginRight: 5,
                      borderRadius: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isArray(history) && (
                      <Text
                        style={{ fontFamily: "primary", color: colors.buttonTextColor }}
                      >
                        {
                          history.filter(
                            (orderItem) =>
                              orderItem.state === item.key.toString()
                          ).length
                        }
                      </Text>
                    )}
                  </View>
                )}
                <Text
                  style={{
                    fontFamily: "primary",
                    color:
                      index === currentPageIndex
                        ? colors.primaryColor
                        : colors.gray,
                  }}
                >
                  {item.title}
                </Text>
              </View>

              <View
                style={{
                  width: "95%",
                  height: 3,
                  backgroundColor:
                    index === currentPageIndex
                      ? colors.primaryColor
                      : colors.white,
                  borderRadius: 2,
                  marginTop: 10,
                }}
              ></View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const PendingPage = () => (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <FlatList
        data={
          isArray(history) &&
          history.filter((orderItem) => orderItem.state === "pending")
        }
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item, index }) => (
          <OrderHistoryCard item={item} index={index} />
        )}
        ListEmptyComponent={
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              source={require("../assets/search.json")}
              autoPlay
              autoSize
              loop
              style={{ width: 250, height: 250 }}
            />
            <Text style={{ fontFamily: "primary" }}>
              شما سفارشی در این وضعیت ندارید
            </Text>
          </View>
        }
      />
    </View>
  );
  const ReadyPage = () => (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <FlatList
        data={
          isArray(history) &&
          history.filter((orderItem) => orderItem.state === "ready")
        }
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item, index }) => (
          <OrderHistoryCard item={item} index={index} />
        )}
        ListEmptyComponent={
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              source={require("../assets/search.json")}
              autoPlay
              autoSize
              loop
              style={{ width: 250, height: 250 }}
            />
            <Text style={{ fontFamily: "primary" }}>
              شما سفارشی در این وضعیت ندارید
            </Text>
          </View>
        }
      />
    </View>
  );
  const SentPage = () => (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <FlatList
        data={
          isArray(history) &&
          history.filter((orderItem) => orderItem.state === "sent")
        }
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item, index }) => (
          <OrderHistoryCard item={item} index={index} />
        )}
        ListEmptyComponent={
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              source={require("../assets/search.json")}
              autoPlay
              autoSize
              loop
              style={{ width: 250, height: 250 }}
            />
            <Text style={{ fontFamily: "primary" }}>
              شما سفارشی در این وضعیت ندارید
            </Text>
          </View>
        }
      />
    </View>
  );
  const RestedPage = () => (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <FlatList
        data={
          isArray(history) &&
          history.filter((orderItem) => orderItem.state === "rested")
        }
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item, index }) => (
          <OrderHistoryCard item={item} index={index} />
        )}
        ListEmptyComponent={
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              source={require("../assets/search.json")}
              autoPlay
              autoSize
              loop
              style={{ width: 250, height: 250 }}
            />
            <Text style={{ fontFamily: "primary" }}>
              شما سفارشی در این وضعیت ندارید
            </Text>
          </View>
        }
      />
    </View>
  );
  const DonePage = () => (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <FlatList
        data={
          isArray(history) &&
          history.filter((orderItem) => orderItem.state === "done")
        }
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item, index }) => (
          <OrderHistoryCard item={item} index={index} />
        )}
        ListEmptyComponent={
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              source={require("../assets/search.json")}
              autoPlay
              autoSize
              loop
              style={{ width: 250, height: 250 }}
            />
            <Text style={{ fontFamily: "primary" }}>
              شما سفارشی در این وضعیت ندارید
            </Text>
          </View>
        }
      />
    </View>
  );
  const ReturnedPage = () => (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <FlatList
        data={
          isArray(history) &&
          history.filter((orderItem) => orderItem.state === "returned")
        }
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item, index }) => (
          <OrderHistoryCard item={item} index={index} />
        )}
        ListEmptyComponent={
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              source={require("../assets/search.json")}
              autoPlay
              autoSize
              loop
              style={{ width: 250, height: 250 }}
            />
            <Text style={{ fontFamily: "primary" }}>
              شما سفارشی در این وضعیت ندارید
            </Text>
          </View>
        }
      />
    </View>
  );
  const CanceledPage = () => (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <FlatList
        data={
          isArray(history) &&
          history.filter((orderItem) => orderItem.state === "canceled")
        }
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item, index }) => (
          <OrderHistoryCard item={item} index={index} />
        )}
        ListEmptyComponent={
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              source={require("../assets/search.json")}
              autoPlay
              autoSize
              loop
              style={{ width: 250, height: 250 }}
            />
            <Text style={{ fontFamily: "primary" }}>
              شما سفارشی در این وضعیت ندارید
            </Text>
          </View>
        }
      />
    </View>
  );

  const renderScene = SceneMap({
    canceled: CanceledPage,
    pending: PendingPage,
    ready: ReadyPage,
    sent: SentPage,
    rested: RestedPage,
    done: DonePage,
    returned: ReturnedPage,
  });


  if(loading) return (
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
        loop
      />
    </View>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
      renderTabBar={renderTabBar}
      onSwipeEnd={(t) =>
        tabRef.current.scrollToIndex({ index, viewPosition: 0.5 })
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  scene: {
    flex: 1,
    // paddingHorizontal: 15,
  },
  tabBar: {
    flexDirection: "row",
    height: 50,
  },
  tabItem: {
    display: "flex",
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    // padding: 16,
    // marginVertical : 10,
    // paddingVertical :10,
    marginTop: 10,
  },
});

export default OrderHistory;
