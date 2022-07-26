import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import { StoreData, GetData } from '../../storage/storage'

const SignUpScreen = () => {

    const {control, 
        handleSubmit,
        formState: {errors}
    } = useForm();


    const navigation = useNavigation()
  
    const postExample = async (email, username, password) => {
        try {
            await fetch(
                'http://192.168.0.193:8080/users/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: email, 
                        username: username, 
                        password: password})
                })
                .then(response => {
                    response.json()
                        .then(data => {
                            StoreData(data)
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    const onRegisterPressed = (data) => {
        postExample(data.email, data.username, data.password)
        GetData()
    }

    const onSignInPress = () => {
        navigation.navigate('Sign In')
    }

    return (
        <ScrollView style={styles.view}>
        <View style={styles.root}>
            <Text style = {styles.title}>Create an account
            </Text>
            <CustomInput 
                name = "username"
                placeholder="Username" 
                control = {control}
                rules = {{required: 'Username is required'}}    
                icon = "user"
            />
            <CustomInput 
                name = "email"
                placeholder="Email" 
                icon = "mail"
                control = {control}
                rules = {{required: 'Email is required'}}    
            />
            <CustomInput
                name = "password" 
                placeholder="Password" 
                icon = "lock"
                control = {control}
                rules = {{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Minimum 8 characters',
                    },
                    maxLength: {
                        value: 32,
                        message: 'Maximum 32 characters',
                    }
                }}   
                secureTextEntry
            />
            <CustomInput 
                name = "password-repeat"
                placeholder="Repeat Password" 
                icon = "lock"
                control = {control}
                rules = {{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Minimum 8 characters',
                    },
                    maxLength: {
                        value: 32,
                        message: 'Maximum 32 characters',
                    }
                }}
                secureTextEntry
            />
            <CustomButton 
                text='Register' 
                onPress={handleSubmit(onRegisterPressed)}
            />
            <SocialSignInButtons/>
            <CustomButton 
                text ="Have an account? Sign in"
                onPress = {onSignInPress}
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


export default SignUpScreen