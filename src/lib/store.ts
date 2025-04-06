import { configureStore } from "@reduxjs/toolkit";

import boardReducer from "./features/board/slice";
import sessionReducer from "./features/session/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      board: boardReducer,
      session: sessionReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
