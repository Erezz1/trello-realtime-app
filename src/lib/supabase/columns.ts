"use server";
import { Column } from "@/interfaces/types";
import { supabase } from "@/lib/supabase/client";

export const addColumn = async (title: string, email: string): Promise<Column> => {
  const { data: boardData, error: boardError } = await supabase
    .from("boards")
    .select(`
      id,
      columns (
        position
      )
    `)
    .eq("email", email)
    .single();

  if (boardError) throw boardError;

  const newPosition = (boardData?.columns.length ?? 0) + 1;

  // Insertar la nueva columna
  const { data, error } = await supabase
    .from("columns")
    .insert({
      title,
      position: newPosition,
      "board_id": boardData.id
    })
    .select()
    .single();

  if (error) throw error;

  // Retornar el tipo Column incluyendo tasks vacías
  return {
    id: data.id,
    title: data.title,
    tasks: [],
    position: data.position
  } as Column;
};
