
export default {
  "showHint": (ctx, hint) => {
    ctx.global.hint(hint);
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
        ctx.global.hint("Con " + ctx.global.selectedItem.title + " no puedes abrir el cofre");
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
