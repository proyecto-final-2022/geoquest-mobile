import {useSelector, useDispatch} from "react-redux";

export default {

  "showHint": (ctx, hint) => {
    ctx.global.hint(hint);
  },

  "addPoints": (ctx, points) => {
    var timestamp = new Date().getTime()
    //hours difference
    var diff = (timestamp - ctx.state.startTime) / (1000 * 60 * 60 * 24)
    var add = parseFloat((points/diff).toFixed(2))
    console.log("*****Puntos", ctx.state.points + add)
    return {
      ...ctx.state,
      points: ctx.state.points + add,
    };
  },

  "log": (ctx, msg) => {
    const logs = ctx.state["logs"] ?? [];
    return {
      ...ctx.state,
      logs: [...logs, msg],
      sendUpdate: true,
    };
  },

  "grabItem": (ctx, id) => {
    const currentState = ctx.state;
    const inventory = currentState.inventory;    
    const newInventory = [...inventory, id]

    return {...currentState,
      inventory: newInventory,
      sendUpdate: true,
      sendNotification: true
    }
  },

  "grabItemCondition": (ctx, id) => {
    const questLocal = useSelector(state => state.questLocal);    
    if (id == questLocal.inventory.selectedItem.itemID) {
    } else {
      if (questLocal.inventory.selectedItem.itemID != "") {
        ctx.global.hint("No es posible abrir el cofre con: " + questLocal.inventory.selectedItem.name);
      }
      return {...ctx.state,
      addInteraction: id}
    }
  },

  "nextScene": (ctx) => {

    return {
      ...ctx.state,
      scene: ctx.state.scene + 1,
      objects: {},
      sendUpdate: true,
      sendNotification:true
    };
  }
};
