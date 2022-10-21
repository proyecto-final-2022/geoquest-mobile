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
      inventory: newInventory}

    ctx.global.setQuestState(newState)
    
    /*
    const currentState = ctx.currentState;
    const inventory = currentState.inventory;
    const newInventory = inventory + [id]
    return {...currentState,
      inventory: newInventory
    }
    */
  }
  
};


//const items = [1,2,3]

//const itemsConfig = items.map(item => useHandler.questConfig.items[item]) //todos los items de la config

