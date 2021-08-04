import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  Text,
  FlatList,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import colors from "../utilities/colors";
import { apiDeleteReview } from "../api/reviews";

import ProductCardForAddNewReview from "../components/ProductCardForAddNewReview";
import Line from "./../components/Line";
import { apiGetMostViewdProducts } from "../api/products";
import {
  apiGetCustomerReviews,
  apiGetCustomerNotReviewdProducts,
} from "../api/reviews";
import LottieView from "lottie-react-native";
import CustomerReviewCard from "../components/CustomerReviewCard";

export default function CustomerReviews() {
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: "hasReview", title: "نظرات من" },
    { key: "waitingForReview", title: "در انتظار نظر" },
  ]);
  const [waitingProduct, setWaitingProducts] = useState();
  const [customerReviews, setCustomerReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWaitingProduct = async () => {
    try {
      setLoading(true);
      const result = await apiGetCustomerNotReviewdProducts();
      if (result.status === 200) {
        setLoading(false);
        setWaitingProducts(result.data);
      }
    } catch (error) {
      setLoading(false);
      alert("خطا در دریافت محصولات در انتظار نظر");
    }
  };

  const getCustomerReviews = async () => {
    try {
      setLoading(true);
      const result = await apiGetCustomerReviews();
      if (result.status === 200) {
        setCustomerReviews(result.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert("خطا در دریافت کالا های نظر داده شده");
    }
  };

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const currentPageIndex = props.navigationState.index;

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}
              key={i.toString()}
            >
              <Text
                style={{
                  fontFamily: "primary",
                  color:
                    i === currentPageIndex ? colors.primaryColor : colors.gray,
                }}
              >
                {route.title}
              </Text>

              <View
                style={{
                  width: "95%",
                  height: 3,
                  backgroundColor:
                    i === currentPageIndex ? colors.primaryColor : colors.white,
                  borderRadius: 2,
                  marginTop: 10,
                }}
              ></View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleDeleteReview = async (productId) => {
    apiDeleteReview(productId)
      .then(async (result) => {
        await getCustomerReviews();
      })
      .catch(() => alert("خطا در حذف نظر"));
  };

  useEffect(() => {
    getWaitingProduct();
    getCustomerReviews();
  }, []);

  const WaitingProducts = () => {
    // if (loading)
    //   return (
    //     <View
    //       style={{
    //         backgroundColor: colors.white,
    //         alignItems: "center",
    //         justifyContent: "center",
    //         flex: 1,
    //       }}
    //     >
    //       <LottieView
    //         style={{ width: 200, height: 200 }}
    //         source={require("../assets/spinner.json")}
    //         autoPlay
    //         loop
    //       />
    //     </View>
    //   );
    return (
      <View style={[styles.scene]}>
        <FlatList
          onRefresh={() => getWaitingProduct()}
          refreshing={loading}
          data={waitingProduct}
          keyExtractor={(i) => i.id.toString()}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: 15 }}>
              <Text
                style={{
                  fontFamily: "primaryBold",
                  fontSize: 17,
                  marginTop: 15,
                }}
              >
                نظرتان درباره کالاهایی که خریده‌اید چیست؟
              </Text>
              <Text
                style={{
                  fontFamily: "primary",
                  color: colors.secondaryTextColor,
                  fontSize: 15,
                  marginTop: 20,
                  lineHeight: 25,
                  marginBottom: 20,
                }}
              >
                با ثبت نظر در مورد کالاهای خریداری شده خود،به دیگران کاربران
                فروشگاه برای تجربه خریدی بهتر کمک کنید.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCardForAddNewReview product={item} />
          )}
          ItemSeparatorComponent={Line}
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
            </View>
          }
        />
      </View>
    );
  };

  const SecondRoute = () => {
    // if (loading)
    //   return (
    //     <View
    //       style={{
    //         backgroundColor: colors.white,
    //         alignItems: "center",
    //         justifyContent: "center",
    //         flex: 1,
    //       }}
    //     >
    //       <LottieView
    //         style={{ width: 200, height: 200 }}
    //         source={require("../assets/spinner.json")}
    //         autoPlay
    //         loop
    //       />
    //     </View>
    //   );
    return (
      <View style={[styles.scene]}>
        <FlatList
          refreshing={loading}
          onRefresh={() => getCustomerReviews()}
          data={customerReviews}
          keyExtractor={(i) => i.productId.toString()}
          renderItem={({ item }) => (
            <CustomerReviewCard review={item} onDelete={handleDeleteReview}/>
          )}
          ItemSeparatorComponent={Line}
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
            </View>
          }
        />
      </View>
    );
  };

  const initialLayout = { width: Dimensions.get("window").width };

  const renderScene = SceneMap({
    hasReview: SecondRoute,
    waitingForReview: WaitingProducts,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
      renderTabBar={renderTabBar}
    />
  );
}

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
  },
  tabItem: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // padding: 16,
    // marginVertical : 10,
    // paddingVertical :10,
    marginTop: 10,
  },
});
