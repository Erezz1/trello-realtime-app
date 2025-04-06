"use server";
import { supabase } from "@/lib/supabase/client";

export const updateTask = async (
  taskId: string,
  newColumnId: string,
) => {
  const { error } = await supabase
    .from("tasks")
    .update({
      column_id: newColumnId,
    })
    .eq("id", taskId);

  if (error) {
    console.log(error);
    throw error;
  }
};
