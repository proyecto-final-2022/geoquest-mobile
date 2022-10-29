import React from "react";
import { useSelector } from "react-redux";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";
import { parseScene } from "./questParsers";
import { parseItems } from "./objParser";


export default function SceneView(props) {
//  const sceneNum = useSelector(state => state.quest.scene);
  const sceneProps= props.arSceneNavigator.viroAppProps;
  const questConfigItems = sceneProps.questConfig.items;
  const objectsView = parseItems(questConfigItems)(sceneProps);

  return (
    <ViroARScene>
      {objectsView}
    </ViroARScene>
  );
}
