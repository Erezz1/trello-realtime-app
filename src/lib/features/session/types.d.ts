import { Session } from "@/interfaces/types";
import { sessionSlice } from "./slice";

export interface SessionState {
  value: Session | null;
}

export type SessionReducer = typeof sessionSlice["reducer"];
