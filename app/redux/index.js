import { configureStore } from "@reduxjs/toolkit";
import Quest from "./slices/quest";
import QuestLocal from "./slices/questLocal";

const store = configureStore({
  reducer: {
    quest: Quest.reducer,
    questLocal: QuestLocal.reducer
  }
});
  
export default store;
