import React, { useEffect } from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene } from "./questParsers";
import HelloUser from "../../../components/scenes/HelloUser"

export default function Scene(props) {
  const { handler } = props.arSceneNavigator.viroAppProps;
  const sceneNum = handler.questState.scene;
  const visualize = handler.visualize;
  console.log("**********************Props: ", props);
  console.log("**********************Reffff: ", props.arSceneNavigator.viroAppProps.sceneNavigatorRef);
  console.log("Scene num: ", sceneNum);
  console.log("Visualize: ", visualize);
  const sceneConfig = handler.questConfig.scenes[sceneNum];

  useEffect(() => {
    console.log("*****************************hola*******************", visualize)
    if (visualize == true) {
    props.arSceneNavigator.viroAppProps.sceneNavigatorRef.current.push({scene: HelloUser})
    }
//    props.sceneNavigator.push({scene: HelloUser})
  }, [visualize]);

  return (
    <ViroARScene>
      {parseScene(sceneConfig, props.arSceneNavigator)(handler)}
    </ViroARScene>
  );
}
