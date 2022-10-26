
export default {
  "showHint": (ctx, hint) => {
    ctx.global.hint(hint.short);
  },

  "grabItem": (ctx, id) => {
    const currentState = ctx.state;
    const inventory = currentState.inventory;    
    const newInventory = [...inventory, id]

    ctx.global.hint("Objecto recolectado");

    return {...currentState,
      inventory: newInventory,
    }
  },

  "nextScene": (ctx, id) => {

    ctx.global.hint("Objecto recolectado");

    return {
      ...ctx.state,
      scene: ctx.state.scene + 1,
      inventory: [...ctx.state.inventory, id],
      objects: {}
    };
  }
};
