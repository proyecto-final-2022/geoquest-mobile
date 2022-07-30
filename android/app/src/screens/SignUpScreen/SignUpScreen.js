import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import {PostExample} from '../../apicalls/ApiCalls'

const SignUpScreen = () => {

    const {control, handleSubmit, watch} = useForm();

    const pass = watch('password')

    const navigation = useNavigation()
  
    const onRegisterPressed = (data) => {
        PostExample(data.email, data.username, data.password)
        navigation.navigate('Home')
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
                  validate: value => value == pass || 'Password do not match',
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
        color: '#CA955C',
        margin: 10,
    }, 
    view: {
        flex: 1,
        backgroundColor: '#FFF9CA'
    },
});


export default SignUpScreen