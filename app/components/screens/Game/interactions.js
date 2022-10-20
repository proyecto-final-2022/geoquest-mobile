
export default {
  "showHint": (ctx, hint) => {
    ctx.global.hint(hint.short);
  },

  "nextScene": (ctx) => {
    /* ctx.global.forceReload(); */
    return {
      ...ctx.state,
      scene: ctx.state.scene + 1
    };
  }
};
