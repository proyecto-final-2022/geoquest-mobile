import {React, useEffect} from 'react';
import CustomButton from './CustomButton'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import {postLoginGoogle, postLoginFacebook} from '../../utils/apicalls/ApiCalls';
import {useNavigation} from '@react-navigation/native'
import Config from '../../../config.json'
import { AccessToken, Profile, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';
import {closeSession, getObject} from '../../utils/storage/storage';

export default SocialSignInButtons = () => {

  const navigation = useNavigation()

  useEffect( () => {
    GoogleSignin.configure({
      androidClientId: Config.clientIdGoogle
  })})

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      const token = GoogleSignin.getTokens();
      
      getObject('firebaseToken').then(firebaseToken => {
        postLoginGoogle(user.email, user.givenName, user.givenName, token.idToken, firebaseToken)
        .then(() => {
          navigation.navigate('Quest Navigator');
        }).catch(error => {
          console.log('Google login error: '+error);
          closeSession();
          Alert.alert('Hubo problemas al conectarse con los servidores');
        })
      }).catch(error => {
        console.log('Google login error: '+error);
        closeSession();
        Alert.alert('Hubo problemas al conectarse con los servidores');
      })
    } catch (error) {
      console.log('Google login error: '+error);
      closeSession();
      Alert.alert('Hubo problemas al conectarse con los servidores');
    }
  };
  
  const signInFacebook = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Facebook login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            Profile.getCurrentProfile().then(
              function(currentProfile) {
                if (currentProfile) {
                  const infoRequest = new GraphRequest('/me', {
                    httpMethod: 'GET',
                    version: 'v2.5',
                    parameters: {
                      'fields': {
                        'string' : 'email'
                      }
                    }
                  }, (err, res) => {
                    getObject('firebaseToken').then(firebaseToken => {
                      postLoginFacebook(res.email, currentProfile.name, currentProfile.name, data.accessToken, firebaseToken)
                      .then(() => {
                        navigation.navigate('Quest Navigator');
                      }).catch(error => {
                        console.log('Facebook login error: '+error);
                        closeSession();
                        Alert.alert('Hubo problemas al conectarse con los servidores');
                      })
                    }).catch(error => {
                      console.log('Facebook login error: '+error);
                      closeSession();
                      Alert.alert('Hubo problemas al conectarse con los servidores');
                    })
                  });
                  new GraphRequestManager().addRequest(infoRequest).start();
                }
              }
            ).catch(error =>{
              console.log('error');
              closeSession();
              Alert.alert('Hubo problemas al conectarse con los servidores');
            })
          })
        }
      },
      function (error) {
        console.log('Facebook login fail with error: ' + error)
        closeSession();
        Alert.alert('Hubo problemas al conectarse con los servidores');
      }
    )
  }

  return(
    <>
      <CustomButton 
        text ="Iniciar sesión con Facebook"
        onPress = {signInFacebook}
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


