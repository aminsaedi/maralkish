import React, { useState, useCallback } from "react";

import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Slider from "rn-range-slider";

// componets import
import AppView from "./AppView/AppView";
import FilterOptionItem from "./FilterOptionItem";
import FilterSubOption from "./FilterSubOption";
import Line from "./Line";
import Rail from "./sidebarComponents/Rail";
import RailSelected from "./sidebarComponents/RailSelected";
import Thumb from "./sidebarComponents/Thumb";

// utils import
import colors from "../utilities/colors";

const FilterModal = ({
  categories,
  lowLoading = false,
  maxAvailablePrice,
  minAvailablePrice,
  onClear,
  onRequestClose,
  onSliderChange,
  onSubItemPress,
  productNumbers,
  selectedFilters,
  userMaxPrice,
  userMinPrice,
  visible,
  isAvailable,
  setIsAvailable,
  onIsAvailbleChange,
}) => {
  const [activeFilter, setActiveFilter] = useState();
  const [title, setTitle] = useState("فیلترها");

  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderThumb = useCallback(() => <Thumb />, []);

  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {
        setTitle("فیلترها");
        onRequestClose();
      }}
      visible={visible}
      transparent={false}
    >
      <AppView isSAfe>
        <View
          style={[
            styles.rowFlex,
            {
              paddingHorizontal: 15,
              height: "5%",
              backgroundColor: colors.lightGray,
            },
          ]}
        >
          <TouchableOpacity
            disabled={title === "فیلترها"}
            style={styles.rowFlex}
            onPress={() => setTitle("فیلترها")}
          >
            {/* // TODO: go back to last page */}
            {title !== "فیلترها" && (
              <MaterialCommunityIcons
                name="arrow-right"
                size={25}
                color={colors.black}
              />
            )}
            <Text style={{ fontFamily: "primaryBold", fontSize: 17 }}>
              {title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTitle("فیلترها");
              onClear();
            }}
          >
            {/* TODO: clear all filters and return to category page */}
            <Text
              style={{
                fontFamily: "primary",
                color: colors.gray,
                fontSize: 15,
              }}
            >
              پاک کردن
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "90%",
            width: "100%",
            backgroundColor: colors.lightGray,
          }}
        >
          {title === "فیلترها" && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={[
                { id: "priceRangeSelector", name: "محدوده قیمت موردنظر" },
                ...categories.filters,
                { id: "isAvailableSelector", name: "isAvailableSelector" },
              ]}
              keyExtractor={(i) => i.id.toString()}
              renderItem={({ item }) => (
                <FilterOptionItem
                  value={item.name}
                  onPress={() => {
                    setTitle(item.name);
                    setActiveFilter(item);
                  }}
                  activeValues={
                    selectedFilters.find((i) => i.regularId === item.id)?.values
                  }
                  activeItem={
                    selectedFilters.find((i) => i.regularId === item.id)?.values
                      .length > 0
                  }
                  isAvailableValue={isAvailable}
                  onIsAvailableChange={() => {
                    setIsAvailable(!isAvailable);
                    // onIsAvailbleChange()
                  }}
                />
              )}
              ItemSeparatorComponent={() => (
                <Line color={colors.midleLightGray} />
              )}
            />
          )}
          {title !== "فیلترها" && title !== "محدوده قیمت موردنظر" && (
            <FlatList
              data={activeFilter.values}
              keyExtractor={(i) => i.toString()}
              renderItem={({ item }) => {
                const index = selectedFilters.findIndex(
                  (i) => i.regularId === activeFilter.id
                );
                return (
                  <FilterSubOption
                    value={item}
                    onPress={() => onSubItemPress(item, index)}
                    isChecked={
                      selectedFilters[index].values.includes(item)
                        ? true
                        : false
                    }
                  />
                );
              }}
              ItemSeparatorComponent={() => (
                <Line color={colors.midleLightGray} />
              )}
            />
          )}
          {title === "محدوده قیمت موردنظر" && (
            <View style={{ marginTop: "10%" }}>
              <View style={[styles.rowFlex, { paddingHorizontal: 20 }]}>
                <Text
                  style={{
                    fontFamily: "primaryBold",
                    fontSize: 20,
                    textAlign: "right",
                  }}
                >
                  <Text style={{ color: colors.gray }}>تا</Text>
                  {userMaxPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  <Text style={{ fontSize: 10 }}>تومان</Text>
                </Text>
                <Text
                  style={{
                    fontFamily: "primaryBold",
                    fontSize: 20,
                    textAlign: "right",
                  }}
                >
                  <Text style={{ color: colors.gray }}>از</Text>
                  {userMinPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  <Text style={{ fontSize: 10 }}>تومان</Text>
                </Text>
              </View>
              <View
                style={{
                  width: "80%",
                  marginLeft: "10%",                 
                }}
              >
                <Slider
                  min={minAvailablePrice}
                  max={maxAvailablePrice}
                  step={100000}
                  // disableRange={rangeDisabled}
                  floatingLabel={false}
                  renderThumb={renderThumb}
                  renderRail={renderRail}
                  renderRailSelected={renderRailSelected}
                  // renderLabel={renderLabel}
                  // renderNotch={renderNotch}
                  // onValueChanged={handleValueChange}
                  onValueChanged={onSliderChange}
                  low={userMinPrice}
                  high={userMaxPrice}
                />
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[styles.rowFlex, { height: "5%", paddingHorizontal: 20 }]}
          disabled={lowLoading || productNumbers <= 0}
          onPress={() => {
            setTitle("فیلترها");
            onRequestClose();
          }}
        >
          {!lowLoading && (
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 20,
              }}
            >
              {productNumbers > 0
                ? `مشاهده ${productNumbers
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} کالا`
                : "هیج کالایی با این ترکیب یافت نشد"}
            </Text>
          )}
          {lowLoading && (
            <View
              style={{
                height: "100%",
                width: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LottieView
                source={require("../assets/lowLoading.json")}
                autoPlay
                autoSize
                style={{ width: 80, height: "80%", minHeight: 50 }}
              />
            </View>
          )}
          <MaterialCommunityIcons name="chevron-up" size={25} />
        </TouchableOpacity>
      </AppView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  topBar: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  rowFlex: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
});

export default FilterModal;
