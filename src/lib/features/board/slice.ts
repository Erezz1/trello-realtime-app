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

      if (columnIndex === -1) return;
      state.value[columnIndex].tasks = [...state.value[columnIndex].tasks, task];
    },
    removeTask: (state, action: PayloadAction<{ columnId: string, taskId: string }>) => {
      const { columnId, taskId } = action.payload;
      const columnIndex = state.value.findIndex(
        column => column.id === columnId
      );

      if (columnIndex === -1) return;
      state.value[columnIndex].tasks = state.value[columnIndex].tasks.filter(
        task => task.id !== taskId
      );
    },
    updateTask: (state, action: PayloadAction<{ columnId: string, task: Task }>) => {
      const { columnId, task } = action.payload;
      const columnIndex = state.value.findIndex(
        column => column.id === columnId
      );

      if (columnIndex === -1) return;
      const taskIndex = state.value[columnIndex].tasks.findIndex(
        task => task.id === task.id
      );

      if (taskIndex === -1) return;
      state.value[columnIndex].tasks[taskIndex] = task;
    },
    filterTasks: (state, action: PayloadAction<string>) => {
      const filter = action.payload;

      state.value = state.value.map(column => {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.title.toLowerCase().includes(filter.toLowerCase()))
        };
      });
    }
  },
});

export const {
  setBoard,
  addColumn,
  removeColumn,
  addTask,
  removeTask,
  updateTask,
  filterTasks
} = boardSlice.actions;
export default boardSlice.reducer;
