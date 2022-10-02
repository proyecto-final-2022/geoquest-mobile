import React from "react";
import WithImageRecognition from "./objects/WithImageRecognition";


export function parseScene(scene) {
  return (questHandler) => {
    return scene.objects.map((o, key) => parseObject(questHandler, key, o));
  };
}


function parseObject(handler, key, object) {
  var objectComponent = undefined;
  switch (object.type) {
  case "WithImageRecognition":
    objectComponent = WithImageRecognition;
    break;
  }

  return React.createElement(objectComponent, {key, handler, ...object});
}
