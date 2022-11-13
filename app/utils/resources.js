
export const resources = {
  images: {
    exampleImage: require("../../res/images/exampleImage.jpg"),
    duende: require("../../res/images/duende.jpg"),
    argentina: require("../../res/images/argentina.jpg"),
    boquita: require("../../res/images/boquita.jpg"),
    mate: require("../../res/images/mate.jpg"),
    aula: require("../../res/images/aula_621_crop.jpg"),
    cuadro: require("../../res/images/cuadro.jpg"),
    silla: require("../../res/images/silla.jpg"),
    cosowifi: require("../../res/images/cosowifi.jpg"),
    graduados: require("../../res/images/graduados.jpg")
  },

  resources: {
    keyDiffuse: require("../../res/models/Key/key-atlas_d.png"),
    keyMetallic: require("../../res/models/Key/key-atlas_m.png"),
    keyRoughness:  require("../../res/models/Key/key-atlas_r.png"),
    folderDiffuse: require("../../res/models/Folder/folder-atlas_d.png"),
    folderNormal: require("../../res/models/Folder/folder-atlas_n.png"),
    folderRoughness:  require("../../res/models/Folder/folder-atlas_r.png"),
    boxDiffuse: require("../../res/models/BoxWithKeyhole/box-atlas_d.png"),
    boxMetallic: require("../../res/models/BoxWithKeyhole/box-atlas_m.png"),
    boxNormal:  require("../../res/models/BoxWithKeyhole/box-atlas_n.png"),
    boxRoughness:  require("../../res/models/BoxWithKeyhole/box-atlas_r.png"),
    pageDiffuse: require("../../res/models/Page/page-atlas_d.png"),
    pageNormal: require("../../res/models/Page/page-atlas_n.png"),
    pageRoughness: require("../../res/models/Page/page-atlas_r.png"),
    noteDiffuse: require("../../res/models/Note/note-atlas_d.png"),
    noteNormal: require("../../res/models/Note/note-atlas_n.png"),
    noteRoughness: require("../../res/models/Note/note-atlas_r.png"),
    noteAmbientOcclusion: require("../../res/models/Note/note-atlas_r.png"),
    clue0Diffuse: require("../../res/models/ClueCard/0/cluecard-atlas_d.png"),
    clue0Roughness: require("../../res/models/ClueCard/0/cluecard-atlas_r.png"),
    clue6Diffuse: require("../../res/models/ClueCard/6/cluecard-atlas_d.png"),
    clue6Roughness: require("../../res/models/ClueCard/6/cluecard-atlas_r.png"),
    clueOpt2Diffuse: require("../../res/models/ClueCard/Opt2/cluecard-atlas_d.png"),
    clueOpt2Roughness: require("../../res/models/ClueCard/Opt2/cluecard-atlas_r.png"),
  },

  models: {
    cubone: {
      model: require("../../res/models/cubone/model.obj"),
      materials: require("../../res/models/cubone/materials.mtl")
    },
    key: {
      model: require("../../res/models/Key/model.vrx")
    },
    keyCopy: {
      model: require("../../res/models/Key/modelCopy.vrx")
    },
    folder: {
      model: require("../../res/models/Folder/model.vrx")
    },
    folderCopy: {
      model: require("../../res/models/Folder/modelCopy.vrx")
    },
    page: {
      model: require("../../res/models/Page/model.vrx")
    },
    pageCopy: {
      model: require("../../res/models/Page/modelCopy.vrx")
    },
    pageCopy2: {
      model: require("../../res/models/Page/modelCopy2.vrx")
    },
    pageCopy3: {
      model: require("../../res/models/Page/modelCopy3.vrx")
    },
    box: {
      model: require("../../res/models/BoxWithKeyhole/model.vrx")
    },
    note: {
      model: require("../../res/models/Note/model.vrx")
    },
    noteCopy: {
      model: require("../../res/models/Note/modelCopy.vrx")
    },
    clue0: {
      model: require("../../res/models/ClueCard/0/model.vrx")
    },
    clue0Copy: {
      model: require("../../res/models/ClueCard/0/modelCopy.vrx")
    },
    clue6: {
      model: require("../../res/models/ClueCard/6/model.vrx")
    },
    clueOpt2: {
      model: require("../../res/models/ClueCard/Opt2/model.vrx")
    }

  }
};


export default {
  get: (spec) => {
    const tree = spec.split(".");
    return tree.reduce((prev, curr, _i) => prev[curr], resources);
  }
};
