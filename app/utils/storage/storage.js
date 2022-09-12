import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@auth.token', value)
  } catch (e) {
      // saving error
  }
}

export const getData = async () => { await AsyncStorage.getItem('@auth.token') }

export const closeSession = async () => { await AsyncStorage.removeItem('@auth.token')}