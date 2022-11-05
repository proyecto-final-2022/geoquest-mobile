
export const resources = {
  images: {
    exampleImage: require("../../res/images/exampleImage.jpg"),
    duende: require("../../res/images/duende.jpg"),
    argentina: require("../../res/images/argentina.jpg"),
    boquita: require("../../res/images/boquita.jpg"),
    mate: require("../../res/images/mate.jpg"),
    aula: require("../../res/images/aula_621_crop.jpg"),
    cuadro: require("../../res/images/cuadro.jpg"),
    graduados: require("../../res/images/graduados.jpg")
  },

  resources: {
    keyDiffuse: require("../../res/models/Key/key-atlas_d.png"),
    keyMetallic: require("../../res/models/Key/key-atlas_m.png"),
    keyRoughness:  require("../../res/models/Key/key-atlas_r.png"),
  },

  models: {
    cubone: {
      model: require("../../res/models/cubone/model.obj"),
      materials: require("../../res/models/cubone/materials.mtl")
    },
    key: {
      model: require("../../res/models/Key/model.vrx")
    },
    folder: {
      model: require("../../res/models/Folder/model.vrx")
    },
    page: {
      model: require("../../res/models/Page/model.vrx")
    },
    box: {
      model: require("../../res/models/BoxWithKeyhole/model.vrx")
    },
    keyCopy: {
      model: require("../../res/models/KeyCopy/model.vrx")
    },
    pageCopy: {
      model: require("../../res/models/PageCopy/model.vrx")
    }
  }
};


export default {
  get: (spec) => {
    const tree = spec.split(".");
    return tree.reduce((prev, curr, _i) => prev[curr], resources);
  }
};
