import React from "react";
import WithImageRecognition3 from "./objects/WithImageRecognition3";

export function parseScene3(scene) {
  return (questHandler) => {
    return scene.objects.map((o, key) => parseObject2(questHandler, key, o));
  };
}


function parseObject2(handler, id, object) {
  var objectComponent2 = undefined;
  switch (object.type) {
  case "WithImageRecognition":
    objectComponent2 = WithImageRecognition3;
    break;
  }

  return React.createElement(objectComponent2, {key: id, id, handler, ...object});
}
