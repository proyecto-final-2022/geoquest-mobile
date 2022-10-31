import React, { useEffect } from "react";
import { Alert } from "react-native";
import { Provider } from "react-redux";
import store from "./app/redux";
import Navigation from "./app/components/navigation";
import Storage from "./app/utils/storage/storage";
import {
  NavigationContainer
} from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";


export default function App() {
  
  const navigationRef = React.createRef();

  useEffect(() => {

    const forwardToNotifications = () => {
      Storage.getObject("user")
        .then(user => navigationRef.current?.navigate("Notifications", user));
    };

    const forwardToWaitRoom = (questID, teamID, userID) => {
      navigationRef.current?.navigate("Wait Room", {questID, teamID, userID});
    };

    const forwardToQuestUpdate = (questID) => {
      navigationRef.current?.navigate("Game", {questID});
    };

    const forwardToFriendsList = () => {
      Storage.getObject("user")
        .then(user => navigationRef.current?.navigate("Friends List", user));
    };

    const processNotification = (remoteMessage, fromBackground) => {
      let title = "";

      if (remoteMessage.notification) {
        title = remoteMessage.notification.title;
      }

      if (remoteMessage.data){
        if (fromBackground && remoteMessage.data.msgType){
          switch(remoteMessage.data.msgType) {
          case "Quest Invitation":
            forwardToNotifications();
            break;
          case "Friend Request":
            forwardToNotifications();
            break;
          case "Friend Accept":
            forwardToFriendsList();
            break;
          case "Friend Deny":
            forwardToFriendsList();
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
                { text: "OK", onPress: () => {forwardToNotifications();} }
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
                { text: "OK", onPress: () => {forwardToNotifications();} }
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
                { text: "OK", onPress: () => {forwardToFriendsList();} }
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
                { text: "OK", onPress: () => {forwardToFriendsList();} }
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
                  Storage.getObject("user").then(user => 
                    forwardToWaitRoom(
                      remoteMessage.data.questID, 
                      remoteMessage.data.teamID, 
                      user.id)
                  );
                }}
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
                  Storage.getObject("user").then(user => 
                    forwardToWaitRoom(
                      remoteMessage.data.questID, 
                      remoteMessage.data.teamID, 
                      user.id
                    )
                  );
                }}
              ]
            );
            break;
          
          case "Quest Update":
            Alert.alert(
              title,
              "",
              [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                { text: "OK", onPress: () => { 
                  forwardToQuestUpdate(
                    remoteMessage.data.questID, 
                  )    
                }}
              ]
            );
              break;
          }
        }

      }

    };
    
    const onNotificationOpen = 
      messaging()
        .onNotificationOpenedApp(remoteMessage => {
          console.log("Notification caused app to open from background state:", 
            remoteMessage);
          processNotification(remoteMessage, true);
        });
   
    
    const foregroundSubscriber = messaging().onMessage(
      async (remoteMessage) => {
        //      Alert.alert(remoteMessage.notification.title)
        console.log("push notification recibida", remoteMessage);
        processNotification(remoteMessage, false);
      });
    
    const backgroundSubscriber = messaging()
      .setBackgroundMessageHandler(
        async (remoteMessage) => {
          console.log("Push notification en background", remoteMessage);
          processNotification(remoteMessage, true);
        });
 

    const getInitialNotification = 
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        console.log('Notification caused app to open from quit state: ', remoteMessage)
        processNotification(remoteMessage, true)
    })
    .catch(error => console.log(error))

    messaging()
    .getToken()
    .then((token) => {
      Storage.setObject('firebaseToken', token);
    })
    .catch(error => console.log(error))
    
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
    };}, []);
  
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Navigation/>
      </NavigationContainer>
    </Provider>

  //   <ViroARSceneNavigator initialScene={{scene: HelloWorldScene}}/>
  );
}
