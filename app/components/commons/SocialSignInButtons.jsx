import {React} from 'react';
import CustomButton from './CustomButton'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import {postLoginGoogle} from '../../utils/apicalls/ApiCalls'
import {useNavigation} from '@react-navigation/native'
import Config from '../../../config.json'

export default SocialSignInButtons = () => {
    
  const onSignInFacebook = () => {
    console.warn('facebook');
  }

  const navigation = useNavigation()

  useEffect( () => {
    GoogleSignin.configure({
      androidClientId: Config.clientIdGoogle
  })})

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user
      token = GoogleSignin.getTokens()
      postLoginGoogle(user.email, user.givenName, user.givenName, token.idToken)
      navigation.navigate('Quest Navigator')
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
       // play services not available or outdated
      } else {
      // some other error happened
      }
    }
  };

  return(
    <>
    <CustomButton 
      text ="Iniciar sesión con Facebook"
      onPress = {onSignInFacebook}
      icon = "facebook-official"
      bgColor='#E7EAF4'
      fgColor='#4765A9'
    />
    <CustomButton 
      text ="Iniciar sesión con Google"
      onPress = {signInGoogle}
      icon = "google"
      bgColor='#FAE9EA'
      fgColor='#DD4DD4'
    />
    </>
    )
}


