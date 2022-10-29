import React from "react";
import { useSelector } from "react-redux";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene } from "./questParsers";
import { parseItems } from "./objParser";
import ObjectView from "./visualization/visualize";

export default function Scene(props) {
  const sceneNum = useSelector(state => state.quest.scene);

  const sceneProps= props.arSceneNavigator.viroAppProps;
  const questConfig = sceneProps.questConfig;
  const sceneConfig = questConfig.scenes[sceneNum];
  const objects = parseScene(sceneConfig)(sceneProps);

  const questConfigItems = questConfig.items;
  const objectsView = parseItems(questConfigItems)(sceneProps);

  console.log("Secene:", sceneNum, "Objects:", objects.length);

  return (
    <ViroARScene>
      {objects}
      {objectsView}
    </ViroARScene>
  );
}
