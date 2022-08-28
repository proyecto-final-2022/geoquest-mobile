import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, ScrollView, Text, Alert, View } from 'react-native';
import CustomButton from '../../components/CustomButton'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native'
import { CloseSession} from '../../storage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation()
    
    const onSignOutGoogle = async () =>  {
        await GoogleSignin.signOut()
        CloseSession()
        navigation.navigate('Sign In')
      }
    
      const onSignOutManual = async () =>  {
        CloseSession()
        navigation.navigate('Sign In')
      }

      const onScene = async () =>  {
        navigation.navigate('Scene')
      }

      const onGetData = async () =>  {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if(value !== null) {
              console.warn('Token : ' + value)
              // value previously stored
            }
          } catch(e) {
            // error reading value
          }
      }
  
    return (
        <ScrollView style={styles.view}>
            <Text style = {styles.title}>Home</Text>
            <CustomButton 
                text ="Sign Out Google"
                onPress = {onSignOutGoogle}
                type="TERTIARY"
            />
            <CustomButton 
                text ="Sign Out Manual"
                onPress = {onSignOutManual}
                type="TERTIARY"
            />
            <CustomButton 
                text ="Log token (only for test xD)"
                onPress = {onGetData}
                type="TERTIARY"
            />
            <CustomButton 
                text ="AR Scene"
                onPress = {onScene}
                type="TERTIARY"
            />
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    }, 
});


export default HomeScreen