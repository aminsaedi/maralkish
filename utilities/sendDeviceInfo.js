import { apiSendDeviceInfo } from "../api/util";
import { Platform } from "react-native";

const sendDeviceInfo = async (token, Device) => {
  const {
    isDevice,
    brand,
    manufacturer,
    modelId,
    designName,
    deviceYearClass,
    totalMemory,
    supportedCpuArchitectures,
    osName,
    osVersion,
    osBuildId,
    osBuildFingerprint,
    platformApiLevel,
    deviceName,
  } = Device;
  const deviceType = await Device.getDeviceTypeAsync();
  apiSendDeviceInfo({
    subscriber: {
      providerType: Platform.OS === "android" ? "firebase" : "apn",
      uniqueId: token,
    },
    device: {
      isDevice,
      brand,
      manufacturer,
      modelId,
      designName,
      deviceYearClass,
      totalMemory,
      supportedCpuArchitectures,
      osName,
      osVersion,
      osBuildId,
      osBuildFingerprint,
      platformApiLevel,
      deviceName,
      deviceType,
    },
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export default sendDeviceInfo;
