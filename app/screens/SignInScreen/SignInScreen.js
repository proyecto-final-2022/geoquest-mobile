import React, {useState} from 'react'
import {View, Button, Text, TextInput, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import Logo from '../../../assets/GeoQuestLogo.png'
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons'
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import {LoginManual} from '../../apicalls/ApiCalls'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignInScreen = () => {

    const [isSession, setIsSession] = useState(false);

    const getStorage = async () => {
        console.warn("before"+token)
        const token = await AsyncStorage.getItem('@storage_Key')
        console.warn("after"+token)
        token ? setIsSession(true) : setIsSession(false)
    }

    const {height} = useWindowDimensions();

    const {control, handleSubmit} = useForm();

    const navigation = useNavigation()

    const onSignInPressed = async (data) => {
        try{
            await LoginManual(data.email, data.password);
            await getStorage();
        }
        catch (error) {
            console.error(error);
        }

        isSession ? navigation.navigate('Home') : Alert.alert('GeoQuest', 'User not registered', [{text: 'Ok'}]);
    }

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