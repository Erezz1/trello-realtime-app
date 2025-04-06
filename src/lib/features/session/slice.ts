import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Session } from "@/interfaces/types";
import { SessionState } from "./types";

const initialState: SessionState = {
  value: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Session>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    }
  }
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
