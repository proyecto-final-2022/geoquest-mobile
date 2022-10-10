import React, { useState } from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { ViroARImageMarker } from "@viro-community/react-viro/components/AR/ViroARImageMarker";
import { ViroARTrackingTargets } from "@viro-community/react-viro/components/AR/ViroARTrackingTargets";
import { Viro3DObject } from "@viro-community/react-viro/components/Viro3DObject";
import { ViroAmbientLight } from "@viro-community/react-viro/components/ViroAmbientLight";

export default function Scene2() {
  const [pauseUpdates, setPauseUpdates] = useState(false);
  const [visible, setVisible] = useState(true);


  ViroARTrackingTargets.createTargets({
    "target":     {
      "orientation": "Up",
      "physicalWidth": 0.2,
      "source": {
      "__packager_asset": true,
      "height": 1200,
      "scale": 1,
      "uri": "http://localhost:8081/assets/res/images/exampleImage.jpg?platform=android&hash=b342b5cf5d5447779b653e4843661d41",
      "width": 1920,
      }
    }
  
  });


  const onClick = () => {
    setVisible(false)
  };

  return (
    <ViroARScene> 
    <ViroARImageMarker 
      target={"target"}
      pauseUpdates={false}
    >
      <ViroAmbientLight color="#ffffff"/>
      <Viro3DObject 
      visible={visible}
      onClick={onClick}/>
    </ViroARImageMarker>
    </ViroARScene>
  );
} 
