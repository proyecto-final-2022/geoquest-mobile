import { configureStore } from "@reduxjs/toolkit";
import Quest from "./slices/quest";
import QuestLocal from "./slices/questLocal";

const store = configureStore({
  reducer: {
    questLocal: QuestLocal.reducer,
    quest: Quest.reducer
  }
});
  
export default store;
