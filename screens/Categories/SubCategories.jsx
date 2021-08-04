import React, { useState, useEffect, useRef } from "react";
import { useCollapsibleHeader } from "react-navigation-collapsible";
import { View, Text, Animated } from "react-native";
import LottieView from "lottie-react-native";

// utils import
import useInfinitProducts from "./../../hooks/useInfinitProducts";
import colors from "../../utilities/colors";

// api import
import { apiGetCategories } from "../../api/util";

// components import
import CustomHeader from "./CustomHeader";
import ProductHorizentalItem from "./../../components/ProductHorizentalItem";
import SubHeaderFlat from "./SubHeaderFlat";
import SortModal from "../../components/SortModal";
import FilterModal from "../../components/FilterModal";
import Line from './../../components/Line';

const availableSortMethods = [
  { id: 1, name: "پربازدید ترین", value: "-views" },
  { id: 2, name: "جدید ترین", value: "id" },
  { id: 3, name: "پرفروش ترین", value: "sales" },
  { id: 4, name: "ارزان ترین", value: ["price", "available"] },
  { id: 5, name: "گران ترین", value: "-price" },
];

const SubCategories = ({ route, navigation }) => {
  const inputCategoryId = route.params.categoryId;
  const flatRef = useRef();
  const [currentCategory, setCurrentCategory] = useState();
  const [selectedSortMethod, setSelectedSortMethod] = useState(
    availableSortMethods[1]
  );
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [userMinPrice, setUserMinPrice] = useState();
  const [userMaxPrice, setUserMaxPrice] = useState();
  const [availableFilters, setAvailableFilteres] = useState();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [onlyAvailabales, setOnlyAvailabels] = useState(false);

  const getCurrentCayegory = async () => {
    try {
      const result = await apiGetCategories(inputCategoryId);
      if (result.status === 200) {
        setUserMinPrice(result.data.minProductPrice);
        setUserMaxPrice(result.data.maxProductPrice);
        setCurrentCategory(result.data);
        // setSelectedFilters(
        //   result.data.filters.map((filter) => ({
        //     id: `filter${filter.id}`,
        //     regularId: filter.id,
        //     values: [],
        //   }))
        // );
        setAvailableFilteres(result.data.filters);
        navigation.setOptions({ headerTitle: result.data.name });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (currentCategory) {
      totalItems &&
        totalItems > 1 &&
        flatRef &&
        flatRef.current &&
        flatRef.current.scrollToIndex({
          animated: true,
          index: 0,
        });
      reloadProducts();
    }
  }, [userMaxPrice, userMinPrice]);

  useEffect(() => {
    if (selectedSortMethod) navigation.setOptions({ selectedSortMethod });
    totalItems &&
      totalItems > 1 &&
      flatRef &&
      flatRef.current &&
      flatRef.current.scrollToIndex({
        animated: true,
        index: 0,
      });
    reloadProducts();
  }, [selectedSortMethod]);

  // useEffect(() => {
  //   console.log("REady");
  //   if (currentCategory) {
  //     totalItems &&
  //       totalItems > 1 &&
  //       flatRef &&
  //       flatRef.current &&
  //       flatRef.current.scrollToIndex({
  //         animated: true,
  //         index: 0,
  //       });
  //     reloadProducts();
  //   }
  // }, [JSON.stringify(selectedFilters)]);

  useEffect(() => {
    getCurrentCayegory();
  }, []);

  const [infinitProducts, fetchMore, totalItems, reloadProducts] =
    useInfinitProducts(
      inputCategoryId,
      currentCategory,
      selectedSortMethod,
      userMinPrice,
      userMaxPrice,
      selectedFilters
    );

  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop } =
    useCollapsibleHeader({
      navigationOptions: {
        header: (props) => (
          <CustomHeader
            {...props}
            setSortModalVisible={setSortModalVisible}
            setFilterModalVisible={setFilterModalVisible}
          />
        ),
      },
    });

  if (!infinitProducts || !currentCategory)
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
          loop
        />
      </View>
    );

  return (
    <React.Fragment>
      <Animated.FlatList
        ref={flatRef}
        onScroll={onScroll}
        contentContainerStyle={{ paddingTop: containerPaddingTop }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
        ListHeaderComponent={() => (
          <SubHeaderFlat
            totalProducts={totalItems}
            categoryName={currentCategory.name}
            superSubCategories={currentCategory.children}
          />
        )}
        data={infinitProducts}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item, index }) => (
          <ProductHorizentalItem product={item} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMore}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Line}
      />
      <SortModal
        visivle={sortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
        availableSortMethods={availableSortMethods}
        totalProducts={totalItems}
        selectedSortMethod={selectedSortMethod}
        onItemPress={(item) => {
          setSelectedSortMethod(item);
          setSortModalVisible(false);
        }}
      />
      <FilterModal
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
        currentCategory={currentCategory}
        availableFilters={availableFilters}
        productNumbers={totalItems}
        userMinPrice={userMinPrice}
        userMaxPrice={userMaxPrice}
        selectedFilters={selectedFilters}
        onClear={() => {
          setUserMinPrice(currentCategory.minProductPrice);
          setUserMaxPrice(currentCategory.maxProductPrice);
          setFilterModalVisible(false);
          setSelectedFilters([]);
        }}
        onSliderChange={(min, max) => {
          if (min !== userMinPrice) setUserMinPrice(min);
          if (max !== userMaxPrice) setUserMaxPrice(max);
        }}
        onSubItemPress={(item, activeFilterId) => {
          const filterString = `filter${activeFilterId}=${item}`;
          let selectedFiltersCopy = [...selectedFilters];
          if (selectedFilters.includes(filterString)) {
            selectedFiltersCopy = selectedFiltersCopy.filter(
              (i) => i !== filterString
            );
            // console.log("Includes");
          } else if (!selectedFilters.includes(filterString)) {
            selectedFiltersCopy.push(filterString);
            // console.log("Excludes");
          }
          // console.log(selectedFiltersCopy);
          setSelectedFilters(selectedFiltersCopy);
          // console.log("Sub item preessed",item)
          // console.log(`filter${activeFilterId}=${item}`);
          // const copy = selectedFilters;
          // if (!selectedFilters[index].values.includes(item))
          //   copy[index].values.push(item);
          // else if (selectedFilters[index].values.includes(item)) {
          //   const arrIndex = selectedFilters[index].values.indexOf(item);
          //   if (arrIndex > -1) {
          //     selectedFilters[index].values.splice(arrIndex, 1);
          //   }
          // }
          // // console.log(copy)
          // setSelectedFilters(copy);
          reloadProducts();
        }}
        onlyAvailabales={onlyAvailabales}
        setOnlyAvailabels={setOnlyAvailabels}
      />
    </React.Fragment>
  );
};

export default SubCategories;
