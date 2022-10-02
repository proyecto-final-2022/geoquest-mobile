
export default {
  "showHint": (ctx, text) => {
    ctx.hint(text);
  },

  "nextScene": (ctx) => {
    return {
      scene: ctx.questState.scene + 1,
      objects: {}
    };
  }
};
