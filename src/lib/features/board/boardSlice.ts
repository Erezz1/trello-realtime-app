import { Column } from "@/interfaces/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import initialBoard from "@/__mocks__/board.json";

export interface BoardState {
  value: Column[];
}

const initialState: BoardState = {
  value: initialBoard,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Column[]>) => {
      state.value = action.payload;
    },
    deleteTask: (state, action: PayloadAction<Column>) => {
      state.value = state.value.map((column) => {
        if (column.id === action.payload.id) {
          column.tasks = column.tasks.filter(
            (task) => task.id !== action.payload.tasks[0].id
          );
        }
        return column;
      });
    }
  },
});

export const { setBoard, deleteTask } = boardSlice.actions;
export default boardSlice.reducer;
