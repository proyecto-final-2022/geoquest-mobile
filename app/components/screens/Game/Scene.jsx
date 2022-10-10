import React, { useEffect } from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene } from "./questParsers";
import { parseScene2 } from "./questParsers2";
import { parseScene3 } from "./questParsers3";
import { parseScene4 } from "./questParsers4";
import { parseScene5 } from "./questParsers5";
import Scene2 from "./Scene2";
import HelloUser from "../../../components/scenes/HelloUser"

export default function Scene(props) {
  const { handler } = props.arSceneNavigator.viroAppProps;
  const sceneNum = handler.questState.scene;
  const visualize = handler.visualize;
  console.log("Scene num: ", sceneNum);
  console.log("Visualize: ", visualize);
  const sceneConfig = handler.questConfig.scenes[sceneNum];

  useEffect(() => {
    console.log("*****************************hola*******************", visualize)
    if (visualize == true) {
   //  props.arSceneNavigator.viroAppProps.sceneNavigatorRef.current.replace({scene: Scene2})
    }
//    props.arSceneNavigator.viroAppProps.sceneNavigatorRef.current.pop()
//    props.sceneNavigator.push({scene: HelloUser})

  }, [visualize]);

  return (
    <ViroARScene>
      {parseScene(sceneConfig)(handler)}
      {parseScene2(sceneConfig)(handler)}
      {parseScene3(sceneConfig)(handler)}
      {parseScene4(sceneConfig)(handler)}
      {parseScene5(sceneConfig)(handler)}
    </ViroARScene>
  );
}


