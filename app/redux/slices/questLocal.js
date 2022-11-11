import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visualizer: {
        title: "", 
        itemID: undefined, 
        description: "", 
        image: 0    
    },
    inventory: {
        selectedItem: {
            itemID: undefined,
            name: ""
        }
    }
};


const questLocalSlice = createSlice({
  name: "questLocal",
  initialState,
  reducers: {
    setVisualizer: (state, action) => {
//      state.visualizer = {...action.payload}  
      return {
        ...state, 
        visualizer: {...action.payload}
      };
    },
    selectItem: (state, action) => {
//      state.visualizer = {...action.payload}  
        return {
            ...state, 
            inventory: {...action.payload}
        };
    },
    clearVisualizer: (state, _action) => {
        //      state.visualizer = {...action.payload}  
        return {
            ...state, 
            visualizer: initialState.visualizer
        };
    },
  }
});

export default questLocalSlice;

 