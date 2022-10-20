import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ImageBackground, Text} from "react-native";
import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { ViroText } from "@viro-community/react-viro/components/ViroText";
import { ViroTrackingStateConstants } from "@viro-community/react-viro/components/ViroConstants";
import Navigation from "./app/components/navigation";
import { Provider } from "react-redux";
import store from "./app/redux";


export default function App() {
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
