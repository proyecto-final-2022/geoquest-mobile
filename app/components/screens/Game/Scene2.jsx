import React from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene2 } from "./questParsers2";

export default function Scene2(props) {
  const sceneProps= props.arSceneNavigator.viroAppProps;
  const sceneConfig = sceneProps.handler.questConfig;

  return (
    <ViroARScene>
      {parseScene2(sceneConfig)(sceneProps)}
    </ViroARScene>
  );
}
