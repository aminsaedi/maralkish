import React, { useState, useEffect, useRef } from "react";

import * as Location from "expo-location";
import MapView from "react-native-maps";
import Constants from "expo-constants";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import colors from "../utilities/colors";

const LocationPicker = ({ onConfirm, onLocationChange, inputLocation }) => {
  const [mapRegion, setMapRegion] = useState();
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [locationResult, setLocationResult] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const mapViewRef = useRef();

  getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationResult("Permission to access location was denied");
      setMapRegion({
        latitude: 35.699193,
        longitude: 51.33801,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0221,
      });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocationResult(location);

    // Center the map on the location we just fetched.

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0622,
      longitudeDelta: 0.0221,
    });
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider="google"
        style={styles.map}
        region={
          inputLocation ||
          selectedLocation ||
          mapRegion || {
            latitude: 35.699193,
            longitude: 51.33801,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0021,
          }
        }
        onRegionChangeComplete={(data) => {
          console.log(data);
          setSelectedLocation(data);
          onLocationChange(data);
        }}
        showsUserLocation
        showsMyLocationButton
        zoomControlEnabled
        ref={mapViewRef}
      />

      <View
        style={{
          position: "absolute",
        }}
      >
        <MaterialCommunityIcons
          //   style={{ marginTop: 5 }}
          name="crosshairs"
          size={20}
          color={colors.seconadryColor}
        />
      </View>
      {Platform.OS === "IOS" && (
        <TouchableOpacity
          style={{
            position: "absolute",
            width: 45,
            height: 45,
            backgroundColor: colors.white,
            bottom: 10,
            right: 10,
            borderRadius: 45 / 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            mapViewRef.current.animateToRegion(
              {
                latitude: locationResult.coords.latitude,
                longitude: locationResult.coords.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.0421,
              },
              1000
            )
          }
        >
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={20}
            color="#616161"
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.ok}
        onPress={() => onConfirm(selectedLocation)}
      >
        <MaterialCommunityIcons name="check" color={colors.buttonTextColor} size={20} />
        <Text
          style={{
            fontFamily: "primary",
            color: colors.buttonTextColor,
            marginLeft: 10,
            fontSize: 15,
          }}
        >
          تایید
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  ok: {
    position: "absolute",
    backgroundColor: colors.primaryColor,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    left: 10,
    bottom: 10,
  },
});

export default LocationPicker;
