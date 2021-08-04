import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AppInput from "./../components/Form/AppInput";
import DropDownPlaceHolder from "./../components/DropDownPlaceHolder";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { apiGetStates } from "../api/util";
import SearchTextItem from "../components/SearchTextItem";
import AppButton from "./../components/Form/AppButton";
import { useFormik } from "formik";
import * as yup from "yup";
import regexs from "../utilities/regex";
import { apiAddNewAddress, apiUpdateAddress } from "../api/users";
import AppInputError from "./../components/Form/AppInputError";
import pages from "./../navigation/routes";
import AppView from "../components/AppView/AppView";
import colors from "../utilities/colors";
import LocationPicker from "./LocationPicker";
import LocationDirectAddressItem from "../components/LocationDirectAddressItem";
import Line from "./../components/Line";
import LottieView from "lottie-react-native";

const AddAddress = ({ navigation, route }) => {
  const [stateModal, setStateModal] = useState(false);
  const [cityModal, setCityModal] = useState(false);
  const [states, setStates] = useState();
  const [cities, setCities] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [filteredStates, setFilteredStates] = useState();
  const [filteredCities, setFilteredCities] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showMoreDetailModal, setShowMoreDetailModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState();
  const [findedAddress, setFinddedAddress] = useState();
  const [showSearchLocationModal, setShowSearchLocationModal] = useState(false);
  const [searchLocationString, setSearchLocationString] = useState();
  const [directAddresses, setDirectAddresses] = useState();

  const getStates = async () => {
    try {
      const result = await apiGetStates();
      if (result.status === 200) {
        setStates(result.data);
        setFilteredStates(result.data);
      }
    } catch (error) {
      alert("خطایی رخ داد");
    }
  };

  useEffect(() => {
    setSelectedLocation({
      latitude: Number(route.params.input?.latitude),
      longitude: Number(route.params.input?.longitude),
      latitudeDelta: 0.0362,
      longitudeDelta: 0.0361,
    });
    getStates();
  }, []);

  useEffect(() => {
    if (route.params && route.params.input && states) {
      const state = states.find((i) => i.id === route.params.input.stateId);
      if (state) {
        setSelectedState(state);
        const city = state.cities.find(
          (ii) => ii.id === route.params.input.cityId
        );
        if (city) setSelectedCity(city);
      }
    }
  }, [route.params, states]);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("نام خود را انتخاب کنید"),
    lastName: yup.string().required("نام خانوادگی خود را وارد کنید"),
    mobile: yup
      .string()
      .required("شماره موبایل خود را وارد کنید")
      .matches(regexs.mobile, "شماره مویال خود را صحیح وارد کنید"),
    phone: yup.string().required("شماره تلفن ثابت خود را وارد کنید"),
    address: yup.string().required("آدرس خود را وارد کنید"),
    postalCode: yup.string().required("کدپستی خود را وارد کنید"),
    //   .matches(regexs.postalCode, "کدپستی خود را صحیح وارد کنید"),
  });

  const handleConvertLocationToAddress = async () => {
    try {
      if (
        selectedLocation &&
        selectedLocation.latitude &&
        selectedLocation.longitude
      ) {
        const result = await apiGetAddressWithLocation(
          selectedLocation.longitude,
          selectedLocation.latitude
        );
        if (result.status === 200) {
          setFinddedAddress(result.data.fullAddress);
          const findedState = states.find((i) => i.id === result.data.stateId);
          setSelectedState(findedState);
          const findedCity = findedState.cities.find(
            (i) => i.id === result.data.cityId
          );
          setSelectedCity(findedCity);
        }
      }
    } catch (error) {}
  };

  const handleGetDirectAddresses = async () => {
    try {
      if (
        selectedLocation &&
        selectedLocation.latitude &&
        selectedLocation.longitude
      ) {
        const result = await apiGetDirectAddress(
          selectedLocation.longitude,
          selectedLocation.latitude,
          searchLocationString
        );
        if (result.status === 200) {
          setDirectAddresses(result.data);
        }
      }
    } catch (error) {}
  };

  const handleAddAddress = async (values) => {
    if (!selectedCity) return alert("شهر و استان خود را انتخاب کنید.");
    setButtonLoading(true);
    try {
      const result = await apiUpdateAddress(route.params.input.id, {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        mobile: values.mobile,
        address: values.address,
        postalCode: values.postalCode,
        cityId: selectedCity.id,
      });
      setButtonLoading(false);
      if (result.status === 200) {
        if (route?.params?.returnTo) {
          return navigation.navigate(route?.params?.returnTo, {
            addressId: route.params.input.id,
          });
        } else return navigation.navigate(pages.myAccount);
      }
    } catch (error) {
      setButtonLoading(false);
      console.log(error);
    }
  };

  const addAddressForm = useFormik({
    initialValues: {
      firstName: (route.params.input && route.params.input.firstName) || "",
      lastName: (route.params.input && route.params.input.lastName) || "",
      mobile: (route.params.input && route.params.input.mobile) || "",
      phone: (route.params.input && route.params.input.phone) || "",
      address:
        (route.params.input && route.params.input.address) ||
        findedAddress ||
        "",
      postalCode: (route.params.input && route.params.input.postalCode) || "",
    },
    validationSchema,
    onSubmit: handleAddAddress,
    enableReinitialize: true,
  });

  // console.log(route.params.input);

  const stateFinder = () => {
    // const stateId =
  };

  return (
    <AppView isSAfe>
      <View style={styles.searchBarContainer}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => setShowSearchLocationModal(true)}
        >
          <Text style={styles.lightText}>جستجو</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-right" size={20} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <LocationPicker
          onLocationChange={(d) => setSelectedLocation(d)}
          onConfirm={(d) => {
            setSelectedLocation(d);
            setShowMoreDetailModal(true);
            handleConvertLocationToAddress();
          }}
          inputLocation={selectedLocation}
        />
      </View>
      <TouchableOpacity
        style={styles.moreDetailContainer}
        onPress={() => {
          if (!selectedLocation)
            return alert("موقعیت آدرس خود را روی نقشه مشخص کنید");
          setSelectedLocation(selectedLocation);
          setShowMoreDetailModal(true);
          handleConvertLocationToAddress();
        }}
      >
        <MaterialCommunityIcons name="chevron-up" size={30} />
        <Text style={styles.boldText}>جزئیات آدرس</Text>
      </TouchableOpacity>
      <Modal
        visible={showMoreDetailModal}
        onRequestClose={() => setShowMoreDetailModal(false)}
        animationType="slide"
      >
        <AppView isSAfe>
          <View
            style={{
              width: "100%",
              height: "5%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                setShowMoreDetailModal(false);
                setStateModal(false);
                setCityModal(false);
              }}
            >
              <MaterialCommunityIcons name="close" size={25} />
            </TouchableOpacity>
            <Text style={styles.boldText}>جزئیات آدرس</Text>
          </View>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <View style={styles.container}>
              <AppInput
                style={{ marginBottom: 1, marginTop: 25 }}
                placeholder="نام"
                textAlign="right"
                value={addAddressForm.values.firstName}
                onChangeText={addAddressForm.handleChange("firstName")}
              />
              <AppInputError
                error={
                  addAddressForm.errors.firstName &&
                  addAddressForm.touched.firstName &&
                  addAddressForm.errors.firstName
                }
                style={{ marginBottom: 20 }}
              />
              <AppInput
                style={{ marginBottom: 1 }}
                placeholder="نام‌خانوادگی"
                textAlign="right"
                value={addAddressForm.values.lastName}
                onChangeText={addAddressForm.handleChange("lastName")}
              />
              <AppInputError
                error={
                  addAddressForm.errors.lastName &&
                  addAddressForm.touched.lastName &&
                  addAddressForm.errors.lastName
                }
                style={{ marginBottom: 20 }}
              />
              <AppInput
                style={{ marginBottom: 1 }}
                placeholder="شماره موبایل"
                textAlign="right"
                value={addAddressForm.values.mobile}
                onChangeText={addAddressForm.handleChange("mobile")}
                autoCompleteType="tel"
                keyboardType="phone-pad"
              />
              <AppInputError
                error={
                  addAddressForm.errors.mobile &&
                  addAddressForm.touched.mobile &&
                  addAddressForm.errors.mobile
                }
                style={{ marginBottom: 20 }}
              />
              <AppInput
                style={{ marginBottom: 1 }}
                placeholder="تلفن ثابت"
                textAlign="right"
                value={addAddressForm.values.phone}
                onChangeText={addAddressForm.handleChange("phone")}
                autoCompleteType="tel"
                keyboardType="phone-pad"
              />
              <AppInputError
                error={
                  addAddressForm.errors.phone &&
                  addAddressForm.touched.phone &&
                  addAddressForm.errors.phone
                }
                style={{ marginBottom: 20 }}
              />
              <DropDownPlaceHolder
                style={{ marginBottom: 25 }}
                placeholder="استان"
                value={selectedState && selectedState.name}
                onPress={() => setStateModal(true)}
              />
              <DropDownPlaceHolder
                style={{ marginBottom: 20 }}
                onPress={() => setCityModal(true)}
                disabled={!selectedState}
                placeholder="شهر"
                value={selectedCity && selectedCity.name}
              />
              <AppInput
                placeholder="آدرس پستی"
                multiline
                numberOfLines={3}
                style={{ minHeight: 100, marginBottom: 1 }}
                textAlign="right"
                value={addAddressForm.values.address}
                onChangeText={addAddressForm.handleChange("address")}
                autoCompleteType="street-address"
              />
              <AppInputError
                error={
                  addAddressForm.errors.address &&
                  addAddressForm.touched.address &&
                  addAddressForm.errors.address
                }
                style={{ marginBottom: 20 }}
              />
              <AppInput
                style={{ marginBottom: 1 }}
                placeholder="کد پستی"
                textAlign="right"
                value={addAddressForm.values.postalCode}
                onChangeText={addAddressForm.handleChange("postalCode")}
                autoCompleteType="postal-code"
                keyboardType="number-pad"
              />
              <AppInputError
                error={
                  addAddressForm.errors.postalCode &&
                  addAddressForm.touched.postalCode &&
                  addAddressForm.errors.postalCode
                }
                style={{ marginBottom: 20 }}
              />
              <AppButton
                value="اضافه کردن آدرس"
                style={{ marginBottom: 20 }}
                onPress={addAddressForm.submitForm}
                disabled={!selectedCity}
                loading={buttonLoading}
              />
            </View>
          </KeyboardAwareScrollView>
        </AppView>
        <Modal
          visible={stateModal}
          onRequestClose={() => {
            setFilteredStates(states);
            setStateModal(false);
          }}
          transparent={false}
          animationType="fade"
        >
          <AppView isSAfe style={{ width: "100%", height: "100%" }}>
            <View
              style={{
                width: "100%",
                height: "5%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setFilteredStates(states);
                  setStateModal(false);
                }}
              >
                <MaterialCommunityIcons name="close" size={25} />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "primaryBold",
                  fontSize: 20,
                  textAlign: "right",
                }}
              >
                استان مورد نظر خود را انتخاب کنید
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: "10%",
                paddingTop: 10,
                paddingHorizontal: "2.5%",
              }}
            >
              <AppInput
                placeholder="جستجو"
                textAlign="right"
                onChangeText={(i) => {
                  let copy = states;
                  copy = copy.filter((val) => val.name.includes(i));
                  setFilteredStates(copy);
                }}
              />
            </View>
            <FlatList
              data={filteredStates}
              keyExtractor={(i) => i.id.toString()}
              renderItem={({ item }) => (
                <SearchTextItem
                  value={item}
                  onPress={(val) => {
                    setSelectedState(val);
                    setCities(val.cities);
                    setFilteredCities(val.cities);
                    setFilteredStates(states);
                    setSelectedCity(null);
                    setStateModal(false);
                  }}
                  isActive={selectedState === item ? true : false}
                />
              )}
            />
          </AppView>
        </Modal>
        <Modal
          visible={cityModal}
          transparent={false}
          animationType="fade"
          onRequestClose={() => {
            setFilteredCities(cities);
            setCityModal(false);
          }}
        >
          <AppView isSAfe style={{ width: "100%", height: "100%" }}>
            <View
              style={{
                width: "100%",
                height: "5%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setFilteredCities(cities);
                  setCityModal(false);
                }}
              >
                <MaterialCommunityIcons name="close" size={25} />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "primaryBold",
                  fontSize: 20,
                  textAlign: "right",
                }}
              >
                شهر مورد نظر خود را انتخاب کنید
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: "10%",
                paddingTop: 10,
                paddingHorizontal: "2.5%",
              }}
            >
              <AppInput
                placeholder="جستجو"
                textAlign="right"
                onChangeText={(i) => {
                  let copy = cities;
                  copy = copy.filter((val) => val.name.includes(i));
                  setFilteredCities(copy);
                }}
              />
            </View>
            <FlatList
              data={filteredCities}
              keyExtractor={(i) => i.id.toString()}
              renderItem={({ item }) => (
                <SearchTextItem
                  value={item}
                  onPress={(val) => {
                    setSelectedCity(val);
                    setFilteredCities(cities);
                    setCityModal(false);
                  }}
                  isActive={selectedState === item ? true : false}
                />
              )}
            />
          </AppView>
        </Modal>
      </Modal>
      <Modal
        visible={showSearchLocationModal}
        onRequestClose={() => setShowSearchLocationModal(false)}
      >
        <AppView isSAfe>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              backgroundColor: searchLocationString
                ? colors.white
                : colors.inputBackgroundColor,
              paddingVertical: 10,
              marginHorizontal: 15,
              marginTop: 10,
              borderRadius: 10,
              borderBottomColor: colors.seconadryColor,
              borderBottomWidth: searchLocationString ? 1.5 : 0,
            }}
          >
            {searchLocationString && (
              <TouchableOpacity
                onPress={() => {
                  setSearchLocationString();
                  setDirectAddresses("");
                }}
              >
                <MaterialCommunityIcons
                  name="close-circle"
                  size={25}
                  color={colors.secondaryTextColor}
                />
              </TouchableOpacity>
            )}
            <TextInput
              placeholder="جستجو"
              style={{
                flex: 1,
                direction: "rtl",
                textAlign: "right",
                fontFamily: "primary",
                marginRight: 10,
                fontSize: 16,
              }}
              value={searchLocationString}
              onChangeText={(input) => {
                if (input) setSearchLocationString(input);
                else setSearchLocationString(undefined);
              }}
              autoFocus
              onSubmitEditing={handleGetDirectAddresses}
            />
            <TouchableOpacity onPress={() => setShowSearchLocationModal(false)}>
              <MaterialCommunityIcons name="close" size={25} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={directAddresses}
              keyExtractor={(i) => i.lat + "" + i.lng}
              renderItem={({ item }) => (
                <LocationDirectAddressItem
                  title={item.title}
                  subtitle={item.description}
                  onPress={() => {
                    setShowSearchLocationModal(false);
                    setSelectedLocation({
                      latitude: item.lat,
                      longitude: item.lng,
                      latitudeDelta: 0.0362,
                      longitudeDelta: 0.0361,
                    });
                  }}
                />
              )}
              ItemSeparatorComponent={Line}
              ListEmptyComponent={
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LottieView
                    source={require("../assets/search.json")}
                    autoPlay
                    autoSize
                    loop
                    style={{ width: 250, height: 250 }}
                  />
                </View>
              }
            />
          </View>
        </AppView>
      </Modal>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: "2.5%",
  },
  searchBarContainer: {
    width: "100%",
    height: "7.5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: "100%",
    height: "85%",
  },
  moreDetailContainer: {
    width: "100%",
    height: "7.5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  boldText: {
    fontFamily: "primaryBold",
    fontSize: 17,
  },
  searchBar: {
    width: "95%",
    height: "80%",
    backgroundColor: colors.inputBackgroundColor,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  lightText: {
    fontFamily: "primary",
    color: colors.inputPlaceholderColor,
    marginRight: 10,
    fontSize: 17,
  },
});

export default AddAddress;
