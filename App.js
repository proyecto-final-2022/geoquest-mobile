import React, { useState } from "react";

import { ViroARSceneNavigator } from "@viro-community/react-viro/components/AR/ViroARSceneNavigator";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { ViroText } from "@viro-community/react-viro/components/ViroText";
import { ViroTrackingStateConstants } from "@viro-community/react-viro/components/ViroConstants";


export default function App() {
  return (
    <ViroARSceneNavigator initialScene={{scene: HelloWorldScene}}/>
  );
}


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
