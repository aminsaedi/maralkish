import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import pages from "../navigation/routes";
import colors from "../utilities/colors";

import useAuth from "./../auth/useAuth";
import AddressCard from "../components/AddressCard";
import Line from "../components/Line";
import { apiGetUserAddresses, apiDeleteUserAddress } from "../api/users";
import { apiGetStates } from "../api/util";

const Address = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState();
  const [states, setStates] = useState([]);
  const [showEditModal, setShowModal] = useState(false);
  const [editModalData, setEditModalData] = useState();
  const [stateSelectorOpen, setStateSelectorOpen] = useState(false);
  const [citySelectorState, setCitySelectorState] = useState(false);

  const { user } = useAuth();
  if (!user) {
    navigation.navigate(pages.home);
    return null;
  }
  const getAddresses = async () => {
    setLoading(true);
    try {
      const result = await apiGetUserAddresses();
      if (result.status === 200) setAddresses(result.data);
    } catch (error) {
      alert("خطایی رخ داد");
    }
    setLoading(false);
  };

  const getStates = async () => {
    try {
      const result = await apiGetStates();
      if (result.status === 200) setStates(result.data);
    } catch (error) {
      alert("خطایی رخ داد");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const result = await apiDeleteUserAddress(addressId);
      if (result.status === 200) getAddresses();
    } catch (error) {
      alert("خطایی رخ داد");
    }
  };
  useEffect(() => {
    getAddresses();
    getStates();
  }, []);

  if (loading)
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
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.white,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 15,
          marginBottom: 10,
        }}
        onPress={() => navigation.navigate(pages.addAddress)}
      >
        <Ionicons name="chevron-back" size={25} color={colors.gray} />
        <Text
          style={{
            fontFamily: "primary",
            flex: 1,
            textAlign: "right",
            fontSize: 17,
            marginRight: 20,
          }}
        >
          اضافه کردن آدرس جدید
        </Text>
        <Ionicons name="location-sharp" size={25} />
      </TouchableOpacity>
      {addresses && (
        <FlatList
          style={{ backgroundColor: colors.white }}
          data={addresses}
          keyExtractor={(i) => i.id.toString()}
          ItemSeparatorComponent={Line}
          renderItem={({ item }) => (
            <AddressCard
              address={item}
              onDelete={(addressId) => handleDeleteAddress(addressId)}
              onEdit={(address) => {
                navigation.navigate(pages.editAddress, { input: address });
              }}
            />
          )}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.lightGray,
  }
});

export default Address;
