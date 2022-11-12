import {useSelector} from "react-redux";
import Config from "../../../../config.json"

export default {
  "showHint": (ctx, hint) => {
    ctx.global.hint(hint);
  },

  "addPoints": (ctx, points) => {
    
    var timestamp = Math.floor(Date.now() / 1000)
    var diff = (timestamp - ctx.state.start_time) 
    var add = parseFloat((points/diff).toFixed(2))

    return {
      ...ctx.state,
      points: ctx.state.points + add,
    };
    
  },

  "log": (ctx, msg) => {
    const logs = ctx.state["logs"] ?? [];
    return {
      ...ctx.state,
      logs: [...logs, msg],
    };
  },

  "grabItem": (ctx, id) => {
    const currentState = ctx.state;
    const inventory = currentState.inventory;    
    const newInventory = [...inventory, id]

    return {...currentState,
      inventory: newInventory,
      sendUpdate: {
        lastFoundItemID: id
      }
    }
  },

  "grabItemCondition": (ctx, id) => {
    const questLocal = useSelector(state => state.questLocal);    
    if (id == questLocal.inventory.selectedItem.itemID) {
    } else {
      if (questLocal.inventory.selectedItem.itemID != "") {
        ctx.global.hint("No es posible abrir el cofre con: " + questLocal.inventory.selectedItem.name);
      }
      return {...ctx.state,
      addInteraction: id}
    }
  },

  "nextScene": (ctx) => {

    return {
      ...ctx.state,
      scene: ctx.state.scene + 1,
      objects: {},
    };
  }
};

async function getPoints() {
  fetch(url)
  .then((response) => response.json())
  .then((json) =>
    {
      var timestamp = json.timestamp
      console.log("****timestamp response: ", timestamp)
      //hours difference
      var add = parseFloat((points/timestamp).toFixed(2))
      console.log("*****Puntos", ctx.state.points + add)
      return {
        ...ctx.state,
        points: ctx.state.points + add,
      };
    }
  )
  .catch((error) => 
  {
      var timestamp = Math.floor(Date.now() / 1000)
      //hours difference
      var diff = (timestamp - ctx.state.startTime) 
      console.log("***********diff", diff)
      var add = parseFloat((points/diff).toFixed(2))
      console.log("*****Puntos", ctx.state.points + add)
      return {
        ...ctx.state,
        points: ctx.state.points + add,
      };
  }
  );
}
