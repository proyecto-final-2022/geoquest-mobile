import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Alert, ImageBackground, Text} from "react-native";
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { ViroText } from "@viro-community/react-viro/components/ViroText";
import { ViroTrackingStateConstants } from "@viro-community/react-viro/components/ViroConstants";
import Navigation from './app/components/navigation'
import messaging from '@react-native-firebase/messaging'

export default function App() {

  useEffect(() => {
    const foregroundSubscriber = messaging().onMessage(
      async (remoteMessage) => {
      Alert.alert(remoteMessage.notification.title)
      console.log("push notification recibida", remoteMessage)
    })

    const topicSubscriber = messaging()
    .subscribeToTopic('geoquest')
    .then(() => console.log('suscrito a geoquest'))

    const backgroundSubscriber = messaging()
    .setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Push notification en background', remoteMessage)
    })


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

    return () => {
      foregroundSubscriber();
      topicSubscriber();
      backgroundSubscriber();
      getToken();
      tokenRefresh();
    }
  }, [])

  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>

 //   <ViroARSceneNavigator initialScene={{scene: HelloWorldScene}}/>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF9CA'
  },
});

const HelloWorldScene = (_props) => {
  const [text, setText] = useState("Loading...");

  const onTrackingUpdated = (state, _reason) => {
    if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE)
      setText("Tracking unavailable");
    else if (state === ViroTrackingStateConstants.TRACKING_NORMAL)
      setText("Hello world!");
  }

  return (
    <ViroARScene onTrackingUpdated={onTrackingUpdated}>
      <ViroText
        text={text}
        position={[0,0,-2]}
        style={{fontSize: 20, color:"white"}}
      />
    </ViroARScene>
  );
}
