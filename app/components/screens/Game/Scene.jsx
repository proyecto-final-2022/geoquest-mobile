import React, { useEffect } from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene } from "./questParsers";


export default function Scene(props) {
  const { handler } = props.arSceneNavigator.viroAppProps;
  const sceneNum = handler.questState.scene;
  console.log(props.arSceneNavigator);
  console.log("Scene num: ", sceneNum);
  const sceneConfig = handler.questConfig.scenes[sceneNum];
/*
  useEffect(() => {
    props.arSceneNavigator.replace({scene: Scene});
  }, []);
*/
  return (
    <ViroARScene>
      {parseScene(sceneConfig)(handler)}
    </ViroARScene>
  );
}
