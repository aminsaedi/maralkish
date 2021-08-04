import AsyncStorage from "@react-native-async-storage/async-storage";

export const setCartId = async (cartId) => {
  try {
    await AsyncStorage.setItem("cartId", cartId);
    return true;
  } catch (error) {
    return undefined;
  }
};

export const getCartId = async () => {
  try {
    const result = await AsyncStorage.getItem("cartId");
    if (result) return result;
    else return undefined;
  } catch (error) {
    return undefined;
  }
};
