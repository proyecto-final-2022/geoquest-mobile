
export const resources = {
  images: {
    exampleImage: require("../../res/images/exampleImage.jpg"),
    duende: require("../../res/images/duende.jpg")
  },

  models: {
    cubone: {
      model: require("../../res/models/cubone/model.obj"),
      materials: require("../../res/models/cubone/materials.mtl")
    }
  }
};


export default {
  get: (spec) => {
    const tree = spec.split(".");
    return tree.reduce((prev, curr, _i) => prev[curr], resources);
  }
};
