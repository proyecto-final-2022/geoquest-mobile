import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scene: parseFloat(0),
  inventory: [],
  objects: {},
  startTime: new Date().getTime(),
  logs: [],
  sendUpdate: {
    lastFoundItemID: undefined
  },
  finished: false
};


const questSlice = createSlice({
  name: "quest",
  initialState,
  reducers: {
    set: (_state, action) => {
      return {
        ...action.payload
      };
    },
  }
});

export default questSlice;
