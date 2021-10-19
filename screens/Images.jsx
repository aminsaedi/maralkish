import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import GallerySwiper from "react-native-gallery-swiper";
import LottieView from "lottie-react-native";

// api import
import { apiGetProductById } from "../api/products";

// components import
import AppView from "../components/AppView/AppView";
import colors from "../utilities/colors";
import pages from "./../navigation/routes";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";

const Images = ({ route, navigation }) => {
  const [images, setImages] = useState();
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  let gallerySwiper;

  const handleGetImages = async () => {
    setLoading(true);
    const { productId } = route.params;
    const result = await apiGetProductById(productId);
    if (result.status === 200) setImages(result.data.images);
    setLoading(false);
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  useEffect(() => {
    flatListRef?.current?.scrollToOffset({
      offset: currentImage * 100,
      animated: true,
    });
    if (gallerySwiper) gallerySwiper.scrollToPage(currentImage, false);
  }, [currentImage]);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const flatListRef = useRef();

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  if (loading || !images)
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
          source={require("../assets/spinner.json")}
          autoPlay
        />
      </View>
    );

  return (
    <AppView style={{ display: "flex" }}>
      <GallerySwiper
        // ref={galaryRef}
        refPage={(component) => (gallerySwiper = component)}
        initialPage={route.params.index}
        images={images.map((item) => ({
          source: { uri: imageLinkGenerator(item) },
        }))}
        onPinchTransforming={(v) => {
          if (v.scale <= 1) fadeIn();
          else fadeOut();
          // console.log("dcs", v);
        }}
        maxScale={6}
        onPageSelected={(index) => {
          fadeIn();
          setCurrentImage(index);
        }}
        style={{ flex: 1, backgroundColor: colors.white }}
        onDoubleTapEndReached={(f) => {
          if (f.scale <= 1) fadeIn();
          else fadeOut();
        }}
        onDoubleTapStartReached={(b) => {
          if (b.scale <= 1) fadeIn();
          else fadeOut();
        }}
        scrollToPage={() => ({ index: 5, immediate: true })}
        onSwipeDownReleased={() => {
          // navigation.navigate(pages.product, {
          //   productId: route.params.productId,
          // });
          navigation.goBack()
        }}
        errorComponent={() => (
          <View>
            <Text style={{ fontFamily: "primary", fontSize: 20 }}>
              خطا در نمایش تصویر محصول
            </Text>
          </View>
        )}
        flatListProps={{showsHorizontalScrollIndicator : false}}
      />
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          bottom: 20,
          width: "100%",
          height: fadeAnim,
          // opacity: fadeAnim,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FlatList
          ref={flatListRef}
          style={{ height: 50 }}
          data={images}
          keyExtractor={(i) => i.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ position: "relative", zIndex: 100 }}
              onPress={() => setCurrentImage(index)}
            >
              <Image
                source={{ uri: imageLinkGenerator(item, "jpg", 200) }}
                style={{
                  width: 100,
                  height: "100%",
                  borderRadius: 15,
                  // borderColor: colors.seconadryColor,
                  // borderWidth: index === currentImage ? 5 : 0,
                  marginRight: 10,
                  borderTopWidth: 50,
                  backgroundColor: colors.white,
                  borderColor: colors.white,
                }}
              />
              {index === currentImage && (
                <View
                  style={{
                    width: 80,
                    height: "5%",
                    backgroundColor: colors.seconadryColor,
                    position: "absolute",
                    bottom: 0,
                    borderRadius: 15,
                    left: 10,
                    maxHeight: 20,
                  }}
                ></View>
              )}
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </AppView>
  );
};

export default Images;
