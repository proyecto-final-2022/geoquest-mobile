import React from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene4 } from "./questParsers4";

export default function Scene4(props) {
  const sceneProps= props.arSceneNavigator.viroAppProps;
  const sceneConfig = sceneProps.handler.questConfig;

  return (
    <ViroARScene>
      {parseScene4(sceneConfig)(sceneProps)}
    </ViroARScene>
  );
}
