import React from "react";
import WithImageRecognition from "./objects/WithImageRecognition";
import WithImageRecognitionModal from "./objects/WithImageRecognitionModal";
import WithImageRecognitionModal2 from "./objects/WithImageRecognitionModal2";

export function parseScene(scene) {
  return (props) => {
    return scene.objects.map((o, key) => parseObject(o, {...props, key, id: key}));
  };
}


function parseObject(object, props) {
  const components = {
    "WithImageRecognition": WithImageRecognition,
    "WithImageRecognitionModal": WithImageRecognitionModal,
    "WithImageRecognitionModal2": WithImageRecognitionModal2
  };
  const component = components[object.type] ?? undefined;

  if (!component)
    throw Error(`Invalid object type: ${object.type}`);

  return <ARObject component={component} {...props} {...object} />;
}


function ARObject({component, ...props}) {
  return React.createElement(component, props);
}
