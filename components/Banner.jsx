import React from "react";
import {
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from "react-native";

const Banner = ({ count = 1, data = [] }) => {
  if (count === 1)
    return (
      <View style={styles.oneItemContainer}>
        <TouchableWithoutFeedback>
          <Image
            style={{ height: "100%", width: "100%", borderRadius: 15 }}
            resizeMode="cover"
            source={
              data[0]?.image
                ? { uri: data[0].image }
                : require("../assets/default.jpg")
            }
          />
        </TouchableWithoutFeedback>
      </View>
    );
  else if (count === 4)
    return (
      <View style={styles.fourItemContainer}>
        <View style={styles.fourRowContainer}>
          <View style={styles.fourImageContainer}>
            <TouchableWithoutFeedback>
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 15 }}
                resizeMode="cover"
                source={
                  data[0]?.image
                    ? { uri: data[0].image }
                    : require("../assets/default.jpg")
                }
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.fourImageContainer}>
            <TouchableWithoutFeedback>
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 15 }}
                resizeMode="cover"
                source={
                  data[1]?.image
                    ? { uri: data[1].image }
                    : require("../assets/default.jpg")
                }
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.fourRowContainer}>
          <View style={styles.fourImageContainer}>
            <TouchableWithoutFeedback>
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 15 }}
                resizeMode="cover"
                source={
                  data[2]?.image
                    ? { uri: data[2].image }
                    : require("../assets/default.jpg")
                }
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.fourImageContainer}>
            <TouchableWithoutFeedback>
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 15 }}
                resizeMode="cover"
                source={
                  data[3]?.image
                    ? { uri: data[3].image }
                    : require("../assets/default.jpg")
                }
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  oneItemContainer: {
    // marginVertical: 20,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width,
    height: 150,
    overflow: "hidden",
  },
  fourItemContainer: {
    height: 250,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  fourRowContainer: {
    display: "flex",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fourImageContainer: {
    height: 120,
    width: "48%",
  },
});

export default Banner;
