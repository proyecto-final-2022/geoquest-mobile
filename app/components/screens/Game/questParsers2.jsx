import React from "react";
import WithImageRecognition2 from "./objects/WithImageRecognition2";


export function parseScene2(scene) {
  return (props) => {
    return scene.objects.map((o, key) => parseObject2(o, {...props, key, id: key}));
  };
}


function parseObject2(object, props) {
  const components = {
    "WithImageRecognition": WithImageRecognition2
  };
  const component = components[object.type] ?? undefined;

  if (!component)
    throw Error(`Invalid object type: ${object.type}`);

  return <ARObject component={component} {...props} {...object} />;
}


function ARObject({component, ...props}) {
  return React.createElement(component, props);
}
