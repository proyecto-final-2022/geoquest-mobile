
export default {
  "showHint": (ctx, hint) => {
    ctx.global.hint(hint.short);
  },

  "grabItem": (ctx, id) => {
    const currentState = ctx.state;
    const inventory = currentState.inventory;    
    const newInventory = [...inventory, id]

    return {...currentState,
      inventory: newInventory,
      sendUpdate: true
    }
  },

  "nextScene": (ctx, id) => {

    return {
      ...ctx.state,
      scene: ctx.state.scene + 1,
      inventory: [...ctx.state.inventory, id],
      objects: {},
      sendUpdate: true
    };
  }
};
