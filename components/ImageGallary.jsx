import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import Carousel from "react-native-snap-carousel";

import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Text,
} from "react-native";
import colors from "../utilities/colors";
import AppView from "./AppView/AppView";
import ZoomableImage from './ZoomableImage';

const ImageContainer = ({ isActive, imageUrl, onPress }) => (
  <TouchableOpacity style={{ width: 75, height: 75 }} onPress={onPress}>
    <Image
      source={{ uri: imageUrl }}
      style={{ width: "100%", height: "100%" }}
    />
    {isActive && (
      <View
        style={{
          width: "80%",
          marginLeft: "10%",
          backgroundColor: colors.seconadryColor,
          height: 5,
          borderRadius: 5,
          position: "absolute",
          bottom: 0,
        }}
      />
    )}
  </TouchableOpacity>
);

const ImageGallary = ({
  images,
  visible,
  onRequestClose,
  defualtImageIndex = 0,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(defualtImageIndex);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <AppView isSAfe>
        <ImageViewer
          imageUrls={images.map((item) => ({ url: item }))}
          onSwipeDown={onRequestClose}
          backgroundColor="white"
          enableSwipeDown
          flipThreshold={20}
          maxOverflow={windowWidth}
          useNativeDriver
          renderFooter={() => (
            <FlatList
              style={{
                width: "100%",
                minWidth: "100%",
              }}
              data={images}
              keyExtractor={(key) => key.toString()}
              horizontal
              // inverted
              renderItem={({ item, index }) => (
                <ImageContainer
                  isActive={activeImageIndex === index}
                  imageUrl={item}
                  onPress={() => setActiveImageIndex(index)}
                />
              )}
            />
          )}
          footerContainerStyle={{
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
            zIndex: 9999,
            width: "100%",
          }}
          menuContext={{ saveToLocal: "ذخیره در گالری", cancel: "بازگشت" }}
          enablePreload
          onChange={(e) => setActiveImageIndex(e)}
          index={activeImageIndex}
          renderIndicator={(currentIndex, allSize) => (
            <Text
              style={{
                fontFamily: "primary",
                color: colors.black,
                position: "absolute",
                bottom: 100,
                left: "50%",
                fontSize: 20,
              }}
            >
              {currentIndex + "/" + allSize}
            </Text>
          )}
        />
      </AppView>
    </Modal>
  );
};

export default ImageGallary;
