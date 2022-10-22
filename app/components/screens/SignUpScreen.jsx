import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator} from 'react-native'
import CustomInput from '../commons/CustomInput'
import CustomButton from '../commons/CustomButton'
import SocialSignInButtons from '../commons/SocialSignInButtons'
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'
import {signUpManual} from '../../utils/apicalls/ApiCalls'

export default SignUpScreen = () => {

  const {control, handleSubmit, watch} = useForm();
  const [loading, setLoading] = useState(false);

  const pass = watch('password')

  const navigation = useNavigation()
  
  const onRegisterPressed = (data) => {
    setLoading(true);
    signUpManual(data.email, data.name, data.username, data.password)
    .then(result => {
      setLoading(false);
      navigation.navigate('Quest Navigator');
    })
    .catch(error => {
      setLoading(false);
      console.log(error);
      Alert.alert('Hubo problemas al conectarse con los servidores');
    })
  }

  const onSignInPress = () => {
    navigation.navigate('Sign In')
  }

  return (
    <ScrollView style={styles.view}>
      <View style={styles.root}>
        <Text style = {styles.title}>Create an account</Text>
        {
          loading && <ActivityIndicator size="large" style={{justifyContent: "center", paddingTop: 10, transform: [{ scaleX: 2 }, { scaleY: 2 }]}}/>
        }
        {
          !loading && 
          <>
            <CustomInput 
              name = "username"
              placeholder="Usuario" 
              control = {control}
              rules = {{
                required: 'El usuario es requerido'
              }}
              icon = "user"
            />
            <CustomInput 
              name = "name"
              placeholder="Nombre" 
              control = {control}
              rules = {{
                required: 'El nombre es requerido'
              }}
              icon = "user"
            />
            <CustomInput 
              name = "email"
              placeholder="Email" 
              icon = "mail"
              control = {control}
              rules = {{
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email invalido'
                },
                required: 'El email es requerido'
              }}   
            />
            <CustomInput
              name = "password" 
              placeholder="Contraseña" 
              icon = "lock"
              control = {control}
              rules = {{
                required: 'La Contraseña es requerida',
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
            <CustomInput 
              name = "password-repeat"
              placeholder="Repita la contraseña" 
              icon = "lock"
              control = {control}
              rules = {{
                validate: value => value == pass || 'Las contraseñas no coinciden',
              }}
              secureTextEntry
            />
            <CustomButton 
              text='Registrarse' 
              onPress={handleSubmit(onRegisterPressed)}
            />
            <SocialSignInButtons/>
            <CustomButton 
              text ={"¿Ya tienes una cuenta?"+"\n"+"Inicia sesión"}
              onPress = {onSignInPress}
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
    color: '#CA955C',
    margin: 10,
  }, 
  view: {
    flex: 1,
    backgroundColor: '#FFF9CA'
  },
});