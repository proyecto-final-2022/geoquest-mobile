import AsyncStorage from '@react-native-async-storage/async-storage';


export const StoreData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
      // saving error
  }
}

export const GetData = async () => { await AsyncStorage.getItem('@storage_Key') }

export const CloseSession = async () => { await AsyncStorage.removeItem('@storage_Key')}