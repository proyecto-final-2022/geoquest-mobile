import { useHandler } from "react-native-reanimated";

export default {
  "showHint": (ctx, text) => {
    ctx.global.hint(text);
  },
  "grabItem": (ctx, id) => {
    const currentState = ctx.state;
    const inventory = currentState.inventory;    
    const newInventory = [...inventory, id]

    const newState = {...currentState,
      inventory: newInventory,
      scene: currentState.scene + 1
    }
    console.log("***********************New state:", newState) 

    ctx.global.setQuestState(newState)
  },
  "changeScene": (ctx, id) => {
    const newState = {...ctx.state,
      scene: id}

    ctx.global.setQuestState(newState)
  }

  
};


//const items = [1,2,3]

//const itemsConfig = items.map(item => useHandler.questConfig.items[item]) //todos los items de la config

