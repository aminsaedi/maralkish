import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";


const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
    return true;
  } catch (error) {
    return false;
  }
};

const setRefreshToken = async (refreshToken) => {
  try {
    await AsyncStorage.setItem("refreshToken", refreshToken);
    return true;
  } catch (error) {
    return false;
  }
};

const getCurrentUser = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) return false;
    const user = jwt_decode(token);
    return user;
  } catch (error) {
    return false;
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) return token;
    else return false;
  } catch (error) {
    return false;
  }
};

const getRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (refreshToken !== null) return refreshToken;
    else return false;
  } catch (error) {
    return false;
  }
};

const isTokenValid = async () => {
  const token = await AsyncStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  // console.log(decodedToken.exp, "---", Math.ceil(Date.now() / 1000));
  // console.log(decodedToken.exp > Math.ceil(Date.now() / 1000));
  // try {
  //   const token = await AsyncStorage.getItem("token");
  //   const decodedToken = jwt_decode(token);
  //   if (new Date(decodedToken.exp) > Date.now()) return true;
  //   else if (new Date(decodedToken.exp) <= Date.now()) return false;
  // } catch (error) {
  //   return undefined;
  // }
  // return true
  return decodedToken.exp > Math.ceil(Date.now() / 1000) ? true : false;
};

const removeTokens = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("refreshToken");
};

export default {
  isTokenValid,
  getRefreshToken,
  getToken,
  getCurrentUser,
  setRefreshToken,
  setToken,
  removeTokens,
};
