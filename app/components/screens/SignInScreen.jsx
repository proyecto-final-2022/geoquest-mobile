import React, {useState} from 'react'
import {View, ActivityIndicator, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import Logo from '../../../assets/GeoQuestLogo.png'
import CustomInput from '../commons/CustomInput'
import CustomButton from '../commons/CustomButton'
import SocialSignInButtons from '../commons/SocialSignInButtons'
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import {loginManual, getUser} from '../../utils/apicalls/ApiCalls'
import { Alert } from 'react-native'
import Storage from '../../utils/storage/storage';
import { useFocusEffect } from '@react-navigation/native';
import {closeSession} from '../../utils/storage/storage';

const SignInScreen = () => {

  const {height} = useWindowDimensions();

  const {control, handleSubmit} = useForm();
  const [loggingIn, setLoggingIn] = useState(false);

  const navigation = useNavigation()

  const onSignInPressed = async (data) => {
    if(!loggingIn){
      setLoggingIn(true);
      loginManual(data.email, data.password)
      .then(result => {
        navigation.navigate('Quest Navigator');
        setLoggingIn(false);
      })
      .catch(error => {
        if(String(error).includes('Network request failed')){
          Alert.alert('Hubo problemas al conectarse con los servidores');
        }else{
          Alert.alert('Usuario o contraseña incorrecta');
        }
        setLoggingIn(false);
      })
    }
  }

  const onForgotPasswordPressed = () => {
    console.warn('Forgot Password');
  }

  const onSignUpPress = () => {
    navigation.navigate('Sign Up')
  }

  useFocusEffect(
    React.useCallback(() => {
      Storage.getObject('user').
      then(user => {
        if(user.id !== undefined){ //user is already logged in
          getUser(user.id)
          .then(() => {
            //here
            navigation.navigate('Quest Navigator');
          })
          .catch(error => {
            console.log(error);
            closeSession().then(() => {
              Alert.alert('Hubo problemas al conectarse con los servidores');
            })
          })
        }
      })
      .catch(error => {
        console.log(error);
        closeSession();
      })
      return () => {};
    }, [])
  );

  return (
    <ScrollView style={styles.view}>
      <View style={styles.root}>
        <Image
          source = {Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
    
        {
          loggingIn && <ActivityIndicator size="large" style={{justifyContent: "center", paddingTop: 50, transform: [{ scaleX: 2 }, { scaleY: 2 }]}}/>
        }
        {
          !loggingIn && 
          <>
            <CustomInput 
              name = "email"
              placeholder ="Email" 
              control = {control}
              rules = {{
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email invalido'
                },
                required: 'El email es requerido'
              }}
              icon = "mail"
            />
            <CustomInput
              name = "password" 
              placeholder ="Contraseña" 
              icon = "lock"
              control = {control} 
              rules = {{
                required: 'La contraseña es requerida',
                minLength: {
                  value: 8,
                    message: 'Mínimo 8 caracteres',
                  },
                maxLength: {
                  value: 32,
                  message: 'Máximo 32 caracteres',
                }
              }}
              secureTextEntry
            /> 

            <CustomButton 
              text='Iniciar Sesión' 
              onPress={handleSubmit(onSignInPressed)}/>
            {/* <CustomButton 
              text='¿Olvidó su contraseña?' 
              onPress={onForgotPasswordPressed}
              type="TERTIARY"/> */}
            <SocialSignInButtons/>
            <CustomButton 
              text ="¿No tenés una cuenta? Creá una!"
              onPress = {onSignUpPress}
              type="TERTIARY"
            />
          </>
        }
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