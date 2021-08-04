import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";

// utilities import
import colors from "../../utilities/colors";

// apis impport
import { apiGetCategories } from "../../api/util";

// components import
import ProgressiveImage from "./../../components/ProgressiveImage";
import pages from "./../../navigation/routes";
import ImageWithOverlay from "./../../components/ImageWithOverlay";
import categoryImageLinkGenerator from "./../../utilities/categoryImageLinkGenerator";

const MainCategories = ({ navigation }) => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    setLoading(true);
    const result = await apiGetCategories();
    if (result.status === 200) setCategories(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading || !categories)
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
          source={require("../../assets/spinner.json")}
          autoPlay
        />
      </View>
    );

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{ marginBottom: index === categories.length - 1 ? 20 : 0 }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginTop: index === 0 ? 20 : 25,
                paddingHorizontal: 20,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.push(pages.subCategories, {
                    categoryId: item.id,
                    headerName: item.name,
                  })
                }
              >
                <Text
                  style={{
                    fontFamily: "primary",
                    color: colors.seconadryColor,
                    fontSize: 13,
                  }}
                >
                  مشاهده همه
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "primaryBold",
                  fontSize: 16,
                }}
              >
                {item.name}
              </Text>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={item.children}
              horizontal
              inverted
              keyExtractor={(i) => i.id.toString()}
              ListEmptyComponent={
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.categoryItemBackgeound,
                    width: 100,
                    height: 150,
                    marginLeft: 20,
                    borderRadius: 10,
                    marginTop: 15,
                    display: "flex",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.push(pages.subCategories, {
                      categoryId: item.id,
                      headerName: item.name,
                    })
                  }
                >
                  <View
                    style={{
                      width: "80%",
                      height: "70%",
                      overflow: "hidden",
                      paddingTop: 10,
                    }}
                  >
                    {/* <ProgressiveImage
                      source={{ uri: "https://picsum.photos/200" }}
                      thumbnailSource={{ uri: "https://picsum.photos/100" }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                      containerStyle={{
                        backgroundColor: colors.categoryItemBackgeound,
                      }}
                    /> */}
                    <ImageWithOverlay
                      style={{ width: "100%", height: "100%" }}
                      source={{
                        uri: categoryImageLinkGenerator(
                          item.appImageType,
                          item.appImage
                        ),
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "primary",
                      fontSize: 13,
                      textAlign: "center",
                      paddingHorizontal: 4,
                    }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "primary",
                      fontSize: 13,
                      textAlign: "center",
                      color: colors.secondaryTextColor,
                      // paddingHorizontal: 4,
                    }}
                  >
                    {item.productCounts?.toString() || 0} کالا
                  </Text>
                </TouchableOpacity>
              }
              renderItem={({ item: subItem, index: subIndex }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.categoryItemBackgeound,
                    width: 100,
                    height: 150,
                    marginLeft: 10,
                    borderRadius: 10,
                    marginRight: subIndex === 0 ? 20 : 0,
                    marginTop: 15,
                    display: "flex",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.push(pages.subCategories, {
                      categoryId: subItem.id,
                      headerName: item.name,
                    })
                  }
                >
                  <View
                    style={{
                      width: "80%",
                      height: "70%",
                      overflow: "hidden",
                      paddingTop: 10,
                    }}
                  >
                    {/* <ProgressiveImage
                      source={{ uri: "https://picsum.photos/200" }}
                      thumbnailSource={{ uri: "https://picsum.photos/100" }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                      containerStyle={{
                        backgroundColor: colors.categoryItemBackgeound,
                      }}
                    /> */}
                    <ImageWithOverlay
                      style={{ width: "100%", height: "100%" }}
                      source={{
                        uri: categoryImageLinkGenerator(
                          subItem.appImageType,
                          subItem.appImage
                        ),
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "primary",
                      fontSize: 13,
                      textAlign: "center",
                      paddingHorizontal: 4,
                    }}
                    numberOfLines={1}
                  >
                    {subItem.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "primary",
                      fontSize: 13,
                      textAlign: "center",
                      color: colors.secondaryTextColor,
                      // paddingHorizontal: 4,
                    }}
                  >
                    {subItem.productCounts?.toString() || 0} کالا
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default MainCategories;
