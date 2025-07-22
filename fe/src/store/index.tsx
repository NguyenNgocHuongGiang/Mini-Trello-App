import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slice/boardSlice"
import cardReducer from "./slice/cardSlice"
import taskReducer from "./slice/taskSlice"
export const store = configureStore({
  reducer: {
    boardReducer,
    cardReducer,
    taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
