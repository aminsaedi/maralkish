import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

// components import
import ProgressiveImage from "./ProgressiveImage";
// utils import
import colors from "../utilities/colors";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";
import pages from "../navigation/routes";
// apis import
import { apiGet9CategoryProduct } from "../api/products";

const CategoryGroup3By3 = ({ categoryId, style, title, products,totalItems }) => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const LoadingPlaceholder = (
    <SkeletonPlaceholder>
      <View
        style={[
          {
            marginLeft: 10,
            width: windowWidth - 20,
            height: windowWidth - 20,
            display: "flex",
            //   flexDirection: "row",
            justifyContent: "space-between",
          },
          style,
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "30%",
          }}
        >
          <View
            style={{
              width: (windowWidth - 20) / 3 - 10,
              height: (windowWidth - 20) / 3,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              width: (windowWidth - 20) / 3 - 10,
              height: (windowWidth - 20) / 3,
              borderRadius: 10,

              //   paddingHorizontal: 10,
            }}
          ></View>
          <View
            style={{
              width: (windowWidth - 20) / 3 - 10,
              height: (windowWidth - 20) / 3,
              borderRadius: 10,
            }}
          ></View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "30%",
          }}
        >
          <View
            style={{
              width: (windowWidth - 20) / 3 - 10,
              height: (windowWidth - 20) / 3,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              width: (windowWidth - 20) / 3 - 10,
              height: (windowWidth - 20) / 3,
              borderRadius: 10,

              //   paddingHorizontal: 10,
            }}
          ></View>
          <View
            style={{
              width: (windowWidth - 20) / 3 - 10,
              height: (windowWidth - 20) / 3,
              borderRadius: 10,
            }}
          ></View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: "30%",
          }}
        >
          <View
            style={{
              width: (windowWidth - 20) / 3 - 10,
              height: (windowWidth - 20) / 3,
              borderRadius: 10,
            }}
          ></View>
          <View
            style={{
              width: (windowWidth - 20) / 3 - 10,
              height: (windowWidth - 20) / 3,
              borderRadius: 10,

              //   paddingHorizontal: 10,
            }}
          ></View>
          <View
            style={{
              width: (windowWidth - 20) / 3 - 10,
              height: (windowWidth - 20) / 3,
              borderRadius: 10,
            }}
          ></View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );

  if (loading || !products || !categoryId) return LoadingPlaceholder;

  return (
    <View style={[{ display: "flex", alignItems: "center" }, style]}>
      <Text
        style={{
          fontFamily: "primaryBold",
          width: "100%",
          fontSize: 19,
          marginRight: 15,
          marginBottom: 15,
          textAlign: "right",
        }}
      >
        {title || "دسته بندی انتخابی کاربر"}
      </Text>
      <View
        style={{
          width: windowWidth - 20,
          // height: windowWidth - 20,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {products.slice(0, 9).map((item, index) => (
          <TouchableOpacity
            key={item.id.toString()}
            style={{
              width: (windowWidth - 20) / 3,
              height: (windowWidth - 20) / 3,
              borderRightColor: colors.lightGray,
              borderRightWidth: (index + 1) % 3 === 0 ? 0 : 1,
              // borderBottomColor: colors.lightGray,
              // borderBottomWidth: index < 6 ? 1 : 0,
              padding: 8,
              borderTopColor: colors.lightGray,
              borderTopWidth: index <= 2 ? 0 : 1,
            }}
            onPress={() =>
              navigation.push(pages.product, { productId: item.id })
            }
          >
            {item.image ? (
              <ProgressiveImage
                source={{
                  uri: imageLinkGenerator(item.image, "jpg", 300, 300),
                }}
                thumbnailSource={{
                  uri: imageLinkGenerator(item.image, "jpg", 100, 100),
                }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../assets/default.jpg")}
                style={{ width: "100%", height: "100%", borderRadius: 15 }}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {products && (
        <TouchableOpacity
          style={[styles.flexRow, { width: "100%", justifyContent: "center" }]}
          onPress={() =>
            navigation.push(pages.app, {
              screen: pages.catagories,
              params: {
                screen: pages.subCategories,
                params: {
                  categoryId: categoryId,
                },
              },
            })
          }
        >
          <Text
            style={{
              fontFamily: "primary",
              color: colors.primaryColor,
              fontSize: 18,
              marginLeft: 5,
              textAlign: "center",
            }}
          >
            مشاهده بیش از {totalItems} کالا
          </Text>
          <MaterialCommunityIcons
            name="chevron-left"
            color={colors.primaryColor}
            size={18}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
});

export default CategoryGroup3By3;
