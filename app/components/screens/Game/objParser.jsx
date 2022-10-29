import ObjectView from "./visualization/visualize"

export function parseItems(items) {
  var itemsList = Object.values(items)

  return (props) => {
    return itemsList.map((item, key) => parseObjectView(item, props.globalCtx, {id: key}));
  };
}


function parseObjectView(item, ctx, props) {
  return ObjectView(item, ctx)

/*
  const components = {
    "WithImageRecognition": WithImageRecognition
  };
  const component = components[object.type] ?? undefined;

  if (!component)
    throw Error(`Invalid object type: ${object.type}`);

  return <ARObject component={component} {...props} {...object} />;
  */
}

/*
function ARObject({component, ...props}) {
  return React.createElement(component, props);
}
*/