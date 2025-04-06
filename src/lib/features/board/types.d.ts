import { Board } from "@/interfaces/types";
import { boardSlice } from "./slice";

export interface BoardState {
  value: Board;
}

export type BoardReducer = typeof boardSlice["reducer"];
