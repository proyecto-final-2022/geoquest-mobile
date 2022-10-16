import React from "react";
import WithImageRecognition3 from "./objects/WithImageRecognition3";


export function parseScene3(scene) {
  return (props) => {
    return scene.objects.map((o, key) => parseObject3(o, {...props, key, id: key}));
  };
}


function parseObject3(object, props) {
  const components = {
    "WithImageRecognition": WithImageRecognition3
  };
  const component = components[object.type] ?? undefined;

  if (!component)
    throw Error(`Invalid object type: ${object.type}`);

  return <ARObject component={component} {...props} {...object} />;
}


function ARObject({component, ...props}) {
  return React.createElement(component, props);
}
