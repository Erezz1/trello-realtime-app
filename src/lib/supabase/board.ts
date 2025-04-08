"use server";
import { Board } from "@/interfaces/types";
import { supabase } from "@/lib/supabase/client";

export const getBoard = async (email: string) => {
  const { data, error } = await supabase
    .from("boards")
    .select(`
      columns (
        id,
        title,
        position,
        tasks (
          id,
          title,
          description
        )
      )
    `)
    .eq("email", email)
    .single();

  if (error) throw error;

  return data?.columns as Board ?? [];
};

export const setCacheBoard = async (email: string, board: Board) => {
  const stringBoard = JSON.stringify(board);

  const { error } = await supabase
    .from("cache")
    .upsert(
      { email, boardCache: stringBoard },
      { onConflict: "email" }
    )
    .eq("email", email);

  if (error) throw error;
};

export const getCacheBoard = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("cache")
      .select("boardCache")
      .eq("email", email)
      .single();
    if (error) throw error;

    const board = JSON.parse(data?.boardCache as string) as Board;
    return board;

  } catch (error) {
    console.error("Error parsing board cache:", error);
    return null;
  }
};
