import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "CART_ITEMS";

export const getCart = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const addToCart = async (item: any) => {
  const cart = await getCart();

  const index = cart.findIndex((p: any) => p.title === item.title);

  if (index >= 0) {
    cart[index].qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  await AsyncStorage.setItem(KEY, JSON.stringify(cart));
};

export const incrementQty = async (title: string) => {
  const cart = await getCart();
  const index = cart.findIndex((p: any) => p.title === title);

  if (index >= 0) {
    cart[index].qty += 1;
  }

  await AsyncStorage.setItem(KEY, JSON.stringify(cart));
};

export const decrementQty = async (title: string) => {
  const cart = await getCart();
  const index = cart.findIndex((p: any) => p.title === title);

  if (index >= 0) {
    if (cart[index].qty > 1) cart[index].qty -= 1;
    else cart.splice(index, 1);
  }

  await AsyncStorage.setItem(KEY, JSON.stringify(cart));
};

export const clearCart = async () => {
  await AsyncStorage.removeItem(KEY);
};
