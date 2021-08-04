import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// components improt
import AppView from "./AppView/AppView";
import colors from "../utilities/colors";
import Line from "./Line";


const SortModal = ({
  visivle,
  onRequestClose,
  availableSortMethods,
  totalProducts,
  selectedSortMethod,
  onItemPress,
}) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onRequestClose}
      transparent={false}
      visible={visivle}
    >
      <AppView isSAfe>
        <TouchableOpacity
          style={[
            styles.rowFlex,
            {
              paddingHorizontal: 15,
              height: "5%",
              backgroundColor: colors.lightGray,
            },
          ]}
          onPress={onRequestClose}
        >
          <Text
            style={{
              fontFamily: "primaryBold",
              fontSize: 20,
              textAlign: "right",
            }}
          >
            مرتب سازی
          </Text>
          <MaterialCommunityIcons
            name="chevron-up"
            color={colors.black}
            size={30}
          />
        </TouchableOpacity>
        <View
          style={{
            height: "90%",
            width: "100%",
            backgroundColor: colors.lightGray,
          }}
        >
          <FlatList
            data={availableSortMethods}
            keyExtractor={(i) => i.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 15,
                }}
                onPress={() => onItemPress(item)}
              >
                <Text style={{ fontFamily: "primary", fontSize: 15 }}>
                  {item.name}
                </Text>
                {item.id === selectedSortMethod.id && (
                  <MaterialCommunityIcons
                    name="check"
                    color={colors.seconadryColor}
                    size={25}
                  />
                )}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <Line color={colors.midleLightGray} />
            )}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.rowFlex,
            {
              height: "5%",
              paddingHorizontal: 20,
              backgroundColor: colors.white,
            },
          ]}
          onPress={onRequestClose}
        >
          <Text
            style={{
              fontFamily: "primaryBold",
              fontSize: 20,
            }}
          >
            {totalProducts > 0
              ? `مشاهده ${totalProducts
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} کالا`
              : "هیج کالایی با این ترکیب یافت نشد"}
          </Text>

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

export default SortModal;
