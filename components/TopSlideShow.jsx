import React, { useState, useEffect } from "react";
import Carousel from "react-native-snap-carousel";
import SliderItem from "./SliderItem/SliderItem";
import { Dimensions, View } from "react-native";
import { apiGetSlideShows } from "../api/slideshow";

const TopSlideShow = () => {
  const [loading, setLoading] = useState(true);
  const [slideshows, setSlideshows] = useState();

  const getSlideshows = async () => {
    try {
      const result = await apiGetSlideShows();
      if (result.status === 200) {
        setLoading(false);
        return setSlideshows(result.data.slides);
      }
    } catch (error) {
      setLoading(false)
      if (error.response.status === 404) return setLoading(false);
    }
  };
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    getSlideshows();
  }, []);

  if (loading) {
    return (
      <View style={{ width: windowWidth, height: 180, marginTop: 25,marginBottom : 50 }}></View>
    );
  }

  if (slideshows)
    return (
      <Carousel
        data={slideshows}
        // itemHeight={180}
        itemWidth={windowWidth - 50}
        // sliderHeight={180}
        sliderWidth={windowWidth}
        firstItem={slideshows.length - 1}
        loop={true}
        autoplay={true}
        // enableMomentum={false}
        // lockScrollWhileSnapping={false}
        renderItem={({ item, index }) => (
          <SliderItem key={index} slide={item} />
        )}
        containerCustomStyle={{
          height: 180,
          maxHeight: 180,
          marginTop: 25,
          marginBottom: 50,
        }}
        // layout="default"
      />
    );
  else return null;
};

export default TopSlideShow;
