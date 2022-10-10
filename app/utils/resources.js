
export const resources = {
  images: {
    exampleImage: require("../../res/images/exampleImage.jpg"),
    boquita: require("../../res/images/boquita.jpg"),
    rasin: require("../../res/images/rasin.jpg"),
    independiente: require("../../res/images/independiente.jpg"),
    pantera: require("../../res/images/exampleimage2.jpg")
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
}
