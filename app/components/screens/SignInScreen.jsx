import React, {useState} from 'react'
import {View, Button, Text, TextInput, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import Logo from '../../../assets/GeoQuestLogo.png'
import CustomInput from '../commons/CustomInput'
import CustomButton from '../commons/CustomButton'
import SocialSignInButtons from '../commons/SocialSignInButtons'
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import {loginManual} from '../../utils/apicalls/ApiCalls'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Storage from '../../utils/storage/storage';
import Config from '../../../config.json'

const SignInScreen = () => {

  const [isSession, setIsSession] = useState(false);

  const getStorage = async () => {
    const user = Storage.getObject('user')

    user ? setIsSession(true) : setIsSession(false)
  }

  const {height} = useWindowDimensions();

  const {control, handleSubmit} = useForm();

  const navigation = useNavigation()

  const onSignInPressed = async (data) => {
    try{
      fetch(
        Config.appUrl+'users/sessions/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        email: data.email,  
        password: data.password})
      })
      .then(response => {
        if(!response.ok) Alert.alert('GeoQuest', 'User not registered', [{text: 'Ok'}]) ;
        else response.json().then(async (data) => {
          Storage.setObject('user', data)
          navigation.navigate('Quest Navigator')
        }).catch((error) => {
        console.log('error: ' + error);
        this.setState({ requestFailed: true });
        });})
      }  
    
     catch (error) {
      console.error(error);
    }
}

//    isSession ? navigation.navigate('Home') : Alert.alert('GeoQuest', 'User not registered', [{text: 'Ok'}]);
  

  const onForgotPasswordPressed = () => {
    console.warn('Forgot Password');
  }

  const onSignUpPress = () => {
    navigation.navigate('Sign Up')
  }

  return (
    <ScrollView style={styles.view}>
      <View style={styles.root}>
        <Image
          source = {Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
    
        <CustomInput 
          name = "email"
          placeholder ="Email" 
          control = {control}
          rules = {{required: 'Email is required'}}
          icon = "mail"
        />
        <CustomInput
          name = "password" 
          placeholder ="Password" 
          icon = "lock"
          control = {control} 
          rules = {{required: 'Password is required'}}
          secureTextEntry
        /> 

        <CustomButton 
          text='Sign In' 
          onPress={handleSubmit(onSignInPressed)}/>
        <CustomButton 
          text='Forgot password?' 
          onPress={onForgotPasswordPressed}
          type="TERTIARY"/>
        <SocialSignInButtons/>
        <CustomButton 
          text ="Don't have an account? Create one"
          onPress = {onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  }, 
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA'
  },
});


export default SignInScreen