import React from "react";
import WithImageRecognition5 from "./objects/WithImageRecognition5";

export function parseScene5(scene) {
  return (questHandler) => {
    return scene.objects.map((o, key) => parseObject2(questHandler, key, o));
  };
}


function parseObject2(handler, id, object) {
  var objectComponent2 = undefined;
  switch (object.type) {
  case "WithImageRecognition":
    objectComponent2 = WithImageRecognition5;
    break;
  }

  return React.createElement(objectComponent2, {key: id, id, handler, ...object});
}
