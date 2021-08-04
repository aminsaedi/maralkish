import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  PixelRatio,
} from "react-native";
import CountDown from "react-native-countdown-component";
import Carousel from "react-native-snap-carousel";
import LottieView from "lottie-react-native";
import Pagination from "../components/pagination/Pagination";

// components import
import AppView from "../components/AppView/AppView";
import StarContainer from "./../components/Star";
import Line from "../components/Line";
import ReviewSquareContainer from "../components/ReviewSquareContainer";
import ListItem from "../components/ListItem";
import VariantsHolder from "./../components/Variants/VariantsHolder";
import SimilarProducts from "../components/SimilarProducts";
import ProductNavigator from "./../components/ProductNavigator";
import ProgressiveImage from "./../components/ProgressiveImage";

// api import
import {
  apiGetProductById,
  apiGetProductReviews,
  apiGetSimilarProducts,
} from "../api/products";
import { apiGetCategories } from "../api/util";

// utilities import
import colors from "../utilities/colors";
import pages from "./../navigation/routes";
import imageLinkGenerator from "./../utilities/imageLinkGenerator";
import ExistsInCartButton from "../components/ExistsInCartButton";
import AuthContext from "./../auth/context";

const Product = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState();
  const [reviews, setReviews] = useState([]);
  const [variantsHolder, setVariantsHolder] = useState([]);
  const [currentVariant, setCurrentVariant] = useState();
  const [properties, setProperties] = useState();
  const [activeImage, setActiveImage] = useState(0);
  const [similars, setSimilars] = useState();
  const [catagories, setCatagories] = useState();
  const [loading, setLoading] = useState(true);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const getProduct = async () => {
    const properToAdd = [];
    setLoading(true);
    try {
      const result = await apiGetProductById(route.params.productId);
      setLoading(false);
      if (result.status === 200) {
        setProduct(result.data);
        setCurrentVariant(result.data.defaultVariant);
        result.data.propertyGroups.forEach((group) => {
          if (properToAdd.length < 6) {
            group.properties.forEach((item) => {
              if (properToAdd.length < 6)
                properToAdd.push({
                  id: item.id,
                  name: item.name,
                  values: item.values,
                });
            });
          }
        });
        setProperties(properToAdd);
      }
    } catch (error) {
      setLoading(false);
      if (error?.response && error?.response?.status === 404) {
        navigation.goBack();
        alert("محصول مورد نظر یافت نشد");
        return;
      } else return alert("خطا در نمایش محصول")
    }
  };

  const getReviews = async () => {
    setLoading(true);
    const result = await apiGetProductReviews(route.params.productId);
    if (result.status === 200) setReviews(result.data);
    setLoading(false);
  };

  const getSimilars = async () => {
    setLoading(true);
    const result = await apiGetSimilarProducts(route.params.productId);
    if (result.status === 200) setSimilars(result.data);
    setLoading(false);
  };

  const getCategories = async () => {
    setLoading(true);
    const result = await apiGetCategories();
    if (result.status === 200) setCatagories(result.data);
    setLoading(false);
  };

  const calculateOptins = () => {
    if (!product) return;
    let filteredVariants = [...product.variants];
    let options = [...product.options];
    let setTostate = [];
    options.forEach((option) => {
      let toAdd = {
        id: option.id,
        title: option.name,
        items: [],
        selectedItemValue: "",
      };
      let currentOptionValue = currentVariant.options.find(
        (x) => x.productOptionId === option.id
      ).value;
      let optionValues = [];
      filteredVariants.forEach((variant) => {
        let variantOptionValue = variant.options.find(
          (x) => x.productOptionId === option.id
        ).value;
        if (
          variantOptionValue &&
          optionValues.indexOf(variantOptionValue) < 0
        ) {
          if (variantOptionValue === currentOptionValue)
            toAdd.selectedItemValue = variantOptionValue;
          optionValues.push(variantOptionValue);
        }
      });
      toAdd.items = [...optionValues];
      filteredVariants = filteredVariants.filter(
        (variant) =>
          variant.options.find((x) => x.productOptionId === option.id).value ===
          currentOptionValue
      );
      // setVariantsHolder([...variantsHolder, toAdd]);
      // // console.log(toAdd);
      setTostate.push(toAdd);
    });
    // console.log(variantsHolder);
    // console.log(setTostate);
    // console.log(setTostate)
    setVariantsHolder(setTostate);
  };

  const handlePressOnVariant = (optionId, pressedItem) => {
    // console.log(optionId, pressedItem);
    // const newCurrentVariant = product.variants.find((variant) => {
    //   const innerResult = variant.options.find((option) => {
    //     if (option.productOptionId === optionId && option.value === pressedItem)
    //       return true;
    //   });
    //   if (variant.options.includes(innerResult)) return true;
    // });
    // setCurrentVariant(newCurrentVariant);
    // console.log(newCurrentVariant);
    let filteredVariants = product.variants;
    let brk = false;
    product.options.forEach((x) => {
      if (brk) return;
      const val =
        x.id === optionId
          ? pressedItem
          : currentVariant.options.find((y) => y.productOptionId === x.id)
              .value;
      var temp = filteredVariants.filter(
        (y) => y.options.find((z) => z.productOptionId === x.id).value === val
      );
      if (temp.length > 0) filteredVariants = temp;
      else brk = true;
      setCurrentVariant(
        filteredVariants.length > 0
          ? filteredVariants[0]
          : variants.find(
              (y) =>
                y.options.find((z) => z.productOptionId === optionId).value ===
                value
            )
      );
    });
  };

  useEffect(() => {
    getProduct();
    setCurrentVariant(null);
    setProduct(null);
    setActiveImage(0);
    getReviews();
    getSimilars();
    getCategories();
    if (product && currentVariant) calculateOptins();
  }, [route.params.productId]);

  useEffect(() => {
    if (product && currentVariant) calculateOptins();
  }, [product, currentVariant]);

  if (
    loading ||
    !product ||
    !reviews ||
    !properties ||
    !catagories ||
    !similars
  )
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
          loop
        />
      </View>
    );

  return (
    <AppView>
      {/* TODO: related products */}
      {/* TODO: description */}
      <ScrollView style={styles.topArea} showsVerticalScrollIndicator={false}>
        {product.hasSpecialOffer && (
          <View style={styles.sectionContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: colors.primaryColor,
                  fontFamily: "primary",
                  fontSize: 15,
                  marginRight: 10,
                }}
              >
                پیشنهاد شگفت انگیز
              </Text>
              <CountDown
                until={
                  (new Date(product.currentSpecialOffer.end) - new Date()) /
                  1000
                }
                style={{ fontFamily: "primary" }}
                digitStyle={{ fontFamily: "primary" }}
                digitTxtStyle={{
                  fontFamily: "primary",
                  color: colors.primaryColor,
                }}
                // digitStyle={{ fontFamily: "primary" }}
                timeLabels={false}
                showSeparator
                separatorStyle={{ color: colors.primaryColor }}
              />
            </View>
            <Line
              color={colors.primaryColor}
              width="100%"
              marginHorizontal={0}
              style={{ marginBottom: 5 }}
            />
          </View>
        )}

        {product.status === "unavailable" && (
          <View style={styles.sectionContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.gray,
                  fontFamily: "primary",
                  fontSize: 22,
                  marginVertical: 10,
                }}
              >
                ناموجود
              </Text>
            </View>
            <Line
              color={colors.gray}
              width="100%"
              marginHorizontal={0}
              style={{ marginBottom: 5 }}
            />
          </View>
        )}

        {product.images && product.images.length > 0 && (
          <View
            style={[
              styles.sectionContainer,
              { height: 300, position: "relative" },
            ]}
          >
            {/* <SliderBox
            images={productImagesToArray(product.images)}
            onCurrentImagePressed={(value) => {
              setCurentImageIndex(value);
              setShowImages(true);
            }}
            style={{ height: "100%" }}
            dotColor={colors.gray}
            inactiveDotColor={colors.lightGray}
            resizeMode="center"
            paginationBoxStyle={{ backgroundColor: colors.white }}
            imageLoadingColor={colors.primaryColor}
          /> */}
            <Carousel
              // data={productImagesToArray(product.images, windowWidth * 3)}
              data={product.images}
              itemHeight={300}
              itemWidth={windowWidth}
              sliderHeight={300}
              sliderWidth={windowWidth}
              loop={true}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback
                  key={index}
                  style={{
                    backgroundColor: colors.gray,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    navigation.navigate(pages.images, {
                      productId: route.params.productId,
                      index,
                      productName: product.name.slice(0, 25),
                    });
                  }}
                >
                  <ProgressiveImage
                    source={{
                      uri: imageLinkGenerator(
                        item,
                        "webp",
                        (windowWidth - 50) * PixelRatio.get(),
                        windowHeight * PixelRatio.get(),
                        80
                      ),
                    }}
                    thumbnailSource={{
                      uri: imageLinkGenerator(
                        item,
                        "webp",
                        windowWidth,
                        windowHeight,
                        30
                      ),
                    }}
                    style={{
                      width: windowWidth - 50,
                      height: 300,
                      marginLeft: 25,
                    }}
                    resizeMethod="auto"
                    resizeMode="contain"
                  />
                </TouchableWithoutFeedback>
              )}
              onSnapToItem={(index) => setActiveImage(index)}
            />
            <Pagination
              animatedDuration={0}
              containerStyle={{
                // maxHeight: 10,
                position: "absolute",
                bottom: 0,
                left: 5,
                marginHorizontal: 0,
              }}
              dotsLength={product.images.length}
              activeDotIndex={activeImage}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                // marginHorizontal: 8,
              }}
              inactiveDotColor={colors.secondaryTextColor}
              dotColor="#81858B"
              dotContainerStyle={{ paddingVertical: 0 }}
              style={{ marginHorizontal: 0 }}
            />
          </View>
        )}
        <View style={styles.sectionContainer}>
          <Text
            style={{
              fontFamily: "primaryBold",
              fontSize: 19,
              marginHorizontal: 10,
              textAlign: "right",
              marginVertical: 15,
              lineHeight: 30,
            }}
          >
            {product.name}
          </Text>
          {product.voters > 0 && (
            <StarContainer
              score={product.score}
              voters={product.voters}
              style={{ marginLeft: 20, marginBottom: 20 }}
            />
          )}
          <Line />
          {product.options && product.options.length > 0 && (
            <VariantsHolder
              style={{ marginVertical: 10 }}
              variantsHolder={variantsHolder}
              handlePressOnVariant={handlePressOnVariant}
            />
          )}
        </View>
        {
          <View style={(styles.sectionContainer, { marginVertical: 5 })}>
            <SimilarProducts
              similars={similars}
              productId={route.params.productId}
            />
          </View>
        }
        {properties && properties.length > 0 && (
          <View
            style={[styles.sectionContainer, { paddingTop: 10, marginTop: 5,paddingHorizontal : 15 }]}
          >
            <Text
              style={{
                fontFamily: "primaryBold",
                marginRight: 20,
                fontSize: 17,
                textAlign: "right",
                marginBottom: 10,
              }}
            >
              ویژگی های محصول
            </Text>
            {/* {product.propertyGroups[0].properties.slice(0, 5).map((item) => (
            <Text
              key={item.id}
              style={{
                fontFamily: "primary",
                marginRight: 20,
                paddingVertical: 5,
                textAlign: "right",
              }}
            >
              {item.name} : {item.values}
            </Text>
          ))} */}
            {properties.map((item) => (
              <React.Fragment key={item.id}>
                <Text
                  style={{
                    fontFamily: "primary",
                    marginRight: 5,
                    paddingVertical: 5,
                    textAlign: "right",
                    color: colors.gray,
                  }}
                >
                  {item.name} :{" "}
                  <Text
                    style={{
                      fontFamily: "primary",
                      marginRight: 20,
                      paddingVertical: 5,
                      textAlign: "right",
                      color: colors.black,
                      lineHeight : 24,
                      paddingLeft : 15,marginLeft : 15,
                      paddingRight:20
                    }}
                  >
                    {item.values +" "}
                  </Text>
                </Text>
              </React.Fragment>
            ))}
            <Line />
            <ListItem
              lable="مشخصات فنی"
              onPress={() =>
                navigation.navigate(pages.details, {
                  propertyGroups: product.propertyGroups,
                })
              }
            />
          </View>
        )}
        {catagories && catagories.length > 0 && product.categoryId && (
          <ProductNavigator
            onPress={(id, name) => {
              // navigation.navigate(pages.subCategories, {
              //   categoryId: id,
              //   headerName: name,
              // });
              navigation.push(pages.app, {
                screen: pages.catagories,
                params: {
                  screen: pages.subCategories,
                  params: {
                    categoryId: id,
                    headerName: name,
                  },
                },
              });
            }}
            categories={catagories}
            productCategoryId={product.categoryId}
          />
        )}
        <View
          style={[styles.sectionContainer, { marginBottom: 5, paddingTop: 10 }]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ fontFamily: "primary" }}>دیدگاه کاربران</Text>
            <TouchableOpacity
              onPress={() =>
                product.voters > 0 &&
                navigation.navigate(pages.reviews, {
                  productId: route.params.productId,
                  totalScore: 2,
                  totalVoters: product.voters,
                })
              }
            >
              <Text
                style={{ fontFamily: "primary", color: colors.seconadryColor }}
              >
                {product.voters} نظر
              </Text>
            </TouchableOpacity>
          </View>
          {product.voters > 0 && (
            <FlatList
              inverted
              data={[
                ...reviews.slice(0, 5),
                {
                  isLastItem: true,
                  title: "همه نظرات",
                  datePublished: "lastItem",
                },
              ]}
              keyExtractor={(item) => item.datePublished.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <ReviewSquareContainer
                  style={{ marginLeft: 15 }}
                  review={item}
                  onLastItemPress={() =>
                    navigation.navigate(pages.reviews, {
                      productId: route.params.productId,
                      totalScore: 2,
                      totalVoters: product.voters,
                    })
                  }
                  onPress={() =>
                    navigation.navigate(pages.reviews, {
                      productId: route.params.productId,
                      totalScore: 2,
                      totalVoters: product.voters,
                    })
                  }
                />
              )}
            />
          )}
          <ListItem
            onPress={() => {
              if (user)
                navigation.navigate(pages.newReview, {
                  productId: route.params.productId,
                });
              else if (!user) navigation.navigate(pages.myAccount);
            }}
            lable="دیدگاه خود را درباره این کالا بنویسید"
            rightIconName="message-outline"
          />
        </View>
        <Text style={{ textAlign: "center", fontFamily: "primary" }}>
          شناسه کالا : {product.uniqueId}
        </Text>
      </ScrollView>
      {currentVariant && (
        <View style={styles.bottomArea}>
          <View style={styles.priceContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              {currentVariant &&
                currentVariant.price !== currentVariant.regularPrice && (
                  <React.Fragment>
                    <View
                      style={{
                        backgroundColor: colors.primaryColor,
                        borderRadius: 15,
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "primary",
                          textAlign: "center",
                          color: colors.buttonTextColor,
                          letterSpacing: 1.5,
                        }}
                      >
                        {Math.round(
                          ((currentVariant.regularPrice -
                            currentVariant.price) /
                            currentVariant.regularPrice) *
                            100
                        )}
                        %
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: "primary",
                        textAlign: "right",
                        fontSize: 15,
                        marginLeft: 5,
                        color: colors.gray,
                        textDecorationLine: "line-through",
                      }}
                    >
                      {currentVariant.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                  </React.Fragment>
                )}
            </View>
            <Text
              style={{ fontFamily: "primary", fontSize: 20, textAlign: "left" }}
            >
              {currentVariant &&
                currentVariant.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              تومان
            </Text>
          </View>
          <ExistsInCartButton
            variantId={currentVariant.id}
            minOrderQuantity={currentVariant.minOrderQuantity}
            maxOrderQuantity={currentVariant.maxOrderQuantity}
          />
        </View>
      )}
    </AppView>
  );
};

const styles = StyleSheet.create({
  topArea: {
    width: "100%",
    height: "90%",
    backgroundColor: colors.lightGray,
  },
  bottomArea: {
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    // backgroundColor : "red"
    borderTopColor: colors.lightGray,
    borderWidth: 0.5,
  },
  priceContainer: {
    // backgroundColor: "blue",
  },
  addToCartButton: {
    width: "40%",
  },
  sectionContainer: {
    backgroundColor: colors.white,
    // paddingVertical: 10,
  },
});

export default Product;
