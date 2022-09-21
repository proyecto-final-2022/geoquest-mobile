import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (value) => {await AsyncStorage.setItem('auth.token', value)}

export const getData = async () => { await AsyncStorage.getItem('auth.token') }

export const closeSession = async () => { await AsyncStorage.removeItem('auth.token')}

export async function getObject(key) {
    return AsyncStorage.getItem(key).then(json => JSON.parse(json))
  }
  
  export async function setObject(key, object) {
    return AsyncStorage.setItem(key, JSON.stringify(object))
  }
  
  export async function removeObject(key) {
    return AsyncStorage.removeItem(key)
  }
  
  export default {
    setObject,
    getObject,
    removeObject
  }
