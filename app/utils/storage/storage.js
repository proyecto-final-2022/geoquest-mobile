import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
      // saving error
  }
}

export const getData = async () => { await AsyncStorage.getItem('@storage_Key') }

export const closeSession = async () => { await AsyncStorage.removeItem('@storage_Key')}