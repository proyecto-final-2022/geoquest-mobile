import {React} from 'react';
import CustomButton from '../CustomButton/CustomButton'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import {PostLoginGoogle} from '../../apicalls/ApiCalls'
import {useNavigation} from '@react-navigation/native'

export default SocialSignInButtons = () => {
    
    const onSignInFacebook = () => {
        console.warn('facebook');
    }

    const navigation = useNavigation()

    useEffect( () => {
        GoogleSignin.configure({
            androidClientId: '310650990221-v7rjbq7joe78ebbcs47v5ur28m8o37q1.apps.googleusercontent.com'
        })
    })

    const signInGoogle = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const user = userInfo.user
          token = GoogleSignin.getTokens()
          PostLoginGoogle(user.email, user.givenName, token.idToken)
          navigation.navigate('Home')
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
            text ="Sign in with Facebook"
            onPress = {onSignInFacebook}
            icon = "facebook-official"
            bgColor='#E7EAF4'
            fgColor='#4765A9'
        />
        <CustomButton 
            text ="Sign in with Google"
            onPress = {signInGoogle}
            icon = "google"
            bgColor='#FAE9EA'
            fgColor='#DD4DD4'
        />
        </>
    )
}


