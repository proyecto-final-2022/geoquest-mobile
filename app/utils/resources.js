
export const resources = {
  images: {
    exampleImage: require("../../res/images/exampleImage.jpg"),
    exampleImage2: require("../../res/images/exampleimage2.jpg"),
    duende: require("../../res/images/duende.jpg"),
    exampleImage3: require("../../res/images/exampleImage3.jpg"),
    exampleImage4: require("../../res/images/exampleImage4.jpg")
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
