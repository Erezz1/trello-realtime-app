import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Board, Column, Task } from "@/interfaces/types";
import { BoardState } from "./types";

const initialState: BoardState = {
  value: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board>) => {
      state.value = action.payload;
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      state.value = [...state.value, action.payload];
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        column => column.id !== action.payload
      );
    },
    addTask: (state, action: PayloadAction<{ columnId: string, task: Task }>) => {
      const { columnId, task } = action.payload;
      const columnIndex = state.value.findIndex(
        column => column.id === columnId
      );
      if (columnIndex !== -1) {
        state.value[columnIndex].tasks = [...state.value[columnIndex].tasks, task];
      }
    },
    removeTask: (state, action: PayloadAction<{ columnId: string, taskId: string }>) => {
      const { columnId, taskId } = action.payload;
      const columnIndex = state.value.findIndex(
        column => column.id === columnId
      );
      if (columnIndex !== -1) {
        state.value[columnIndex].tasks = state.value[columnIndex].tasks.filter(
          task => task.id !== taskId
        );
      }
    },
  },
});

export const { setBoard, addColumn, removeColumn, addTask, removeTask } = boardSlice.actions;
export default boardSlice.reducer;
