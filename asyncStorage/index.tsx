import AsyncStorage from '@react-native-async-storage/async-storage'

export function setStoreData (key: any, value: any): void {
  try {
    void AsyncStorage.setItem(key, value)
  } catch (e) {
  }
};

export async function getData (key: any): Promise<any> {
  const value = AsyncStorage.getItem(key)
  return await value
};

export function removeValue (key: any): void {
  try {
    void AsyncStorage.removeItem(key)
  } catch (e) {
  }
}
