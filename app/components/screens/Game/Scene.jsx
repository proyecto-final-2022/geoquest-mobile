import React, {useEffect} from "react";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene } from "./questParsers";
import { parseScene2 } from "./questParsers2";
import { parseScene3 } from "./questParsers3";

export default function Scene(props) {
  const sceneProps= props.arSceneNavigator.viroAppProps;
  const sceneConfig = sceneProps.handler.questConfig.scenes["1"];

  
  useEffect(() => {
    console.log("****************Scene config, ", sceneConfig)
  }, []);


  return (
    <ViroARScene>
      {parseScene(sceneConfig)(sceneProps)}
    </ViroARScene>
  );
}
