import {React} from 'react';
import CustomButton from './CustomButton'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import {postLoginGoogle} from '../../utils/apicalls/ApiCalls'
import {useNavigation} from '@react-navigation/native'
import Config from '../../../config.json'
import { LoginButton, AccessToken, Profile, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

export default SocialSignInButtons = () => {

  const navigation = useNavigation()

  useEffect( () => {
    GoogleSignin.configure({
      androidClientId: Config.clientIdGoogle
  })})

  // const onSignInFacebook = async () => {
  //   try {
  //     await Facebook.initializeAsync({
  //       appId: '<APP_ID>',
  //     });
  //     const { type, token, expirationDate, permissions, declinedPermissions } =
  //       await Facebook.logInWithReadPermissionsAsync({
  //         permissions: ['public_profile'],
  //       });
  //     if (type === 'success') {
  //       // Get the user's name using Facebook's Graph API
  //       const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
  //       Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
  //     } else {
  //       // type === 'cancel'
  //     }
  //   } catch ({ message }) {
  //     alert(`Facebook Login Error: ${message}`);
  //   }
  // }

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
    {/* <CustomButton 
      text ="Iniciar sesión con Facebook"
      onPress = {onSignInFacebook}
      icon = "facebook-official"
      bgColor='#E7EAF4'
      fgColor='#4765A9'
    /> */}
    <LoginButton
      permissions={["email"]}
      onLoginFinished={(error, result) => {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              Profile.getCurrentProfile().then(
                function(currentProfile) {
                  if (currentProfile) {
                    console.log("The current logged user is: " +currentProfile.name);

                    const infoRequest = new GraphRequest('/me', {
                      httpMethod: 'GET',
                      version: 'v2.5',
                      parameters: {
                        'fields': {
                          'string' : 'email'
                        }
                      }
                    }, (err, res) => {
                      console.log(res.email);
                    });
                    new GraphRequestManager().addRequest(infoRequest).start();
                  }
                }
              );
            }
          )}
      }}
      onLogoutFinished={() => console.log("logout facebook")}
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


