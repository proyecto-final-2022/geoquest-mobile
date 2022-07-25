import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import {useNavigation} from '@react-navigation/native'

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const navigation = useNavigation()

    const onRegisterPressed = () => {
        navigation.navigate('Home')
    }

    const onForgotPasswordPressed = () => {
        console.warn('Forgot Password');
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
                placeholder="Username" 
                icon = "user"
                value={username} 
                setValue={setUsername}
            />
            <CustomInput 
                placeholder="Email" 
                icon = "mail"
                value={email} 
                setValue={setEmail}
            />
            <CustomInput 
                placeholder="Password" 
                icon = "lock"
                value={password} 
                setValue={setPassword}
                secureTextEntry
            />
            <CustomInput 
                placeholder="Repeat Password" 
                icon = "lock"
                value={passwordRepeat} 
                setValue={setPasswordRepeat}
                secureTextEntry
            />
            <CustomButton 
                text='Register' 
                onPress={onRegisterPressed}/>
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