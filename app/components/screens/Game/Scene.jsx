import React from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene } from "./questParsers";


export default function Scene(props) {
  const sceneProps= props.arSceneNavigator.viroAppProps;
  const questConfig = sceneProps.handler.questConfig;
  const questState = sceneProps.handler.questState;
  const sceneConfig = questConfig.scenes[questState.scene];

  console.log("Escena: ", questState.scene);

  return (
    <ViroARScene>
      {parseScene(sceneConfig)(sceneProps)}
    </ViroARScene>
  );
}
