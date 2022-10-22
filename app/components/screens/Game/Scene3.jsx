import React from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene } from "./questParsers";

export default function Scene3(props) {
  const sceneProps= props.arSceneNavigator.viroAppProps;
  const sceneConfig = sceneProps.handler.questConfig.scenes["3"];

  return (
    <ViroARScene>
      {parseScene(sceneConfig)(sceneProps)}
    </ViroARScene>
  );
}
