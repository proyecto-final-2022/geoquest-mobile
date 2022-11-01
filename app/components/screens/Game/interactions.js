
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
    if (id == ctx.global.selectedItem.questItemID) {
    } else {
      if (ctx.global.selectedItem.questItemID != "") {
        ctx.global.hint("No es posible abrir el cofre con: " + ctx.global.selectedItem.title);
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
