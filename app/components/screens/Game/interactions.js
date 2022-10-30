
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
