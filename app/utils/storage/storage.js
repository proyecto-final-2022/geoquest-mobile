import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const storeData = async (value) => {await AsyncStorage.setItem('auth.token', value)}

export const getData = async () => { await AsyncStorage.getItem('auth.token') }

export const closeSession = async () => { 
  await AsyncStorage.removeItem('auth.token');
  await GoogleSignin.signOut();
  await setObject('user', {});
}

export async function getObject(key) {
  return AsyncStorage.getItem(key).then(json => JSON.parse(json))
}
  
export async function setObject(key, object) {
  return AsyncStorage.setItem(key, JSON.stringify(object))
}

export async function setObjectField(key, field, value) {
  return AsyncStorage.mergeItem(key, '{"'+field+'":'+ (typeof value == 'string'? '"'+value+'"' : value) +'}')
}
  
export async function removeObject(key) {
  return AsyncStorage.removeItem(key)
}
  
export default {
  setObject,
  setObjectField,
  getObject,
  removeObject
}
