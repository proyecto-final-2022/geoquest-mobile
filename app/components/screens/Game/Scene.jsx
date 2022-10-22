import React from "react";
import { useSelector } from "react-redux";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene } from "./questParsers";


export default function Scene(props) {
  const sceneNum = useSelector(state => state.quest.scene);

  const sceneProps= props.arSceneNavigator.viroAppProps;
  const questConfig = sceneProps.questConfig;
  const sceneConfig = questConfig.scenes[sceneNum];

  return (
    <ViroARScene>
      {parseScene(sceneConfig)(sceneProps)}
    </ViroARScene>
  );
}
