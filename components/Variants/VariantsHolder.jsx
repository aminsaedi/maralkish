import React from "react";
import { View, Text, FlatList } from "react-native";
import colors from "../../utilities/colors";
import VariantsColorItem from "./VariantsColorItem";
import VariantsItemText from "./VariantsTextItem";
import persianColors from "../../utilities/persianColors";

const VariantsHolder = ({ variantsHolder, handlePressOnVariant, style }) => {
  if (!variantsHolder) return null;
  return (
    <View style={style}>
      {variantsHolder.map((optionItem) => {
        return (
          <View key={optionItem.id.toString()} style={{ paddingRight: 20 }}>
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 17,
                textAlign: "right",
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              {optionItem.title + ": "}
              {optionItem.title === "رنگ"
                ? persianColors.find(
                    (color) =>
                      color.color.toLowerCase() ===
                      optionItem.items
                        .filter((i) => i === optionItem.selectedItemValue)
                        .toString().toLowerCase()
                  ).name
                : optionItem.selectedItemValue}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <FlatList
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                data={optionItem.items}
                keyExtractor={(i) => i.toString()}
                renderItem={({ item }) => {
                  if (optionItem.title === "رنگ") {
                    return (
                      <VariantsColorItem
                        key={item}
                        value={item}
                        onPress={() =>
                          handlePressOnVariant(optionItem.id, item)
                        }
                        isSelected={item === optionItem.selectedItemValue}
                      />
                    );
                  } else
                    return (
                      <VariantsItemText
                        key={item}
                        value={item}
                        onPress={() =>
                          handlePressOnVariant(optionItem.id, item)
                        }
                        isSelected={item === optionItem.selectedItemValue}
                      />
                    );
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default VariantsHolder;
