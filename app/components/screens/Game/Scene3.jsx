import React from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene3 } from "./questParsers3";

export default function Scene3(props) {
  const sceneProps= props.arSceneNavigator.viroAppProps;
  const sceneConfig = sceneProps.handler.questConfig;

  return (
    <ViroARScene>
      {parseScene3(sceneConfig)(sceneProps)}
    </ViroARScene>
  );
}
