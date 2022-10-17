import React from "react";
import WithImageRecognition4 from "./objects/WithImageRecognition4";


export function parseScene4(scene) {
  return (props) => {
    return scene.objects.map((o, key) => parseObject4(o, {...props, key, id: key}));
  };
}


function parseObject4(object, props) {
  const components = {
    "WithImageRecognition": WithImageRecognition4
  };
  const component = components[object.type] ?? undefined;

  if (!component)
    throw Error(`Invalid object type: ${object.type}`);

  return <ARObject component={component} {...props} {...object} />;
}


function ARObject({component, ...props}) {
  return React.createElement(component, props);
}
