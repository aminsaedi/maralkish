import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import * as Sentry from "sentry-expo";

const styles = StyleSheet.create({
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: "white",
  },
});

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);

  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
      useNativeDriver : false
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const { thumbnailSource, source, style, ...props } = this.props;

    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Animated.Image
          {...props}
          source={thumbnailSource}
          style={[style, { opacity: this.thumbnailAnimated }]}
          onLoad={this.handleThumbnailLoad}
          // onError={(e) =>
          //   Sentry.captureException({
          //     name: "error at progressive image thumbnail",
          //     error: e,
          //   })
          // }

          //   blurRadius={1}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
          // onError={(e) =>
          //   Sentry.captureException({
          //     name: "error at progressive image main image",
          //     error: e,
          //   })
          // }
        />
      </View>
    );
  }
}

export default ProgressiveImage;
