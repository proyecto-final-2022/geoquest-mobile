import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Alert, ImageBackground, Text} from "react-native";
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { ViroText } from "@viro-community/react-viro/components/ViroText";
import { ViroTrackingStateConstants } from "@viro-community/react-viro/components/ViroConstants";
import Navigation from "./app/components/navigation";
import { Provider } from "react-redux";
import store from "./app/redux";
import Storage from './app/utils/storage/storage'

import {
  NavigationContainer
} from '@react-navigation/native'

import messaging from '@react-native-firebase/messaging'
import FriendsList from "./app/components/screens/FriendsList";

export default function App() {
  
  const navigationRef = React.createRef()

  const propsUpdate = 1

  useEffect(() => {

    const forwardToNotifications = () => {
      Storage.getObject('user')
      .then(user => navigationRef.current?.navigate('Notifications', user))
    }

    const forwardToWaitRoom = (questID, teamID, userID) => {
      navigationRef.current?.navigate('Wait Room', {questID, teamID, userID})
    }

    const forwardToFriendsList = () => {
      Storage.getObject('user')
      .then(user => navigationRef.current?.navigate('Friends List', user))
    }

    const processNotification = (remoteMessage, fromBackground) => {
      let title = ''

      if (remoteMessage.notification) {
        title = remoteMessage.notification.title
      }

      if (remoteMessage.data){
        if (fromBackground && remoteMessage.data.msgType){
          switch(remoteMessage.data.msgType) {
            case "Quest Invitation":
              forwardToNotifications()
            break;
            case "Friend Request":
              forwardToNotifications()
            break;
            case "Friend Accept":
              forwardToFriendsList()
            break;
            case "Friend Deny":
              forwardToFriendsList()
            break;
          }
        }

        if (!fromBackground && remoteMessage.data.msgType) {
          switch(remoteMessage.data.msgType) {
            case "Quest Invitation":
              Alert.alert(
                title,
                "",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => {forwardToNotifications()} }
                ]
              );
            break;
            case "Friend Request":
              Alert.alert(
                title,
                "",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => {forwardToNotifications()} }
                ]
              );
            break;
            case "Friend Accept":
              Alert.alert(
                title,
                "",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => {forwardToFriendsList()} }
                ]
              );
            break;
              case "Friend Deny":
                Alert.alert(
                  title,
                  "",
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => {forwardToFriendsList()} }
                  ]
                ); 
            break;
            case "Quest Accept":
              Alert.alert(
                title,
                "",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => { 
                    Storage.getObject('user').then(user => forwardToWaitRoom(remoteMessage.data.questID, remoteMessage.data.teamID, user.id))} }
                ]
              );
            break;
          
          case "Quest Deny":
            Alert.alert(
              title,
              "",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                { text: "OK", onPress: () => { 
                  Storage.getObject('user').then(user => forwardToWaitRoom(remoteMessage.data.questID, remoteMessage.data.teamID, user.id))} }
              ]
            );
          break;
          }
        }

      }

    }
    
    const onNotificationOpen = 
      messaging()
      .onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state:', 
        remoteMessage)
        processNotification(remoteMessage, true)
    })
   
    
    const foregroundSubscriber = messaging().onMessage(
      async (remoteMessage) => {
//      Alert.alert(remoteMessage.notification.title)
      console.log("push notification recibida", remoteMessage)
      processNotification(remoteMessage, false)
    })
    
    const backgroundSubscriber = messaging()
    .setBackgroundMessageHandler(
      async (remoteMessage) => {
      console.log('Push notification en background', remoteMessage)
      processNotification(remoteMessage, true)
    })
 

    const getInitialNotification = 
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        console.log('Notification caused app to open from quit state: ', remoteMessage)
        processNotification(remoteMessage, true)
    })
    
    /*
    const topicSubscriber = messaging()
    .subscribeToTopic('geoquest3')
    .then(() => console.log('suscrito a geoquest'))


    const getToken = messaging()
    .getToken()
    .then((token) => {
      console.log("token:", token)
    })

    const tokenRefresh = messaging()
    .getToken()
    .then((token) => {
      console.log("token refresh:", token)
    })
  */
    return () => {
      foregroundSubscriber();
      backgroundSubscriber;
      onNotificationOpen;
      getInitialNotification;
//      topicSubscriber();
//      getToken();
//      tokenRefresh();
    }}, [])
  
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  //   <ViroARSceneNavigator initialScene={{scene: HelloWorldScene}}/>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF9CA"
  },
});

const HelloWorldScene = (_props) => {
  const [text, setText] = useState("Loading...");

  const onTrackingUpdated = (state, _reason) => {
    if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE)
      setText("Tracking unavailable");
    else if (state === ViroTrackingStateConstants.TRACKING_NORMAL)
      setText("Hello world!");
  };

  return (
    <ViroARScene onTrackingUpdated={onTrackingUpdated}>
      <ViroText
        text={text}
        position={[0,0,-2]}
        style={{fontSize: 20, color:"white"}}
      />
    </ViroARScene>
  );
};
