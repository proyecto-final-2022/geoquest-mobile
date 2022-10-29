import ObjectView from "./visualization/visualize"

export function parseItems(items) {
  var itemsList = Object.values(items)

  return (props) => {
    return itemsList.map((item, key) => parseObjectView(item, props.globalCtx, {id: key}));
  };
}


function parseObjectView(item, ctx, props) {
  return ObjectView(item, ctx)
}