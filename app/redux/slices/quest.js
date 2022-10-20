import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scene: 0,
  objects: {}
};


const questSlice = createSlice({
  name: "quest",
  initialState,
  reducers: {
    "set": (state, action) => {
      state = action.payload;
    },

    "nextScene": (state) => {
      state.scene += 1;
    }
  }
});

export default questSlice;
