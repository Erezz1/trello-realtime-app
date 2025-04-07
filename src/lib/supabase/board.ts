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
