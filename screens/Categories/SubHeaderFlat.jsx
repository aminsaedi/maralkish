import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity,Image } from "react-native";

import colors from "../../utilities/colors";
import pages from './../../navigation/routes';
import ImageWithOverlay from "../../components/ImageWithOverlay";
import categoryImageLinkGenerator from './../../utilities/categoryImageLinkGenerator';



const SubHeaderFlat = ({
  totalProducts = 0,
  categoryName = "دسته بندی",
  superSubCategories,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        height: superSubCategories.length > 0 ? 160 : null,
      }}
    >
      <View
        style={{ width: "100%", height: 5, backgroundColor: colors.lightGray }}
      ></View>
      {superSubCategories.length > 0 && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={superSubCategories}
            keyExtractor={(i) => i.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.push(pages.subCategories, {
                    categoryId: item.id,
                  })
                }
                style={{
                  marginTop: "2.5%",
                  backgroundColor: colors.categoryItemBackgeound,
                  width: 100,
                  height: "95%",
                  marginRight: 10,
                  marginLeft: 5,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    marginTop: 5,
                    backgroundColor: colors.categoryItemBackgeound,
                    width: "80%",
                  }}
                >
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
                    color: colors.secondaryTextColor,
                    marginBottom: 5,
                    width: "90%",
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            horizontal
            inverted
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
      <View
        style={{ width: "100%", height: 5, backgroundColor: colors.lightGray }}
      ></View>
      <View
        style={{
          width: "100%",
          backgroundColor: colors.white,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}
      >
        <Text
          style={{ fontFamily: "primary", color: colors.secondaryTextColor }}
        >
          {totalProducts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} کالا
        </Text>
        <Text
          style={{ fontFamily: "primary", color: colors.secondaryTextColor }}
        >
          {categoryName}
        </Text>
      </View>
    </View>
  );
};

export default SubHeaderFlat;
