import AsyncStorage from "@react-native-async-storage/async-storage";

const setNoficationToken = async (token) => {
  try {
    await AsyncStorage.setItem("notificationToken", token);
    return true;
  } catch (error) {
    return false;
  }
};

const getNotificationToken = async () => {
  try {
    const token = await AsyncStorage.getItem("notificationToken");
    if (token !== null) return token;
    else return false;
  } catch (error) {
    return false;
  }
};

const clearNotificationToken = async () => {
  await AsyncStorage.removeItem("notificationToken");
};

export {
  setNoficationToken,
  getNotificationToken,
  clearNotificationToken,
};
