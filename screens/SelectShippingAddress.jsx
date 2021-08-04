import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import AppView from "../components/AppView/AppView";

import { apiGetUserAddresses, apiGetFullUserProfile } from "../api/users";
import { apiGetShippingMethods } from "../api/cart";
import colors from "../utilities/colors";
import AddressSelectorCard from "../components/AddressSelectorCard";
import Line from "../components/Line";
import ListItem from "../components/ListItem";
import pages from "../navigation/routes";
import CartContext from "../cart/cartContext";
import ProductInCartHorizentalCard from "../components/ProductInCartHorizentalCard";
import HorizentalLine from "../components/HorizentalLine";
import AppButton from "../components/Form/AppButton";
import ShippingMethodCard from "./../components/ShippingMethodCard";
import LottieView from "lottie-react-native";
import ShippingMethodSelector from "../components/ShippingMethodSelector";
import ExpandableShippingMethodSelector from "../components/ExpandableShippingMethodSelector";
import ExpandablePaymentMethodSelector from "../components/ExpandablePaymentMethodSelector";

const SelectShippingAddress = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [addresses, setAddresses] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [addressSelectorModalVisible, setAddressSelectorModal] =
    useState(false);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState();
  const [shippingMethods, setShippingMethods] = useState();
  const [selectShippingMethodModal, setSelectShippingMethodModal] =
    useState(false);
  const [paymentMethods, setPaymentMethods] = useState();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const [loading, setLoading] = useState(true);
  const { cart, totalItems } = useContext(CartContext);

  const handleGetAddresses = async () => {
    try {
      setLoading(true);
      const result = await apiGetUserAddresses();
      if (result.status === 200) {
        if (result.data.length === 0) {
          navigation.navigate(pages.addAddress, {
            returnTo: pages.selectShippingMethos,
          });
        }
        setAddresses(result.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert("خطا در دریافت آدرس ها");
    }
  };

  const getShippingMethods = async () => {
    setLoading(true);
    try {
      if (cart && selectedAddress) {
        const result = await apiGetShippingMethods(
          cart.uniqueId,
          selectedAddress.cityId
        );
        if (result.status === 200 && result.data.length > 0) {
          setSelectedShippingMethod(result.data[0]);
          setShippingMethods(result.data);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("خطایی رخ داد");
    }
  };

  const handleGetUserDefualtAddress = async () => {
    try {
      if (route?.params?.addressId && addresses) {
        setSelectedAddress(
          addresses.find((i) => i.id === route?.params?.addressId)
        );
      } else {
        setLoading(true);
        const result = await apiGetFullUserProfile();
        if (result.status === 200 && result.data.defaultAddress)
          setSelectedAddress(result.data.defaultAddress);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert("خطایی رخ داد");
    }
  };

  useEffect(() => {
    handleGetAddresses();
  }, [isFocused]);

  useEffect(() => {
    handleGetUserDefualtAddress();
  }, [addresses]);

  useEffect(() => {
    getShippingMethods();
  }, [selectedAddress]);
  useEffect(() => {
    const methods = [];
    if (selectedShippingMethod) {
      if (selectedShippingMethod.isPaymentMethodCashOnDelivery)
        methods.push({
          id: 1,
          key: "cashOnDelivery",
          name: "پرداخت در محل",
          description:
            "شما میتوانید مبلغ سفارش خود را هنگام دریافت سفارش پرداخت کنید.",
        });
      if (selectedShippingMethod.isPaymentMethodOnline)
        methods.push({
          id: 2,
          key: "online",
          name: "پرداخت آنلاین",
          description: "پرداخت مبلغ سفارش با تمامی کارت های بانکی",
        });
      if (selectedShippingMethod.isPaymentMethodSettle)
        methods.push({
          id: 3,
          key: "settle",
          name: "کارت به کارت",
          description:
            "شما میتوانید مبلغ سفارش خود را به شماره کارتی که نمایش خواهد داده شد کارت به کارت کنید",
        });
      if (methods.length > 0) setSelectedPaymentMethod(methods[0]);
      setPaymentMethods(methods);
    }
  }, [selectedShippingMethod]);

  // if (loading)
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: colors.white,
  //         alignItems: "center",
  //         justifyContent: "center",
  //         flex: 1,
  //       }}
  //     >
  //       <LottieView
  //         style={{ width: 200, height: 200 }}
  //         source={require("../assets/spinner.json")}
  //         autoPlay
  //       />
  //     </View>
  //   );

  return (
    <View>
      <ScrollView
        style={{ backgroundColor: colors.white, height: "90%" }}
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.flexRow,
            {
              marginTop: 5,
              justifyContent: "flex-end",
              paddingVertical: 20,
              backgroundColor: colors.white,
              width: "97%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,
              borderRadius: 5,
            },
          ]}
        >
          <View style={{ flex: 1, paddingRight: 25 }}>
            {!selectedAddress && (
              <Text
                style={{
                  fontFamily: "primaryBold",
                  color: colors.seconadryColor,
                  textAlign: "right",
                }}
                onPress={() =>
                  navigation.navigate(pages.addAddress, {
                    returnTo: pages.selectShippingMethos,
                  })
                }
              >
                یک آدرس اضافه کنید
              </Text>
            )}
            {selectedAddress && (
              <React.Fragment>
                <Text
                  style={{
                    fontFamily: "primary",
                    color: colors.gray,
                    textAlign: "right",
                  }}
                >
                  ارسال به
                </Text>
                <Text
                  style={{
                    fontFamily: "primaryBold",
                    lineHeight: 25,
                    textAlign: "right",
                  }}
                  numberOfLines={2}
                >
                  {selectedAddress.address}
                </Text>
                <Text
                  style={{
                    fontFamily: "primaryBold",
                    lineHeight: 25,
                    textAlign: "right",
                  }}
                  numberOfLines={1}
                >
                  {selectedAddress.name}
                </Text>
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => setAddressSelectorModal(true)}
                >
                  <Text
                    style={{
                      fontFamily: "primary",
                      textAlign: "left",
                      color: colors.seconadryColor,
                    }}
                  >
                    تغیر یا ویرایش آدرس
                    <MaterialCommunityIcons name="chevron-left" />
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            )}
          </View>
          <Ionicons
            name="location-outline"
            color={colors.black}
            size={30}
            style={{ marginRight: "2.5%" }}
          />
        </View>
        <View
          style={{
            marginTop: 5,
            backgroundColor: colors.white,
            width: "97%",
            paddingTop: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
            borderRadius: 5,
            paddingBottom: 10,
          }}
        >
          <View
            style={[
              styles.flexRow,
              {
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginBottom: 5,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "primary",
                color: colors.gray,
                textAlign: "right",
              }}
            >
              {totalItems} کالا
            </Text>
            <Text
              style={{
                textAlign: "right",
                fontFamily: "primaryBold",
                fontSize: 17,
                color: colors.black,
              }}
            >
              اقلام سفارش
            </Text>
          </View>
          {cart && cart.items && (
            <FlatList
              horizontal
              inverted
              data={cart.items}
              keyExtractor={(i) => i.id.toString()}
              renderItem={({ item }) => (
                <ProductInCartHorizentalCard product={item} />
              )}
              ItemSeparatorComponent={HorizentalLine}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            marginTop: 5,
            backgroundColor: colors.white,
            width: "98%",
            paddingTop: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            paddingRight: 20,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "primaryBold",
              fontSize: 17,
              textAlign: "right",
            }}
          >
            شیوه ارسال سفارش
          </Text>
          <ExpandableShippingMethodSelector
            methods={shippingMethods}
            selectedMethod={selectedShippingMethod}
            onMethodPress={(method) => setSelectedShippingMethod(method)}
          />
          {false && (
            <View style={styles.flexRow}>
              <View
                style={{
                  width: "50%",
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {shippingMethods.length > 1 && (
                  <TouchableOpacity
                    style={[styles.flexRow, { padding: 5 }]}
                    onPress={() => setSelectShippingMethodModal(true)}
                  >
                    <MaterialCommunityIcons
                      name="chevron-left"
                      color={colors.seconadryColor}
                      size={16}
                    />
                    <Text
                      style={{
                        fontFamily: "primary",
                        color: colors.seconadryColor,
                        fontSize: 16,
                      }}
                    >
                      ویرایش روش ارسال
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  width: "50%",
                  height: 100,
                  display: "flex",
                  justifyContent: "space-evenly",
                  paddingRight: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "primary",
                    color: colors.secondaryTextColor,
                    fontSize: 15,
                    textAlign: "right",
                  }}
                >
                  روش ارسال :{" "}
                  <Text
                    style={{ fontFamily: "primaryBold", color: colors.black }}
                  >
                    {selectedShippingMethod.name}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontFamily: "primary",
                    color: colors.secondaryTextColor,
                    fontSize: 15,
                    textAlign: "right",
                  }}
                >
                  هزینه ارسال :{" "}
                  <Text
                    style={{ fontFamily: "primaryBold", color: colors.black }}
                  >
                    {selectedShippingMethod.cost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    تومان
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            paddingRight: 20,
            backgroundColor: colors.white,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
            borderRadius: 5,
            width: "97%",
          }}
        >
          <Text
            style={{
              fontFamily: "primaryBold",
              fontSize: 17,
              textAlign: "right",
            }}
          >
            شیوه پرداخت
          </Text>
          <ExpandablePaymentMethodSelector
            methods={paymentMethods}
            selectedMethod={selectedPaymentMethod}
            onMethodPress={(method) => setSelectedPaymentMethod(method)}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 10,
            backgroundColor: colors.white,
            paddingTop: 10,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
            borderRadius: 5,
            width: "97%",
            marginBottom: "5%",
          }}
        >
          <View
            style={[
              styles.flexRow,
              {
                justifyContent: "space-between",
              },
            ]}
          >
            <Text style={{ fontFamily: "primary", color: colors.gray }}>
              {cart?.items?.length} کالا
            </Text>
            <Text style={{ fontFamily: "primaryBold", fontSize: 17 }}>
              جزییات قیمت
            </Text>
          </View>
          <View
            style={[
              styles.flexRow,
              { marginTop: 15, justifyContent: "space-between" },
            ]}
          >
            <Text style={{ fontFamily: "primaryBold", fontSize: 15 }}>
              {cart?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              تومان
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 15,
                color: colors.gray,
              }}
            >
              قیمت کالاها
            </Text>
          </View>
          <View
            style={[
              styles.flexRow,
              { marginTop: 15, justifyContent: "space-between" },
            ]}
          >
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 15,
                color: colors.primaryColor,
              }}
            >
              {0} تومان
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 15,
                color: colors.gray,
              }}
            >
              تخفیف کالاها
            </Text>
          </View>
          <View
            style={[
              styles.flexRow,
              {
                marginTop: 15,
                justifyContent: "space-between",
                marginBottom: 20,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 15,
                color: colors.black,
              }}
            >
              {cart?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              تومان
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 15,
                color: colors.gray,
              }}
            >
              جمع سبد خرید
            </Text>
          </View>
          <Line />
          <View
            style={[
              styles.flexRow,
              {
                marginTop: 15,
                justifyContent: "space-between",
                marginBottom: 20,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 15,
                color: colors.black,
              }}
            >
              {selectedShippingMethod?.cost
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "تعین نشده"}{" "}
              {selectedShippingMethod && "تومان"}
            </Text>
            <Text
              style={{
                fontFamily: "primary",
                fontSize: 15,
                color: colors.gray,
              }}
            >
              هزینه ارسال
            </Text>
          </View>
          {!selectedShippingMethod && <Line style={{ marginBottom: 10 }} />}
          {!selectedShippingMethod && (
            <Text
              style={{
                fontFamily: "primary",
                textAlign: "right",
                color: colors.gray,
                marginBottom: 10,
              }}
            >
              هزینه پس از انتخاب زمان ارسال مرسوله محاسبه خواهد شد
            </Text>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: "10%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ display: "flex", alignItems: "center" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "primary",
                color: colors.gray,
                fontSize: 15,
              }}
            >
              مجموع
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "primaryBold",
              fontSize: 17,
              color: colors.black,
            }}
          >
            {cart?.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </View>
        <AppButton
          disabled={
            !selectedShippingMethod ||
            !cart ||
            !cart.uniqueId ||
            !selectedAddress
          }
          loading={loading}
          value="مشاهده پیش فاکتور"
          style={{ width: "45%" }}
          onPress={() =>
            navigation.push(pages.invoice, {
              cartUniqueId: cart.uniqueId,
              shippingMethodId: selectedShippingMethod.id,
              address: selectedAddress,
              paymentMethod: selectedPaymentMethod,
            })
          }
        />
      </View>
      <Modal
        visible={addressSelectorModalVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setAddressSelectorModal(false)}
      >
        <AppView isSAfe style={{ flex: 1 }}>
          <View
            style={[
              styles.flexRow,
              { justifyContent: "flex-end", minHeight: 50 },
            ]}
          >
            <Text
              style={{
                fontFamily: "primaryBold",
                fontSize: 20,
                marginRight: 25,
              }}
            >
              انتخاب آدرس
            </Text>
            <TouchableOpacity onPress={() => setAddressSelectorModal(false)}>
              <MaterialCommunityIcons
                name="arrow-right"
                size={25}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={addresses}
            keyExtractor={(i) => i.id.toString()}
            renderItem={({ item }) => (
              <AddressSelectorCard
                address={item}
                onPress={() => {
                  setSelectedAddress(item);
                  setAddressSelectorModal(false);
                }}
                onEdit={(address) => {
                  navigation.navigate(pages.editAddress, {
                    input: address,
                    returnTo: pages.selectShippingMethos,
                  });
                  setAddressSelectorModal(false);
                }}
                isActive={item.id === selectedAddress.id ? true : false}
              />
            )}
            ItemSeparatorComponent={Line}
            ListFooterComponent={() => (
              <ListItem
                lable="افزودن آدرس جدید"
                rightIconName="map-marker"
                onPress={() => {
                  setAddressSelectorModal(false);
                  navigation.navigate(pages.addAddress);
                }}
              />
            )}
          />
        </AppView>
      </Modal>
      <Modal
        visible={selectShippingMethodModal}
        transparent={true}
        onRequestClose={() => setSelectShippingMethodModal(false)}
        animationType="fade"
      >
        <View style={{ height: "100%" }}>
          <TouchableOpacity
            style={{
              width: "100%",
              height: "70%",
              backgroundColor: colors.modalOverlay,
            }}
            onPress={() => setSelectShippingMethodModal(false)}
          ></TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: "30%",
              backgroundColor: colors.white,
            }}
          >
            <View
              style={[
                styles.flexRow,
                {
                  justifyContent: "space-between",
                  height: "15%",
                  paddingHorizontal: 10,
                  display: "flex",
                  alignItems: "center",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => setSelectShippingMethodModal(false)}
              >
                <MaterialCommunityIcons name="close" size={25} />
              </TouchableOpacity>
              <Text style={{ fontFamily: "primary", fontSize: 20 }}>
                انتخاب روش ارسال
              </Text>
            </View>
            <View style={{ width: "100%", height: "85%" }}>
              <FlatList
                data={shippingMethods}
                keyExtractor={(i) => i.id.toString()}
                renderItem={({ item }) => (
                  <ShippingMethodCard
                    item={item}
                    onPress={() => {
                      setSelectedShippingMethod(item);
                      setSelectShippingMethodModal(false);
                    }}
                    isActive={
                      item.id === selectedShippingMethod.id ? true : false
                    }
                  />
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  applyButton: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: colors.primaryColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    bottom: "2.5%",
    left: "5%",
  },
});

export default SelectShippingAddress;
