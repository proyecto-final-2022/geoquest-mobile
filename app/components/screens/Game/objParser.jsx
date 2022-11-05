import ObjectView from "./visualization/visualize"
import VisualizeFolder from "./visualization/visualizeFolder"

export function parseItems(items) {
  var itemsList = Object.values(items)

  return (props) => {
    return itemsList.map((item, key) => parseObjectView(item, props.globalCtx, {id: key}));
  };
}


function parseObjectView(item, ctx, props) {
  if (item.visualizeFunction == "VisualizeFolder") {
    return VisualizeFolder(item, ctx)
  }
  return ObjectView(item, ctx)
}