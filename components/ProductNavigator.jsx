import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../utilities/colors";

class ProductNavigator extends React.Component {
  state = { flatCatagories: [], mainCat: [], catsToShow: [] };

  initResult = [];
  async initCategories(categories, parent = null) {
    for (const cat of categories) {
      cat.parent = parent;
      this.initResult.push(cat);
      this.initCategories(cat.children, cat);
    }
  }

  async filterCategories(data) {
    let result;
    data.forEach((cat) => {
      if (cat.id === this.props.productCategoryId) {
        result = cat;
      }
    });
    await this.setState({
      mainCat: result,
    });
  }

  async processObject(category) {
    const output = [];
    while (category) {
      const { id, name, parent } = category;
      output.push({ id, name });
      category = parent;
    }
    await this.setState({ catsToShow: [...output] });
  }

  async componentDidMount() {
    await this.initCategories(this.props.categories);
    this.setState({ flatCatagories: this.initResult });
    await this.filterCategories(this.state.flatCatagories);
    await this.processObject(this.state.mainCat);
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          // height: 70,
          backgroundColor: colors.lightGray,
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
          // paddingTop: "20%",
        }}
      >
        <FlatList
          data={this.state.catsToShow}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          inverted
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            // if (item.id === this.props.productCategoryId)
            return (
              <TouchableOpacity
              style={{
                  // height: "60%",
                  paddingVertical : 8,
                  marginVertical : 15,
                  backgroundColor: colors.white,
                  marginLeft: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  flexDirection: "row",
                  paddingLeft: 10,
                  marginRight: index === 0 ? 6 : 0,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                }}
                onPress={() => this.props.onPress(item.id, item.name)}
              >
                <Text style={{ fontFamily: "primary" }}>{item.name}</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={colors.gray}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

export default ProductNavigator;
