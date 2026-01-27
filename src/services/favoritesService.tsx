import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "FAVORITES";

export async function getFavorites() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function addFavorite(product: any) {
  const favorites = await getFavorites();
  favorites.push(product);
  await AsyncStorage.setItem(KEY, JSON.stringify(favorites));
}

export async function removeFavorite(title: string) {
  const favorites = await getFavorites();
  const filtered = favorites.filter((item: any) => item.title !== title);
  await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
}

export async function isFavorite(title: string) {
  const favorites = await getFavorites();
  return favorites.some((item: any) => item.title === title);
}
