import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import LottieView from "lottie-react-native";
import { useCollapsibleHeader } from "react-navigation-collapsible";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useHeaderHeight } from "@react-navigation/stack";

// components import
import ProductHorizentalItem from "../../components/ProductHorizentalItem";
import Line from "../../components/Line";

// apis import
import { apiGetCategoryProducts } from "../../api/products";
import { apiGetCategories } from "../../api/util";

// util import
import colors from "../../utilities/colors";
import pages from "../../navigation/routes";
import FilterModal from "../../components/FilterModal";
import SortModal from "../../components/SortModal";
import ImageWithOverlay from "../../components/ImageWithOverlay";
import categoryImageLinkGenerator from "../../utilities/categoryImageLinkGenerator";

const SubCategories = ({ navigation, route }) => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoaading] = useState(true);
  const [showSortByModal, setShowSortByModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeSortMethod, setActiveSortMethod] = useState({
    id: 1,
    name: "پربازدیدترین",
    value: "-views",
  });
  const [categoryPriceRange, setCategoryPriceRange] = useState([0, 100]);
  const [userMinPrice, setUserMinPrice] = useState();
  const [userMaxPrice, setUserMaxPrice] = useState();
  const [lowLoading, setLowLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState();
  const [onlyAvailableProducts, setOnlyAvailableProducts] = useState(false);

  const sortByItems = [
    { id: 1, name: "پربازدید ترین", value: "-views" },
    { id: 2, name: "جدید ترین", value: "id" },
    { id: 3, name: "پرفروش ترین", value: "sales" },
    { id: 4, name: "ارزان ترین", value: ["price", "available"] },
    { id: 5, name: "گران ترین", value: "-price" },
  ];
  const headerHeight = useHeaderHeight();
  const getProducts = async (sort = undefined) => {
    setLoaading(true);
    // console.log("Regular get products")
    const result = await apiGetCategoryProducts(route.params.categoryId, sort);
    if (result.status === 200) setProducts(result.data);

    setLoaading(false);
  };

  const getProductsWithFilter = async () => {
    setLowLoading(true);
    const filterObj = {};
    selectedFilters &&
      selectedFilters.forEach((item) => {
        if (item.values && item.values.length > 0) {
          if (item.values.length > 1) {
            filterObj[item.id] = [];
            item.values.forEach((subVal) => {
              filterObj[item.id].push(subVal);
            });
          } else if (item.values.length === 1)
            filterObj[item.id] = item.values[0];
        }
      });
    const result = await apiGetCategoryProducts(
      route.params.categoryId,
      ["-available", activeSortMethod.value],
      categoryPriceRange[0] && userMinPrice !== categoryPriceRange[0]
        ? userMinPrice
        : null,
      categoryPriceRange[1] && userMaxPrice !== categoryPriceRange[1]
        ? userMaxPrice
        : null,
      Object.keys(filterObj).length > 0 ? filterObj : undefined,
      onlyAvailableProducts
    );
    console.log(result.config.params);
    console.log(
      "Result lenght : ",
      result.data.length,
      " Result status : ",
      result.status
    );
    if (result.status === 200) setProducts(result.data);
    setLowLoading(false);
  };

  const getCategories = async () => {
    setLoaading(true);
    const result = await apiGetCategories(route.params.categoryId);
    if (result.status === 200) setCategories(result.data);
    if (result.data.filters?.length === 0)
      navigation.setOptions({ isFiltersActive: false });
    else if (result.data.filters?.length > 0)
      navigation.setOptions({ isFiltersActive: true });
    setCategoryPriceRange([
      result.data.minProductPrice,
      result.data.maxProductPrice,
    ]);
    setUserMinPrice(result.data.minProductPrice);
    setUserMaxPrice(result.data.maxProductPrice);
    setSelectedFilters(
      result.data.filters.map((filter) => ({
        id: `filter${filter.id}`,
        regularId: filter.id,
        values: [],
      }))
    );
    setLoaading(false);
  };

  useEffect(() => {
    // setCategories(route.params.categories);
    getProducts(["-available", activeSortMethod.value]);
    getCategories();
  }, [route.params.categoryId]);

  useEffect(() => {
    getProductsWithFilter();
  }, [userMinPrice, userMaxPrice]);

  useEffect(() => {
    let hasSomeFilters = false;
    let filtersCount = 0;
    // console.log("changeeee");
    // getProductsWithFilter();
    if (selectedFilters && selectedFilters.length > 0)
      selectedFilters.forEach((item) => {
        if (item.values.length > 0) {
          hasSomeFilters = true;
          filtersCount += 1;
        }
      });
    navigation.setOptions({ filtersHasBadge: hasSomeFilters });
    if (filtersCount > 0) navigation.setOptions({ filtersCount });
    else navigation.setOptions({ filtersCount: false });
  }, [JSON.stringify(selectedFilters), onlyAvailableProducts]);

  useEffect(() => {
    getProductsWithFilter();
  }, [onlyAvailableProducts]);

  const renderCustomHeader = ({ scene, previous, navigation }) => {
    const { options } = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;
    const sortMethod = options.sortMethod || "پربازدیدترین";
    const isFiltersActive = options.isFiltersActive;
    const filtersHasBadge = options.filtersHasBadge;
    const filtersCount = options.filtersCount;
    return (
      <View
        style={{
          width: "100%",
          // height: headerHeight
          height: (Dimensions.get("window").height / 100) * 15,
          paddingTop: getStatusBarHeight(),
          backgroundColor: colors.white,
          minHeight: 130,
          maxHeight: 170,
          // display : "none"
        }}
      >
        <View
          style={{
            width: "95%",
            height: "45%",
            backgroundColor: colors.inputBackgroundColor,
            marginRight: "2.5%",
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 5,
            borderRadius: 10,
            marginTop : 2
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: "10%", display: "flex", alignItems: "flex-end" }}
          >
            <MaterialCommunityIcons
              name="arrow-right"
              size={25}
              color={colors.gray}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(pages.search, {
                searchTitle: route.params.headerName || "همه کالاها",
              })
            }
            style={{ width: "90%" }}
          >
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 17,
                color: colors.inputPlaceholderColor,
                textAlign: "right",
                // paddingRight : 10
              }}
            >
              جستجو در {route.params.headerName || "فروشگاه"}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 15,
            height: "55%",
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            onPress={() => {
              // navigation.setParams({
              //   headerShown: false,
              // });
              setShowFilterModal(true);
            }}
            disabled={!isFiltersActive}
          >
            <View style={{ position: "relative" }}>
              {filtersHasBadge && (
                <View
                  style={{
                    backgroundColor: colors.seconadryColor,
                    width: 7,
                    height: 7,
                    position: "absolute",
                    zIndex: 10,
                    borderRadius: 4,
                    right: 2,
                    top: 1,
                  }}
                />
              )}
              <Ionicons
                name="options-outline"
                size={20}
                color={isFiltersActive ? colors.black : colors.gray}
              />
            </View>

            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 14,
                color: isFiltersActive ? colors.black : colors.gray,
                marginRight: 8,
              }}
            >
              {filtersCount ? filtersCount + "فیلتر" : "فیلترها"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "flex-start",
              marginLeft: 15,
            }}
            onPress={() => setShowSortByModal(true)}
          >
            <MaterialCommunityIcons
              name="sort-variant"
              size={20}
              color={colors.black}
            />
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 14,
                marginRight: 8,
              }}
            >
              {sortMethod}
            </Text>
          </TouchableOpacity>
        </View>
        <Line width="100%" marginHorizontal="0%" />
      </View>
    );
  };

  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop } =
    useCollapsibleHeader({
      navigationOptions: {
        header: renderCustomHeader,
      },
    });

  if (loading || !products || !categories) {
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
  }

  return (
    <React.Fragment>
      <Animated.FlatList
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: containerPaddingTop }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
        ListHeaderComponent={
          <View
            style={
              ([styles.sectionContainer],
              {
                paddingTop:
                  Platform.OS === "android" ? getStatusBarHeight() : 0,
              })
            }
          >
            <FlatList
              data={categories.children}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    backgroundColor: colors.categoryItemBackgeound,
                    flex: 1,
                    margin: 5,
                    // height: 100,
                    borderRadius: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 5,
                  }}
                  onPress={() =>
                    navigation.push(pages.subCategories, {
                      categoryId: item.id,
                      headerName: item.name,
                    })
                  }
                >
                  <ImageWithOverlay
                    source={{
                      uri: categoryImageLinkGenerator(
                        item.appImageType,
                        item.appImage
                      ),
                    }}
                    style={{ height: 80, width: 80 }}
                  />
                  <Text
                    style={{
                      fontFamily: "primary",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View
              style={{
                width: "100%",
                height: 10,
                backgroundColor: colors.lightGray,
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                marginTop: 10,
              }}
            >
              <Text style={{ fontFamily: "primary", color: colors.gray }}>
                {(products &&
                  products.length
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")) ||
                  0}{" "}
                کالا
              </Text>
              <Text style={{ fontFamily: "primary", color: colors.gray }}>
                {categories.name}
              </Text>
            </View>
          </View>
        }
        data={products}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Line}
        renderItem={({ item }) => <ProductHorizentalItem product={item} />}
      />
      <SortModal
        visivle={showSortByModal}
        onRequestClose={() => setShowSortByModal(false)}
        sortByItems={sortByItems}
        activeSortMethod={activeSortMethod}
        productNumbers={products.length}
        onItemPress={(item) => {
          navigation.setOptions({ sortMethod: item.name });
          setActiveSortMethod(item);
          setShowSortByModal(false);
          getProductsWithFilter();
          // getProducts(item.value);
        }}
      />
      <FilterModal
        categories={categories}
        lowLoading={lowLoading}
        onRequestClose={() => setShowFilterModal(false)}
        productNumbers={products.length}
        selectedFilters={selectedFilters}
        userMaxPrice={userMaxPrice}
        userMinPrice={userMinPrice}
        visible={showFilterModal}
        onSubItemPress={(item, index) => {
          const copy = selectedFilters;
          if (!selectedFilters[index].values.includes(item))
            copy[index].values.push(item);
          else if (selectedFilters[index].values.includes(item)) {
            const arrIndex = selectedFilters[index].values.indexOf(item);
            if (arrIndex > -1) {
              selectedFilters[index].values.splice(arrIndex, 1);
            }
          }
          setSelectedFilters(copy);
          getProductsWithFilter();
        }}
        onClear={() => {
          setShowFilterModal(false);
          const copy = selectedFilters;
          for (let key in copy) {
            copy[key].values = [];
          }
          setSelectedFilters(copy);
          getProducts(activeSortMethod.value);
        }}
        onSliderChange={(min, max) => {
          if (min !== userMinPrice) setUserMinPrice(min);
          if (max !== userMaxPrice) setUserMaxPrice(max);
        }}
        minAvailablePrice={categoryPriceRange[0]}
        maxAvailablePrice={categoryPriceRange[1]}
        isAvailable={onlyAvailableProducts}
        setIsAvailable={setOnlyAvailableProducts}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: colors.lightGray,
  },
  sectionContainer: {
    backgroundColor: colors.white,
  },
});

export default SubCategories;
