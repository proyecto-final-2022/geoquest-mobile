import React from "react";
import WithImageRecognition from "./objects/WithImageRecognition";
import { ViroARScene } from "@viro-community/react-viro/components/AR/ViroARScene";


const Scene = ({objectComponents}) => {
  return (
    <ViroARScene>
      {objectComponents}
    </ViroARScene>
  );
}

export function parseScene(scene) {
  return (questHandler) => {
    const objectComponents = scene.objects.map((o, key) => parseObject(questHandler, key, o));
    return {
      objectComponents,
      scene: Scene
    }
  }
}


function parseObject(questHandler, key, object) {
  var objectComponent = undefined;
  switch (object.type) {
    case "WithImageRecognition":
      objectComponent = WithImageRecognition
      break;
  }

  return React.createElement(objectComponent, {key, questHandler, ...object});
}
