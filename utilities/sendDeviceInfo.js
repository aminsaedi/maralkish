import { apiSendDevideInfo } from "../api/util";

const sendDeviceInfo = async (token, Device) => {
  const {
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
  apiSendDevideInfo({
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
    token,
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export default sendDeviceInfo;
