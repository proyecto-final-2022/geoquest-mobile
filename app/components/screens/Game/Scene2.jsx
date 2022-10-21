import React, {useEffect} from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene2 } from "./questParsers2";
import { parseScene } from "./questParsers";

export default function Scene2(props) {
  const sceneProps= props.arSceneNavigator.viroAppProps;
  const sceneConfig = sceneProps.handler.questConfig.scenes["2"];

  return (
    <ViroARScene>
      {console.log("********************parse scene 2**********************")}
      {parseScene(sceneConfig)(sceneProps)}
    </ViroARScene>
  );
}
